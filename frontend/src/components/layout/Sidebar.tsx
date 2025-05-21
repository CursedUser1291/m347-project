import React, { useState } from 'react';
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  menuClasses
} from 'react-pro-sidebar';
import {
  Typography,
  IconButton,
  Avatar,
  Box,
  Divider,
  Input
} from '@mui/joy';
import {
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  // State for key inputs
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  // Navigation items
  const navItems = [
    { text: 'Public-Key', value: publicKey, onChange: setPublicKey },
    { text: 'Private-Key', value: privateKey, onChange: setPrivateKey }
  ];

  // Custom styles for the sidebar
  const sidebarStyles = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: 1000,
    border: 'none',
    borderRight: '1px solid',
    borderColor: 'divider',
  };

  // Custom styles for the menu
  const menuStyles = {
    height: 'calc(100% - 160px)',
    overflow: 'auto',
    [`& .${menuClasses.button}`]: {
      padding: '12px',
      justifyContent: open ? 'flex-start' : 'center',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    [`& .${menuClasses.icon}`]: {
      fontSize: '1.25rem',
    },
  };

  return (
    <ProSidebar
      width={open ? '240px' : '80px'}
      collapsedWidth="80px"
      collapsed={!open}
      transitionDuration={300}
      style={sidebarStyles}
      backgroundColor="white"
    >
      {/* Logo/Brand */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
        }}
      >
        {open && <Typography level="title-lg">RaumManager</Typography>}
        <IconButton
          onClick={onToggle}
          variant="plain"
          color="neutral"
          size="sm"
        >
          {open ? <FaChevronLeft /> : <FaChevronRight />}
        </IconButton>
      </Box>

      <Divider />

      {/* Navigation Links */}
      <Menu style={menuStyles}>
        {navItems.map((item) => (
          <MenuItem
            key={item.text}
            style={{ textAlign: open ? 'left' : 'center' }}
          >
            {open && (
              <Box sx={{ width: '100%' }}>
                <Typography
                  level="body-sm"
                  component="label"
                  htmlFor={`input-${item.text.toLowerCase().replace('-', '')}`}
                  sx={{
                    fontWeight: 'bold',
                    pt: item.text === 'Public-Key' ? 2 : 0
                  }}
                >
                  {item.text}
                </Typography>
                <Input
                  placeholder={`Enter ${item.text}`}
                  value={item.value}
                  onChange={(e) => item.onChange(e.target.value)}
                  sx={{
                    mt: 1,
                    width: '100%',
                    fontSize: '0.875rem',
                    pb: 0,
                    pt: 0,
                    '&:focus': {
                      boxShadow: 'none',
                      borderColor: 'primary.main',
                    }
                  }}
                  size="sm"
                  variant="outlined"
                  aria-label={`Input field for ${item.text}`}
                  id={`input-${item.text.toLowerCase().replace('-', '')}`}
                />
              </Box>
            )}
            {!open && item.text}
          </MenuItem>
        ))}
      </Menu>

      <Divider />

      {/* User Profile */}
      <Box
        sx={{
          p: 2,
          pb: 3, // Increased bottom padding
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Avatar
          size={open ? "md" : "sm"}
          src="https://i.pravatar.cc/150?img=3"
          alt="User Avatar"
        />
        {open && (
          <Box>
            <Typography level="title-sm">Max Mustermann</Typography>
            <Typography level="body-xs" color="neutral">Administrator</Typography>
          </Box>
        )}
      </Box>
    </ProSidebar>
  );
};

export default Sidebar;
