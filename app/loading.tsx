export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#0A0A0F',
        gap: '24px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '56px',
          height: '56px',
        }}
      >
        <style>{`
          @keyframes vive-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes vive-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          .vive-spinner {
            animation: vive-spin 0.9s linear infinite;
          }
          .vive-logo-pulse {
            animation: vive-pulse 1.8s ease-in-out infinite;
          }
          .vive-text-pulse {
            animation: vive-pulse 1.8s ease-in-out infinite;
            animation-delay: 0.3s;
          }
        `}</style>

        {/* Outer ring */}
        <svg
          className="vive-spinner"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '56px',
            height: '56px',
          }}
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="#1C1C28"
            strokeWidth="4"
          />
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="#3D8BFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="150.796"
            strokeDashoffset="113.097"
          />
        </svg>

        {/* Inner logo dot */}
        <div
          className="vive-logo-pulse"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#3D8BFF',
            boxShadow: '0 0 12px rgba(61, 139, 255, 0.6)',
          }}
        />
      </div>

      {/* Skeleton card strip */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          className="vive-logo-pulse"
          style={{
            width: '160px',
            height: '8px',
            borderRadius: '8px',
            backgroundColor: '#1C1C28',
          }}
        />
        <div
          className="vive-logo-pulse"
          style={{
            width: '110px',
            height: '8px',
            borderRadius: '8px',
            backgroundColor: '#1C1C28',
            animationDelay: '0.15s',
          }}
        />
      </div>

      {/* Label */}
      <p
        className="vive-text-pulse"
        style={{
          margin: 0,
          fontSize: '13px',
          fontWeight: 500,
          color: '#A8A8C0',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        Chargementâ¦
      </p>
    </div>
  );
}
