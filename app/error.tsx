"use client"

import { useEffect } from "react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[VIVE Dashboard Error]", error)
  }, [error])

  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#0A0A0F",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#1C1C28",
            border: "1px solid #EF444433",
            borderRadius: "16px",
            padding: "48px",
            maxWidth: "520px",
            width: "calc(100% - 48px)",
            textAlign: "center",
            boxShadow: "0 0 48px rgba(239, 68, 68, 0.08), 0 24px 64px rgba(0,0,0,0.6)",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#EF444415",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              border: "1px solid #EF444430",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          {/* Title */}
          <h1
            style={{
              color: "#F2F2F8",
              fontSize: "22px",
              fontWeight: "700",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Une erreur est survenue
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: "#8888A4",
              fontSize: "15px",
              margin: "0 0 24px",
              lineHeight: "1.6",
            }}
          >
            Le tableau de bord a rencontrÃ© un problÃ¨me inattendu. Vous pouvez
            rÃ©essayer ou contacter le support si le problÃ¨me persiste.
          </p>

          {/* Error message */}
          {error.message && (
            <div
              style={{
                backgroundColor: "#EF444410",
                border: "1px solid #EF444425",
                borderRadius: "8px",
                padding: "12px 16px",
                marginBottom: "28px",
                textAlign: "left",
              }}
            >
              <p
                style={{
                  color: "#EF4444",
                  fontSize: "13px",
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                  margin: 0,
                  wordBreak: "break-word",
                  lineHeight: "1.5",
                }}
              >
                {error.message}
              </p>
              {error.digest && (
                <p
                  style={{
                    color: "#8888A4",
                    fontSize: "11px",
                    margin: "8px 0 0",
                    fontFamily: "'Fira Code', 'Courier New', monospace",
                  }}
                >
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: "#3D8BFF",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                letterSpacing: "0.01em",
                transition: "background-color 0.2s ease, transform 0.1s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#5A9EFF"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#3D8BFF"
              }}
              onMouseDown={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(0.97)"
              }}
              onMouseUp={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)"
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
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              RÃ©essayer
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                backgroundColor: "transparent",
                color: "#8888A4",
                border: "1px solid #2A2A3C",
                borderRadius: "8px",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                letterSpacing: "0.01em",
                transition:
                  "border-color 0.2s ease, color 0.2s ease, transform 0.1s ease",
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLButtonElement
                btn.style.borderColor = "#3D8BFF"
                btn.style.color = "#F2F2F8"
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLButtonElement
                btn.style.borderColor = "#2A2A3C"
                btn.style.color = "#8888A4"
              }}
              onMouseDown={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(0.97)"
              }}
              onMouseUp={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)"
              }}
            >
              Retour Ã  l'accueil
            </button>
          </div>

          {/* Footer */}
          <p
            style={{
              color: "#44445A",
              fontSize: "12px",
              margin: "28px 0 0",
            }}
          >
            VIVE Dashboard &mdash; Si le problÃ¨me persiste, contactez le support
          </p>
        </div>
      </body>
    </html>
  )
}
