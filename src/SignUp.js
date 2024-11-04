import PasswordMeterInput from "./components/usercomponents/PasswordComponent";
import * as React from 'react';
import { Button, TextField, Stack} from '@mui/material';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';

function SignUp({setHaveAccount}) {
    const [message, setMessage] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        formJson.password = password;

        try {
            const response = await fetch(`${apiBaseUrl}/api/v1/account/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
            });
            const result = await response.json();

            if (response.ok) {
                setMessage('Successfully signed up!');
                setHaveAccount(true);
            } else {
                setMessage(result.error || 'Error creating user.');
            }
        } catch (error) {
            console.error('リクエストエラー:', error);
            setMessage('An unexpected error occurred.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack spacing={1}>
                    <TextField name="username" placeholder='Username' type="text" required />
                    <TextField name="email" placeholder='your-email@your-email.com' type="email" required />
                    <PasswordMeterInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
            {message && <p>{message}</p>}
        </>
    );
}

export default SignUp;
