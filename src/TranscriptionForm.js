// This component will be the first thing the user sees when they visit the site.
// It is rendered by the App component if the user is logged in.
// It is passed a handleLogin function as a prop.
// The handleLogin function is called when the user submits the login form.
// It makes a POST request to the /api/login route on the server.
// If the login is successful, the token is stored in state.
// If the login is unsuccessful, an error message is logged to the console.

import React from 'react';

// The TranscriptionForm component is the first thing the user sees when they visit the site.
function TranscriptionForm() {
    return (
        <div>
            <h1>Welcome!</h1>
            <h2>Choose a file to get started . . .</h2>
            <form>
                <input type="file" input/>
                <button>Transcribe</button>
            </form>
        </div>
    );
}

// The TranscriptionForm component is exported
export default TranscriptionForm;