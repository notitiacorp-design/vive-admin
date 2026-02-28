import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/auth/callback', '/auth/error'];
const LOGIN_PATH = '/login';

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/images/') ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf|css|js|map)$/i.test(pathname)
  );
}

function isAdminUser(
  userMetadata: Record<string, unknown>,
  appMetadata: Record<string, unknown>
): boolean {
  // Check app_metadata.role (set by service-role key – cannot be spoofed by client)
  if (appMetadata?.role === 'admin') return true;

  // Check custom JWT claim injected via Supabase custom access token hook
  if (appMetadata?.claims_admin === true) return true;

  // Fallback: check user_metadata.role (less secure, supplementary check)
  if (userMetadata?.role === 'admin') return true;

  return false;
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets to avoid unnecessary processing
  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  // Build a mutable response so Supabase SSR can set/refresh cookies
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('[Middleware] Missing Supabase environment variables.');
    // Fail open for public routes, fail closed for protected routes
    if (isPublicRoute(pathname)) return supabaseResponse;
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // First pass: apply to the mutable request clone (for downstream handlers)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          // Rebuild supabaseResponse so it carries the updated cookies
          supabaseResponse = NextResponse.next({ request });

          // Second pass: write cookies to the actual response headers
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: do not run any logic between createServerClient and getUser()
  // that could invalidate the session cookie flow.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // Allow access to public routes regardless of auth state
  if (isPublicRoute(pathname)) {
    // If user is already a valid admin and tries to visit /login, redirect to dashboard
    if (
      user &&
      !userError &&
      pathname === LOGIN_PATH &&
      isAdminUser(
        (user.user_metadata as Record<string, unknown>) ?? {},
        (user.app_metadata as Record<string, unknown>) ?? {}
      )
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return supabaseResponse;
  }

  // No valid session → redirect to login
  if (!user || userError) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userMetadata = (user.user_metadata as Record<string, unknown>) ?? {};
  const appMetadata = (user.app_metadata as Record<string, unknown>) ?? {};

  // Valid session but not an admin → redirect to login with error hint
  if (!isAdminUser(userMetadata, appMetadata)) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(loginUrl);
  }

  // All checks passed – user is an authenticated admin
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static  (static files)
     * - _next/image   (image optimisation)
     * - favicon.ico
     *
     * We do our own static asset filtering inside the middleware body
     * so we can keep this matcher broad and still short-circuit early.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
