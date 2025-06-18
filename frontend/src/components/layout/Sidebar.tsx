import {Option, Box, FormControl, IconButton, Input, Link, Modal, ModalDialog, Select, Typography} from "@mui/joy";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {ChevronRight, Key, MeetingRoom} from "@mui/icons-material";
import {useEffect, useState} from "react";
import AppointmentCard from "../AppointmentCard.tsx";

interface SidebarProps {
    open: boolean;
    onToggle: () => void;
    refreshDashboard: () => void;
}

const Sidebar = ({ open, onToggle, refreshDashboard }: SidebarProps) => {
    type Reservation = {
        id: string;
        user: {
            id: string;
            name: string;
            password: string;
        };
        room: {
            id: string;
            roomNumber: number;
            name: string;
            hasProjector: boolean;
            hasWhiteboard: boolean;
            hasTouchscreen: boolean;
            hasCamera: boolean;
        };
        date: string;
        startTime: string;
        endTime: string;
        comments: string;
        participants: string;
        privateKey: string;
        publicKey: string;
    };

    const [privateKey, setPrivateKey] = useState("");
    const [publicKey, setPublicKey] = useState("");
    const [publicKeys, setPublicKeys] = useState<string[]>(JSON.parse(localStorage.getItem('publicKeys') || '[]'));
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [publicModalOpen, setPublicModalOpen] = useState(false);
    const [privateModalOpen, setPrivateModalOpen] = useState(false);
    const [error, setError] = useState("");

    const handleFetchReservation = async () => {
        try {
            const response = await fetch(`http://localhost:8080/reservations/prvKey?privateKey=${privateKey}`);
            if (response.ok) {
                const data = await response.json();
                setReservation(data);
                setPrivateModalOpen(true);
                setError("");
                refreshDashboard();
            } else {
                setError("Invalid private key. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while fetching the reservation.");
        }
    };

    const handlePublicFetchReservation = async () => {
        try {
            const response = await fetch(`http://localhost:8080/reservations/pubKey?publicKey=${publicKey}`);
            if (response.ok) {
                const data = await response.json();
                setReservation(data);
                setPublicModalOpen(true);
                setError("");

                if (publicKeys.includes(publicKey)) {
                    return;
                } else {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    await usePublicKey(publicKey);
                    await getUserPublicKeys();
                }
            } else {
                setError("Invalid public key. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while fetching the reservation.");
        }
    };

    const usePublicKey = async (publicKey: string) => {
        const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        try {
            const response = await fetch(`http://localhost:8080/addPublicKey`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    publicKey: publicKey,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const updatedPublicKeys = [...publicKeys, data.publicKey];
                localStorage.setItem('publicKeys', JSON.stringify(updatedPublicKeys));
            } else {
                console.error("Failed to add public key:", response.statusText);
            }
        } catch (error) {
            console.error("An error occurred while adding public key:", error);
        }
    };

    const getUserPublicKeys = async () => {
        const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        try {
            const response = await fetch(`http://localhost:8080/publicKeys?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setPublicKeys(data);
                localStorage.setItem('publicKeys', JSON.stringify(data));
            } else {
                console.error("Failed to get public keys:", response.statusText);
            }
        } catch (err) {
            console.error("An error occurred while getting public keys:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('publicKeys');
        setPublicKeys([]);
        window.location.href = '/login';
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            getUserPublicKeys()
        }
        refreshDashboard();
    }, []);

    return (
        <Box
            sx={{
                width: open ? '240px' : '80px',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'grey.50',
                transition: 'width 0.3s ease',
            }}
        >
      {/* Logo/Brand */}
      <Box
        sx={{
          height: '64px',
          px: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          justifyContent: open ? 'space-between' : 'center',
        }}
      >
{open && (
  <Typography
    level="title-lg"
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      fontWeight: 'bold',
      color: 'primary.main'
    }}
  >
    <MeetingRoom />
    Ruumi
  </Typography>
)}
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
                    <Key />
                </Box>
            ) : (
                <Box>
                    <Typography level="body-sm" fontWeight="bold" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Key /> Public-Key
                    </Typography>
                    <Box sx={{ display: 'flex'}}>
                        <Input value={publicKey} size="sm" placeholder="Enter public key..." sx={{ mb: 2 }} onChange={(e) => setPublicKey(e.target.value)} />
                        <IconButton size="sm" onClick={handlePublicFetchReservation} sx={{ height: '30px', width: '40px' }}>
                            <ChevronRight />
                        </IconButton>
                    </Box>
                    {publicModalOpen && reservation && (
                        <Modal open={publicModalOpen} onClose={() => setPublicModalOpen(false)}>
                            <ModalDialog>
                                <AppointmentCard
                                    location={`Room ${reservation.room.roomNumber}`}
                                    title={reservation.room.name}
                                    camera={reservation.room.hasCamera}
                                    beamer={reservation.room.hasProjector}
                                    touchscreen={reservation.room.hasTouchscreen}
                                    whiteboard={reservation.room.hasWhiteboard}
                                    comment={reservation.comments}
                                    formattedDate={reservation.date}
                                    startTime={reservation.startTime}
                                    endTime={reservation.endTime}
                                    participants={reservation.participants}
                                    publicKey={reservation.publicKey}
                                    privateKey={reservation.privateKey}
                                    refreshDashboard={refreshDashboard}
                                    mode={"public"}
                                />
                            </ModalDialog>
                        </Modal>
                    )}

                    <Typography level="body-sm" fontWeight="bold" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Key /> Private-Key
                    </Typography>
                    <Box sx={{ display: 'flex'}}>
                        <Input size="sm" placeholder="Enter private key..." value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} />
                        <IconButton onClick={handleFetchReservation} size="sm" sx={{ height: '30px', width: '40px' }}>
                            <ChevronRight />
                        </IconButton>
                    </Box>
                    {privateModalOpen && reservation && (
                        <Modal open={privateModalOpen} onClose={() => {
                            setPrivateModalOpen(false);

                        }}>
                            <ModalDialog>
                                <AppointmentCard
                                    location={`Room ${reservation.room.roomNumber}`}
                                    title={reservation.room.name}
                                    camera={reservation.room.hasCamera}
                                    beamer={reservation.room.hasProjector}
                                    touchscreen={reservation.room.hasTouchscreen}
                                    whiteboard={reservation.room.hasWhiteboard}
                                    comment={reservation.comments}
                                    formattedDate={reservation.date}
                                    startTime={reservation.startTime}
                                    endTime={reservation.endTime}
                                    participants={reservation.participants}
                                    publicKey={reservation.publicKey}
                                    privateKey={reservation.privateKey}
                                    refreshDashboard={refreshDashboard}
                                    refreshAppointment={() => handleFetchReservation()}
                                    mode={"private"}
                                    setModalOpen={setPrivateModalOpen}
                                />
                            </ModalDialog>
                        </Modal>
                    )}
                </Box>
            )}
        </Box>

            <FormControl sx={{ mb: 2 }}>
                <Select
                    value={publicKey}
                    onChange={(e, newValue) => {
                        setPublicKey(newValue ?? '');
                    }}
                    sx={{ width: '80%', my: 2, ml: 2 }}
                    placeholder="Used Public Keys"
                >
                    {JSON.parse(localStorage.getItem('publicKeys') || '[]').map((key: string, index: number) => (
                        <Option key={index} value={key}>
                                {key}
                        </Option>
                    ))}
                </Select>
            </FormControl>

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
                            onClick={handleLogout}
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
    </Box>
    );
};

export default Sidebar;
