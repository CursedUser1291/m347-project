    import React from 'react';
    import { Box, IconButton, Typography, Input } from '@mui/joy';
    import { FaSearch, FaBell, FaQuestion } from 'react-icons/fa';

    interface HeaderProps {
      sidebarOpen: boolean;
    }

    const Header: React.FC<HeaderProps> = ({ sidebarOpen }) => {
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

          {/* Search bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1, mx: 3 }}>
            <Input
              size="sm"
              placeholder="Suchen..."
              startDecorator={<FaSearch />}
              sx={{
                maxWidth: '400px',
                display: { xs: sidebarOpen ? 'none' : 'flex', sm: 'flex' }
              }}
            />
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton variant="plain" color="neutral" size="sm">
              <FaBell />
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <FaQuestion />
            </IconButton>
          </Box>
        </Box>
      );
    };

    export default Header;
