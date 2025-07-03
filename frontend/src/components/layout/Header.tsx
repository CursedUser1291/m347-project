    import React from 'react';
    import { Box, Typography } from '@mui/joy';
    import ModeToggle from "../ModeToggle.tsx";
    import HelpPopup from "../HelpPopup.tsx";

    interface HeaderProps {
      sidebarOpen: boolean;
    }

    const Header: React.FC<HeaderProps> = () => {
      return (
        <Box
          component="header"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            py: 0,
            px: { xs: 2, sm: 3 },
            height: '64px',
            borderBottom: '1px solid',
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            zIndex: 900,
            backgroundColor: 'background.surface',
            transition: 'width 0.3s ease',
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
        >
            <Typography
                level="title-lg"
                sx={{ display: { xs: 'none', sm: 'block' } }}
                onClick={() => (window.location.href = '/')}
                style={{ cursor: 'pointer' }}
            >
                Dashboard
            </Typography>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
              <ModeToggle />
            <HelpPopup />
          </Box>
        </Box>
      );
    };

    export default Header;
