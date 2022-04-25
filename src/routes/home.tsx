import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <Container className="home">
      {/*<img src={logo} className="App-logo" alt="logo" />*/}
      <div className="App-logo">D4</div>
      <p>Welcome to the DBLP Discovery Dataset Demo</p>
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
    </Container>
  );
}
