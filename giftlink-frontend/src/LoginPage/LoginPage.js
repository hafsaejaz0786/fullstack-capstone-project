import React, { useState } from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email, password })
        });
    };

    return <form onSubmit={handleLogin}></form>;
}

export default LoginPage;
