import {Avatar, Box, IconButton, Input, Typography} from "@mui/joy";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {Sidebar as ProSidebar} from "react-pro-sidebar";
import { VpnKey } from "@mui/icons-material";
import { Key, MeetingRoom } from "@mui/icons-material";
interface SidebarProps {open: boolean; onToggle: () => void;}

const Sidebar = ({ open, onToggle }: SidebarProps) => {

    return (
    <ProSidebar
      width={open ? '240px' : '80px'}
      collapsedWidth="80px"
      collapsed={!open}
      transitionDuration={300}
      backgroundColor="grey.50"
      style={{ height: '100vh', position: 'fixed', top: 0, left: 0 }}
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
        {open && <Typography level="title-lg">
            <MeetingRoom />
            ruumi juhataja
        </Typography>}
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
      <Box
        sx={{
          p: 2,
          pb: 3,
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
            <Typography level="title-sm">Username</Typography>
            <Typography level="body-xs" color="neutral">Role</Typography>
          </Box>
        )}
      </Box>
    </ProSidebar>
  );
};

export default Sidebar;
