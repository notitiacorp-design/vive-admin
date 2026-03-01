import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

/**
 * Generic DB type placeholder. Replace with your generated `Database` type
 * from `supabase gen types typescript` for full type-safety.
 *
 * Example:
 *   import type { Database } from '@/types/supabase';
 */
export type Database = {
  // Extend this with your generated schema or import from '@/types/supabase'
  [key: string]: unknown;
};

export type AdminSupabaseClient = SupabaseClient<Database>;

// ---------------------------------------------------------------------------
// Environment validation
// ---------------------------------------------------------------------------

function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `[supabase-admin] Missing required environment variable: "${name}". ` +
      `Ensure it is set in your .env.local / deployment environment.`
    );
  }
  return value;
}

// ---------------------------------------------------------------------------
// Singleton factory
// ---------------------------------------------------------------------------

/**
 * Singleton reference. We store this at module level so the client is not
 * recreated on every hot-reload in development or on every request edge invocation.
 */
let _adminClient: AdminSupabaseClient | null = null;

/**
 * Returns a Supabase client that uses the **service role** key.
 *
 * â ï¸  SECURITY NOTES:
 *  - This client bypasses Row Level Security (RLS).
 *  - NEVER expose this client or its key to the browser / client bundle.
 *  - Only import this file from Server Components, API Route Handlers,
 *    Server Actions, or middleware running exclusively on the server.
 *  - Keep SUPABASE_SERVICE_ROLE_KEY out of NEXT_PUBLIC_* variables.
 */
export function getSupabaseAdminClient(): AdminSupabaseClient {
  if (_adminClient) return _adminClient;

  const supabaseUrl = getRequiredEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  const serviceRoleKey = getRequiredEnvVar('SUPABASE_SERVICE_ROLE_KEY');

  _adminClient = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      /**
       * Disable automatic session persistence. The admin client acts on
       * behalf of the system, not an individual user session.
       */
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        /**
         * Tag requests originating from the admin client so they are
         * identifiable in Supabase logs / PostgREST logs.
         */
        'x-application-name': 'vive-admin-server',
      },
    },
  });

  return _adminClient;
}

// ---------------------------------------------------------------------------
// Convenience re-export
// ---------------------------------------------------------------------------

/**
 * Pre-instantiated admin client for ergonomic imports:
 *
 * ```ts
 * import { supabaseAdmin } from '@/lib/supabase-admin';
 * const { data, error } = await supabaseAdmin.from('users').select('id, email, name, role, created_at');
 * ```
 *
 * Note: The client is lazily initialised on first access via the getter,
 * which means environment variable validation only runs when the module is
 * first used (not at build time).
 */
export const supabaseAdmin: AdminSupabaseClient = new Proxy(
  {} as AdminSupabaseClient,
  {
    get(_target, prop: string) {
      return (getSupabaseAdminClient() as unknown as Record<string, unknown>)[prop];
    },
  }
);

// ---------------------------------------------------------------------------
// Admin-specific helper utilities
// ---------------------------------------------------------------------------

export interface AdminUserRecord {
  id: string;
  email: string | undefined;
  role: string | undefined;
  createdAt: string;
  lastSignInAt: string | undefined;
  emailConfirmedAt: string | undefined;
  appMetadata: Record<string, unknown>;
  userMetadata: Record<string, unknown>;
  banned: boolean;
}

/**
 * Fetches a page of users from Supabase Auth admin API.
 * Useful for the admin dashboard user management section.
 */
export async function listAdminUsers(
  page = 1,
  perPage = 50
): Promise<{ users: AdminUserRecord[]; total: number }> {
  const client = getSupabaseAdminClient();

  const { data, error } = await client.auth.admin.listUsers({
    page,
    perPage,
  });

  if (error) {
    throw new Error(`[supabase-admin] listAdminUsers failed: ${error.message}`);
  }

  const users: AdminUserRecord[] = (data.users ?? []).map((u) => ({
    id: u.id,
    email: u.email,
    role: (u.app_metadata?.role as string | undefined) ??
          (u.user_metadata?.role as string | undefined),
    createdAt: u.created_at,
    lastSignInAt: u.last_sign_in_at,
    emailConfirmedAt: u.email_confirmed_at,
    appMetadata: (u.app_metadata as Record<string, unknown>) ?? {},
    userMetadata: (u.user_metadata as Record<string, unknown>) ?? {},
    banned: u.banned ?? false,
  }));

  return { users, total: data.total ?? users.length };
}

/**
 * Promotes a user to the 'admin' role by updating their app_metadata.
 * app_metadata can only be written by the service role â not by the user.
 */
export async function setUserAdminRole(
  userId: string,
  isAdmin: boolean
): Promise<void> {
  const client = getSupabaseAdminClient();

  const { error } = await client.auth.admin.updateUserById(userId, {
    app_metadata: { role: isAdmin ? 'admin' : 'user' },
  });

  if (error) {
    throw new Error(
      `[supabase-admin] setUserAdminRole failed for user ${userId}: ${error.message}`
    );
  }
}

/**
 * Deletes a user from Supabase Auth. Handle with care.
 */
export async function deleteAuthUser(userId: string): Promise<void> {
  const client = getSupabaseAdminClient();

  const { error } = await client.auth.admin.deleteUser(userId);

  if (error) {
    throw new Error(
      `[supabase-admin] deleteAuthUser failed for user ${userId}: ${error.message}`
    );
  }
}
