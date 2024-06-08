import React from 'react';

const ErrorBanner = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div style={styles.container}>
      <h3>Error Logs:</h3>
      <ul style={styles.list}>
        {errors.map((error) => (
          <li key={error.id} style={styles.listItem}>{error.message}</li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
    zIndex: 1000,
  },
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  listItem: {
    marginBottom: '5px',
  },
};

export default ErrorBanner;
