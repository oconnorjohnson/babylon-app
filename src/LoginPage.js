// This component is responsible for logging in a user.
// It is rendered by the App component if the user is not logged in.
// It is passed a handleLogin function as a prop.
// The handleLogin function is called when the user submits the login form.
// It makes a POST request to the /api/login route on the server.
// If the login is successful, the token is stored in state.
// If the login is unsuccessful, an error message is logged to the console.

import React, { useState } from 'react'; // The useState hook is imported from React

function LoginPage({ handleLogin }) { // The LoginPage component is passed a handleLogin function as a prop
    const [email, setEmail] = useState(''); // The email and password are stored in state
    const [password, setPassword] = useState(''); // The email and password are stored in state

    const handleSumbit = async (event) => { // The handleSumbit function is called when the user submits the login form
        event.preventDefault(); // The default behavior of the form is prevented
        
        // The handleLogin function is called with the email and password as arguments
        try {
            const response = await fetch('/api/login', { // Make a POST request to the /api/login route on the server
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json(); // The response is parsed as JSON

            if (response.ok) { // If the response is OK, the token is stored in state
                handleLogin(data.token); // The handleLogin function is called with the token as an argument
            } else {
                throw new Error(data.message); // If the response is not OK, an error is thrown
            }
        } catch (error) {
            console.error(error.message); // If there is an error, the error message is logged to the console
        }
    }

    // The LoginPage component is rendered
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSumbit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

// The LoginPage component is exported
export default LoginPage;