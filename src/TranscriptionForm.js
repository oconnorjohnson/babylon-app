import React from 'react';

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

export default TranscriptionForm;