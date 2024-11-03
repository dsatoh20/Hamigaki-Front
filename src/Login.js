import * as React from 'react';
import { Button, TextField, Stack } from '@mui/material';
import { useUser } from './AuthWrapper';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://hamigaki-calender-d66c9cb2ddcf.herokuapp.com'
  : 'http://127.0.0.1:8000';

function Login({ setAuth }) {
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const { fetchUserInfo } = useUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`${apiBaseUrl}/api/v1/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // メールとパスワードをJSON形式で送信
            });

            if (response.ok) {
                const data = await response.json();
                // 認証トークンを保存して認証状態を更新
                localStorage.setItem('authToken', data.token); // トークンを保存
                
                // console.log('いま保存したトークンは、、、', data.token);
                fetchUserInfo();
                setMessage('Successfully logged in!');
                alert('Successfully logged in!');
                setAuth(true);
            } else {
                setMessage('Invalid credentials. Please try again.');
            }
        } catch (error) {
            setMessage('An unexpected error occurred.');
            console.error('Login error:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack spacing={1}>
                    <TextField 
                        name="email" 
                        placeholder="your-email@your-email.com" 
                        type="email" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField 
                        name="password"
                        placeholder="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
            {message && <p>{message}</p>}
        </>
    );
}

export default Login;
