import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/layout/Main';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/Signup';

const App = () => {
    return (
        <Router>
            <Main>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Main>
        </Router>
    );
};

export default App;