
// This is the main component of the app. It is responsible for rendering the login page or the transcription form based on whether the user is logged in or not.
// The handleLogin function is passed to the LoginPage component as a prop. It is called when the user submits the login form. It makes a POST request to the /api/login route on the server. If the login is successful, the token is stored in state. If the login is unsuccessful, an error message is logged to the console.
import React, { useState } from 'react';
import LoginPage from './LoginPage';
import TranscriptionForm from './TranscriptionForm';
import './App.css';

// The App component is the main component of the app. It is responsible for rendering the login page or the transcription form based on whether the user is logged in or not.
function App() {
  const [token, setToken] = useState(''); // The token is stored in state

  const handleLogin = async (email, password) => { // The handleLogin function is passed to the LoginPage component as a prop. It is called when the user submits the login form. It makes a POST request to the /api/login route on the server. If the login is successful, the token is stored in state. If the login is unsuccessful, an error message is logged to the console.
    try {
      const response = await fetch('/api/login', { // Make a POST request to the /api/login route on the server
        method: 'POST', // The request method is POST
        headers: { 'Content-Type': 'application/json' }, // The request body is JSON
        body: JSON.stringify({ email, password }) // The request body is the email and password
      });

      const data = await response.json(); // The response is parsed as JSON

      if (response.ok) { // If the response is OK, the token is stored in state
        setToken(data.token); // The token is stored in state
      } else { // If the response is not OK, an error is thrown
        throw new Error(data.message); // The error message is logged to the console
      }
    } catch (error) { // If there is an error, the error message is logged to the console
      console.error(error.message); // The error message is logged to the console
    }
  }

  return ( // The LoginPage component is rendered if the user is not logged in. The TranscriptionForm component is rendered if the user is logged in.
    <div>
      {!token ? <LoginPage handleLogin={handleLogin} /> : <TranscriptionForm />}
    </div>
  );
}

// The App component is exported
export default App; 
