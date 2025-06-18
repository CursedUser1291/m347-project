
import { Box, Button, Input, Typography, Card, CardContent } from '@mui/joy';
import {useState} from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/login', {
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
                localStorage.removeItem('publicKeys')
                window.location.href = '/';
            } else {
                setError('Login failed. Please check your username and password.');
            }
        } catch {
            setError('An error occurred while trying to log in. Please try again later.');
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography level="h4" sx={{ mb: 2 }}>Login</Typography>
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
                    <Button onClick={handleLogin} sx={{ width: '100%' }}>Login</Button>
                    <Typography level="body-sm" sx={{ mt: 2 }}>
                        Don't have an account? <a href="/signup">Register here</a>
                    </Typography>
                    {error && <Typography level="body-sm" color="danger" sx={{ mt: 2 }}>{error}</Typography>}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;