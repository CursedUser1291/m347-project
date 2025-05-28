import { Box, IconButton, Input, Link, Typography} from "@mui/joy";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {Sidebar as ProSidebar} from "react-pro-sidebar";
import { VpnKey } from "@mui/icons-material";
import { Key } from "@mui/icons-material";
interface SidebarProps {open: boolean; onToggle: () => void;}

const Sidebar = ({ open, onToggle }: SidebarProps) => {

    return (
        <ProSidebar
            width={open ? '240px' : '80px'}
            collapsedWidth="80px"
            collapsed={!open}
            transitionDuration={300}
            backgroundColor="grey.50"
            style={{ height: '100vh', position: 'fixed', top: 0, left: 0, display: 'flex', flexDirection: 'column' }}
        >
      {/* Logo/Brand */}
      <Box
        sx={{
          height: '64px', // Match header height
          px: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
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




        {/* Information Section */}
        <Box sx={{ p: 2, mt: 8 }}> {/* Increased mt for consistent vertical alignment */}
            {!open ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Key />
                    <VpnKey />
                </Box>
            ) : (
                <Box>
                    <Typography level="body-sm" fontWeight="bold" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Key /> Public-Key
                    </Typography>
                    <Input size="sm" placeholder="Enter public key..." sx={{ mb: 2 }} />

                    <Typography level="body-sm" fontWeight="bold" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <VpnKey /> Private-Key
                    </Typography>
                    <Input size="sm" placeholder="Enter private key..." />
                </Box>
            )}
        </Box>

        {/* User Profile */}
        <Box sx={{
            p: 2,
            pb: 3,
            ml: 2,
            position: 'absolute',
            bottom: 0,
            width: '100%',
        }}>
            {open && (
                localStorage.getItem('user') ? (
                    <Box>
                        <Typography level="title-sm">{JSON.parse(localStorage.getItem('user') || '{}').name}</Typography>
                        <Typography level="body-xs" color="neutral">Administrator</Typography>
                        <Link
                            level="title-sm"
                            href="/login"
                            onClick={() => {localStorage.removeItem('user')}}
                            sx={{
                                color: 'primary.main',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Log out
                        </Link>
                    </Box>
                ) : (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography level="title-sm">Guest</Typography>
                        <Link
                            level="title-sm"
                            href="/login"
                            sx={{
                                color: 'primary.main',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Log in
                        </Link>
                        <Link
                            level="title-sm"
                            href="/signup"
                            sx={{
                                color: 'primary.main',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Sign in
                        </Link>
                    </Box>
                )
            )}
        </Box>
    </ProSidebar>
  );
};

export default Sidebar;
