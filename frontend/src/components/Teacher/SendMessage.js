import React, { useState } from 'react';

const SendMessage = () => {
    const [message, setMessage] = useState('');
    const [recipient, setRecipient] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, recipient }),
        });

        if (response.ok) {
            alert('Message sent successfully');
            setMessage('');
            setRecipient('');
        } else {
            alert('Failed to send message');
        }
    };

    return (
        <div>
            <h1>Send Message</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Recipient</label>
                    <input 
                        type="text" 
                        value={recipient} 
                        onChange={(e) => setRecipient(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Message</label>
                    <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default SendMessage;
