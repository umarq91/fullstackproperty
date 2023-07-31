// 404.js

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading} className='text-4xl font-bold'>404 - Page Not Found</h1>
      <p style={styles.text}>
        Oops! The page you are looking for does not exist.
        <br />
        Please check the URL or go back to the <Link to="/" className='text-blue-600 text-2xl'>homepage</Link>.

      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  heading: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '20px',
    marginBottom: '30px',
  },
  image: {
    width: '100%',
    maxWidth: '400px',
  },
};

export default NotFound;
