import React, { useState } from 'react';
import LoginPage from './LoginPage';
import TranscriptionForm from './TranscriptionForm';
import './App.css';

function App() {
  const [token, setToken] = useState('');

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      {!token ? <LoginPage handleLogin={handleLogin} /> : <TranscriptionForm />}
    </div>
  );
}

export default App;
