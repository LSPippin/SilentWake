import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ChooseAccess() {
  const router = useRouter();

  const handleSelect = (mode) => {
    localStorage.setItem('userMode', mode);

    if (mode === 'guest') {
      router.push('/onboarding');
    } else if (mode === 'user') {
      router.push('/login');
    } else if (mode === 'new') {
      router.push('/signup');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Choose Your Access</h1>
      <p style={styles.subheading}>How would you like to use Silent Wake?</p>

      <div style={styles.buttonGroup}>
        <button
          style={styles.button}
          onClick={() => handleSelect('guest')}
          onMouseOver={(e) => e.target.style.backgroundColor = '#eef'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
        >
          Continue as Guest
        </button>

        <button
          style={styles.button}
          onClick={() => handleSelect('user')}
          onMouseOver={(e) => e.target.style.backgroundColor = '#eef'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
        >
          Log In
        </button>

        <button
          style={styles.button}
          onClick={() => handleSelect('new')}
          onMouseOver={(e) => e.target.style.backgroundColor = '#eef'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  subheading: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  },
  button: {
    padding: '0.9rem 2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '2px solid #333',
    cursor: 'pointer',
    backgroundColor: '#fff',
    transition: 'all 0.2s ease-in-out',
    width: '80%',
    maxWidth: '300px',
  },
};