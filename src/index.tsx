import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Papers from './routes/papers';
import Authors from './routes/authors';
import Login from './routes/login';
import Register from './routes/register';
import { SnackbarContextProvider } from './context/SnackbarContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="papers" element={<Papers />} />
          <Route path="authors" element={<Authors />} />
        </Routes>
      </BrowserRouter>
    </SnackbarContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
