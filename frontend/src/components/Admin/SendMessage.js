import React, { useState } from 'react';

const SendMessage = () => {
    const [message, setMessage] = useState('');
    const [recipient, setRecipient] = useState('');
    const [recipientRole, setRecipientRole] = useState('student');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setConfirmationMessage(''); // Clear any previous messages

        console.log('Attempting to send message:', { message, recipient, recipientRole });

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, recipient, recipientRole }),
            });

            const responseBody = await response.json();
            setLoading(false);

            if (response.ok) {
                setConfirmationMessage('✅ Message sent successfully!');
                setMessage('');
                setRecipient('');
                setRecipientRole('student');
            } else {
                setConfirmationMessage(responseBody.error || '❌ Failed to send the message. Please try again.');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error occurred while sending message:', error);
            setConfirmationMessage('❌ An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', marginBottom: '50px' }}>
            <h1 style={{ textAlign: 'center' }}>Send a Message</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="recipient" style={{ display: 'block', marginBottom: '5px' }}>
                        Recipient Username
                    </label>
                    <input
                        id="recipient"
                        type="text"
                        placeholder="Enter recipient's username"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="recipientRole" style={{ display: 'block', marginBottom: '5px' }}>
                        Recipient Role
                    </label>
                    <select
                        id="recipientRole"
                        value={recipientRole}
                        onChange={(e) => setRecipientRole(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="parent">Parent</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>
                        Message Content
                    </label>
                    <textarea
                        id="message"
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            minHeight: '100px',
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: loading ? '#6c757d' : '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
            {confirmationMessage && (
                <p
                    style={{
                        marginTop: '20px',
                        color: confirmationMessage.includes('✅') ? 'green' : 'red',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    {confirmationMessage}
                </p>
            )}
        </div>
    );
};

export default SendMessage;
