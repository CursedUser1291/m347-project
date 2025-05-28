
import { Box, Button, Input, Typography, Card, CardContent } from '@mui/joy';
import {useState} from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Add login logic here
        console.log('Login:', { email, password });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography level="h4" sx={{ mb: 2 }}>Login</Typography>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;