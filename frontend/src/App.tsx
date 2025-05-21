import Main from './components/layout/Main';
import {Typography, Box} from '@mui/joy';
import Dashboard from "./pages/Dashboard.tsx";

function App() {
  return (
    <Main>
      <Typography level="h1" sx={{ mb: 3 }}>Dashboard</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Dashboard />
      </Box>
    </Main>
  );
}
export default App;