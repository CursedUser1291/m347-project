
import { Box, Button, Input, Typography, Card, CardContent } from '@mui/joy';
import {useState} from "react";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data));
                window.location.href = '/';
            } else {
                setError('Sign up failed. Please check your username and password.');
            }
        } catch {
            setError('An error occurred while trying to Sign up. Please try again later.');
        }
    };
    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography level="h4" sx={{ mb: 2 }}>Sign Up</Typography>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                    />
                    <Button onClick={handleSignUp} sx={{ width: '100%' }}>Sign Up</Button>

                    <Typography level="body-sm" sx={{ mt: 2 }}>
                        Already have an account? <a href="/login">Log in here</a>
                    </Typography>
                    {error && <Typography level="body-sm" color="danger" sx={{ mt: 2 }}>{error}</Typography>}
                </CardContent>
            </Card>
        </Box>
    );
};

export default SignUp;