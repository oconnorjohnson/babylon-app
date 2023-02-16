import React, { useState } from 'react';

function LoginPage({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSumbit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                handleLogin(data.token);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

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

export default LoginPage;