'use client'

import { useState, useTransition } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
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
        setError('Identifiants invalides. Veuillez rÃÂ©essayer.')
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
            Mot de passe oubliÃÂ© ?
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
          placeholder="Ã¢ÂÂ¢Ã¢ÂÂ¢Ã¢ÂÂ¢Ã¢ÂÂ¢Ã¢ÂÂ¢Ã¢ÂÂ¢Ã¢ÂÂ¢Ã¢ÂÂ¢"
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
            Connexion en coursÃ¢ÂÂ¦
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
