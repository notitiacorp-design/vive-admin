import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Connexion â VIVE Admin',
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
            Connectez-vous Ã  votre espace d'administration
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
          Â© {new Date().getFullYear()} VIVE â Tous droits rÃ©servÃ©s
        </p>
      </div>
    </main>
  )
}

/* âââââââââââââââââââââââââââââââââââââââââââââ
   Client Component â formulaire interactif
âââââââââââââââââââââââââââââââââââââââââââââ */

'use client'

import { useState, useTransition } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

function LoginForm() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const [focusedField, setFocusedField] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError('Identifiants invalides. Veuillez rÃ©essayer.')
        return
      }

      router.push('/dashboard')
      router.refresh()
    })
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '0.72rem 1rem',
    backgroundColor: '#0A0A0F',
    border: `1.5px solid ${
      focusedField === field ? '#3D8BFF' : '#2A2A38'
    }`,
    borderRadius: '10px',
    color: '#F2F2F8',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  })

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#B0B0C8',
    fontSize: '0.83rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    letterSpacing: '0.01em',
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Champ Email */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label htmlFor="email" style={labelStyle}>
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          placeholder="admin@exemple.com"
          style={inputStyle('email')}
          disabled={isPending}
        />
      </div>

      {/* Champ Mot de passe */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}
        >
          <label htmlFor="password" style={{ ...labelStyle, marginBottom: 0 }}>
            Mot de passe
          </label>
          <a
            href="/forgot-password"
            style={{
              color: '#3D8BFF',
              fontSize: '0.8rem',
              textDecoration: 'none',
            }}
          >
            Mot de passe oubliÃ© ?
          </a>
        </div>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
          placeholder="â¢â¢â¢â¢â¢â¢â¢â¢"
          style={inputStyle('password')}
          disabled={isPending}
        />
      </div>

      {/* Message d'erreur */}
      {error && (
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span style={{ color: '#EF4444', fontSize: '0.85rem' }}>{error}</span>
        </div>
      )}

      {/* Bouton de connexion */}
      <button
        type="submit"
        disabled={isPending}
        style={{
          width: '100%',
          padding: '0.78rem',
          backgroundColor: isPending ? '#2A5BA8' : '#3D8BFF',
          color: '#ffffff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '0.95rem',
          fontWeight: '600',
          cursor: isPending ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s ease, opacity 0.2s ease',
          opacity: isPending ? 0.75 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          letterSpacing: '0.01em',
        }}
      >
        {isPending ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                animation: 'spin 0.8s linear infinite',
              }}
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Connexion en coursâ¦
          </>
        ) : (
          'Se connecter'
        )}
      </button>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder {
          color: #44445A;
        }
        button:hover:not(:disabled) {
          background-color: #5A9FFF !important;
        }
      `}</style>
    </form>
  )
}
