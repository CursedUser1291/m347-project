import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/layout/Main';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import {useState} from "react";

const App = () => {
    const [refresh, setRefresh] = useState(0);

    const refreshDashboard = () => {
        setRefresh(prev => prev + 1);
    };

    return (
        <Router>
            <Main refreshDashboard={refreshDashboard}>
                <Routes>
                    <Route path="/" element={<Dashboard refresh={refresh} refreshDashboard={refreshDashboard} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Main>
        </Router>
    );
};

export default App;