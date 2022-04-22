import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <nav
        style={{
          paddingBottom: '1rem',
        }}
      >
        <Link to="/login">Login</Link>
        <div />
        <Link to="/register">Register</Link>
        <div />
        <Link to="/papers">Papers</Link>
        <div />
        <Link to="/authors">Authors</Link>
      </nav>
    </div>
  );
}
