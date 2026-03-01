import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Erreur d\'authentification | VIVE Dashboard',
  description: 'Une erreur est survenue lors de l\'authentification.',
}

interface AuthErrorPageProps {
  searchParams: { error?: string }
}

function getErrorMessage(error: string | undefined): { title: string; description: string } {
  switch (error) {
    case 'Configuration':
      return {
        title: 'Erreur de configuration',
        description: 'Le serveur d\'authentification est mal configurÃ©. Veuillez contacter l\'administrateur.',
      }
    case 'AccessDenied':
      return {
        title: 'AccÃ¨s refusÃ©',
        description: 'Vous n\'avez pas les permissions nÃ©cessaires pour accÃ©der Ã  cette ressource.',
      }
    case 'Verification':
      return {
        title: 'Lien expirÃ©',
        description: 'Le lien de vÃ©rification a expirÃ© ou a dÃ©jÃ  Ã©tÃ© utilisÃ©. Veuillez en demander un nouveau.',
      }
    case 'OAuthSignin':
    case 'OAuthCallback':
    case 'OAuthCreateAccount':
    case 'OAuthAccountNotLinked':
      return {
        title: 'Erreur OAuth',
        description: 'Une erreur est survenue lors de la connexion via le fournisseur externe. Veuillez rÃ©essayer.',
      }
    case 'EmailCreateAccount':
    case 'EmailSignin':
      return {
        title: 'Erreur d\'envoi d\'e-mail',
        description: 'Impossible d\'envoyer l\'e-mail de connexion. VÃ©rifiez votre adresse et rÃ©essayez.',
      }
    case 'CredentialsSignin':
      return {
        title: 'Identifiants incorrects',
        description: 'L\'adresse e-mail ou le mot de passe est incorrect. Veuillez vÃ©rifier vos informations.',
      }
    case 'SessionRequired':
      return {
        title: 'Session requise',
        description: 'Vous devez Ãªtre connectÃ© pour accÃ©der Ã  cette page.',
      }
    default:
      return {
        title: 'Erreur d\'authentification',
        description: 'Une erreur inattendue est survenue lors de l\'authentification. Veuillez rÃ©essayer.',
      }
  }
}

export default function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const { title, description } = getErrorMessage(searchParams.error)

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* Logo VIVE */}
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontSize: '2rem',
              fontWeight: '800',
              letterSpacing: '0.15em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
            }}
          >
            VIVE
          </span>
        </div>

        {/* Card erreur */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#1C1C28',
            borderRadius: '1rem',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            boxShadow: '0 0 40px rgba(239, 68, 68, 0.08)',
          }}
        >
          {/* IcÃ´ne erreur */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '2px solid rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          {/* Textes */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h1
              style={{
                margin: 0,
                fontSize: '1.375rem',
                fontWeight: '700',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: '0.9375rem',
                lineHeight: '1.6',
                color: '#A0A0B8',
              }}
            >
              {description}
            </p>
          </div>

          {/* Code d'erreur */}
          {searchParams.error && (
            <div
              style={{
                width: '100%',
                backgroundColor: 'rgba(239, 68, 68, 0.07)',
                borderRadius: '0.5rem',
                padding: '0.625rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: '#6B6B80', fontWeight: '500' }}>Code :</span>
              <code
                style={{
                  fontSize: '0.8125rem',
                  color: '#EF4444',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontWeight: '600',
                }}
              >
                {searchParams.error}
              </code>
            </div>
          )}

          {/* SÃ©parateur */}
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
            }}
          />

          {/* Actions */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <Link
              href="/login"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.875rem 1.5rem',
                backgroundColor: '#3D8BFF',
                color: '#FFFFFF',
                borderRadius: '0.625rem',
                fontSize: '0.9375rem',
                fontWeight: '600',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'background-color 0.2s ease',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
              </svg>
              RÃ©essayer
            </Link>

            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '0.875rem 1.5rem',
                backgroundColor: 'transparent',
                color: '#A0A0B8',
                borderRadius: '0.625rem',
                fontSize: '0.9375rem',
                fontWeight: '500',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              Retour Ã  l&apos;accueil
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p
          style={{
            margin: 0,
            fontSize: '0.8125rem',
            color: '#4A4A5A',
            textAlign: 'center',
            lineHeight: '1.5',
          }}
        >
          Besoin d&apos;aide ?{' '}
          <a
            href="mailto:support@vive.com"
            style={{
              color: '#3D8BFF',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            Contacter le support
          </a>
        </p>
      </div>
    </div>
  )
}
