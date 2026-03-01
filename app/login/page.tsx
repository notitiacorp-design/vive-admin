import { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Connexion â VIVE Admin',
}
export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
        }}
      >
        {/* Logo / Titre */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: '#3D8BFF',
              marginBottom: '1.25rem',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1
            style={{
              color: '#F2F2F8',
              fontSize: '1.75rem',
              fontWeight: '700',
              margin: '0 0 0.4rem',
              letterSpacing: '-0.02em',
            }}
          >
            VIVE Admin
          </h1>
          <p style={{ color: '#8888A4', fontSize: '0.9rem', margin: 0 }}>
            Connectez-vous ÃÂ  votre espace d'administration
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: '#1C1C28',
            border: '1px solid #2A2A38',
            borderRadius: '16px',
            padding: '2rem',
          }}
        >
          <LoginForm />
        </div>

        <p
          style={{
            textAlign: 'center',
            color: '#55556A',
            fontSize: '0.78rem',
            marginTop: '1.75rem',
          }}
        >
          ÃÂ© {new Date().getFullYear()} VIVE Ã¢ÂÂ Tous droits rÃÂ©servÃÂ©s
        </p>
      </div>
    </main>
  )
}