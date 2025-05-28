
import { Box, Button, Input, Typography, Card, CardContent } from '@mui/joy';
import {useState} from "react";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        // Add sign-up logic here
        console.log('Sign Up:', { email, password });
    };
    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography level="h4" sx={{ mb: 2 }}>Sign Up</Typography>
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
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                    />
                    <Button onClick={handleSignUp} sx={{ width: '100%' }}>Sign Up</Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default SignUp;