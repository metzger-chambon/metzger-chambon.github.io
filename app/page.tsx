// app/page.tsx or pages/index.tsx

export default function Home() {
  return (
    <main style={styles.container}>
      <h1 style={styles.title}>🔬 Site Under Construction</h1>
      <p style={styles.subtitle}>Our laboratory website is under construction.</p>
      <p style={styles.credits}>Thank you for your patience.</p>
    </main>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    fontFamily: 'sans-serif',
    textAlign: 'center' as const,
    padding: '0 1rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#222',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '2rem',
  },
  credits: {
    fontSize: '0.9rem',
    color: '#888',
  },
};
