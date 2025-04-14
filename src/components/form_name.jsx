import { useState } from 'react';

export default function Form_Name() {
  const [name, setName] = useState('');

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        {['About', 'Hair', 'Your', 'Scalp'].map((word, index) => (
          <div key={index} style={styles.headerItem}>
            <h1 style={styles.mainHeading}>{word}</h1>
            <h2 style={styles.subHeading}>
              {['You', 'Health', 'Lifestyle', 'Assessment'][index]}
            </h2>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <div style={styles.progressBar}>
          <div style={styles.progressFill}></div>
        </div>
        <span style={styles.percentage}>0%</span>
      </div>

      {/* Content Section */}
      <div style={styles.content}>
        <h3 style={styles.question}>Before we start, can we get your name?</h3>
        <input
          type="text"
          placeholder="Your Name"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button style={styles.button}>
          NEXT →
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '40px 24px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '40px',
    gap: '16px',
  },
  headerItem: {
    textAlign: 'center',
    flex: 1,
  },
  mainHeading: {
    fontSize: '20px',
    fontWeight: 700,
    margin: '0 0 4px 0',
    color: '#2D2D2D',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  subHeading: {
    fontSize: '16px',
    fontWeight: 400,
    margin: 0,
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },
  progressContainer: {
    marginBottom: '48px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  progressBar: {
    flex: 1,
    height: '4px',
    backgroundColor: '#EEEEEE',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    width: '0%',
    height: '100%',
    backgroundColor: '#4A90E2',
    transition: 'width 0.3s ease',
  },
  percentage: {
    fontSize: '14px',
    color: '#666666',
    fontWeight: 500,
  },
  content: {
    textAlign: 'center',
    maxWidth: '400px',
    margin: '0 auto',
  },
  question: {
    fontSize: '20px',
    color: '#333333',
    margin: '0 0 32px 0',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #DDDDDD',
    borderRadius: '8px',
    fontSize: '16px',
    marginBottom: '32px',
    '&:focus': {
      outline: 'none',
      borderColor: '#4A90E2',
      boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
    },
  },
  button: {
    padding: '14px 32px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    margin: '0 auto',
    '&:hover': {
      backgroundColor: '#357ABD',
      transform: 'translateY(-1px)',
    },
  },
};