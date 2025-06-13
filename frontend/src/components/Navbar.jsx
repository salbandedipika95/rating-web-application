import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
     <nav style={styles.nav}>
      <h3 style={styles.logo}>Store Rating App</h3>
      <div>
        {!isLoggedIn ? (
          <>
            <Link style={styles.link} to="/">Login</Link>
            <Link style={styles.link} to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        )}
      </div>
    </nav>
    </>
   
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#282c34',
    color: 'white',
    
  },
  logo: {
    margin: 0,
  },
  link: {
    marginRight: '1rem',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  button: {
    background: 'transparent',
    border: '1px solid white',
    padding: '0.5rem 1rem',
    color: 'white',
    cursor: 'pointer',
  },

};

export default Navbar;