import React, { useState } from 'react';
import { Box, CssBaseline, CssVarsProvider } from '@mui/joy';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainProps {
  children: React.ReactNode;
  refreshDashboard: () => void;
}

const Main: React.FC<MainProps> = ({ children , refreshDashboard}) => {
    // State for sidebar open/close
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Box>
          <Sidebar open={sidebarOpen} onToggle={toggleSidebar}  refreshDashboard={refreshDashboard}/>
        </Box>

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: sidebarOpen ? '240px' : '80px', // Match sidebar width
            transition: 'margin-left 0.3s ease',
            width: { xs: '100%', sm: `calc(100% - ${sidebarOpen ? '240px' : '80px'})` },
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100vw',
            boxSizing: 'border-box',
            overflow: 'hidden',
            position: 'relative',
            mt: 0,
          }}
        >
          {/* Header */}
          <Header sidebarOpen={sidebarOpen} />
          {/* Page content */}
          <Box sx={{ p: 3, flexGrow: 1, mt: 0 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default Main;
