import { LocationOn, Key, Lock, Visibility, Check, ContentCopy, Close, Edit } from '@mui/icons-material';
import { Card, CardContent, Typography, Input, Box, Chip, Button, Modal, ModalDialog, IconButton, Divider, FormControl, FormLabel, Textarea } from '@mui/joy';
import {useEffect, useState} from "react";
import {participantsToArray} from "../utils/participantsToArray.ts";

interface AppointmentCard {
    location: string;
    title: string;
    camera: boolean;
    beamer: boolean;
    touchscreen: boolean;
    whiteboard: boolean;
    comment: string;
    formattedDate: string;
    startTime: string;
    endTime: string;
    participants: string;
    publicKey: string;
    privateKey: string;
    refreshDashboard: () => void;
}

const AppointmentCard = ({
    location,
    title,
    camera,
    beamer,
    touchscreen,
    whiteboard,
    comment,
    formattedDate,
    startTime,
    endTime,
    participants,
    publicKey,
    privateKey,
    refreshDashboard
}: AppointmentCard) => {

    const theme = {
card: {
    background: undefined,
    text: undefined,
    border: undefined,
},
editCard: {
    background: undefined,
    text: undefined,
},
chip: {
    background: undefined,
    border: undefined,
    text: undefined,
},
input: {
    background: undefined,
    text: undefined,
}
    };
    const [keyModalOpen, setKeyModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [showKey, setShowKey] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(String);
    const [password, setPassword] = useState('');
    const [rooms, setRooms] = useState<{ name: string }[]>([]);


    const [editedDate, setEditedDate] = useState(formattedDate);
    const [editedStartTime, setEditedStartTime] = useState(startTime);
    const [editedEndTime, setEditedEndTime] = useState(endTime);
    const [editedLocation, setEditedLocation] = useState(location);
    const [editedComment, setEditedComment] = useState(comment);
    const [editedParticipants, setEditedParticipants] = useState(participants);

    function formatTimeTo12Hour(timeStr: string) {
        const [hour, minute] = timeStr.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
    }

    function handleCopy() {
        navigator.clipboard.writeText(publicKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    const closeKeyModal = () => {
        setKeyModalOpen(false);
        setShowKey(false);
        setError('');
        setPassword('')
    }

    const checkPassword = async () => {
        const username = JSON.parse(localStorage.getItem('user') || '{}').name

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                setShowKey(true);
                setError('');
            } else {
                setError('Authentication failed. Please check your password.');
            }
        } catch {
            setError('Authentication failed. Please check your password.');
        }
    }

    const getAllRooms = async () => {
        try {
            const response = await fetch('http://localhost:8080/rooms',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            if (response.ok) {
                const data = (await response.json()).sort((a, b) => b.name.localeCompare(a.name));
                setRooms(data);
            } else {
                console.error('Failed to fetch rooms:', response.statusText);
            }
        }
        catch (error) {
            console.error('An error occurred while fetching rooms:', error);
        }
    }

    const editReservation = async () => {
        try {
            const response = await fetch(`http://localhost:8080/reservations`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    privateKey: privateKey,
                    roomName: editedLocation,
                    date: editedDate,
                    startTime: editedStartTime,
                    endTime: editedEndTime,
                    comments: editedComment,
                    participants: participantsToArray(editedParticipants),
                }),
            });
            if (response.ok) {
                setEditModalOpen(false);
                refreshDashboard();
            }
        } catch {
            setError('An error occurred while trying to edit the reservation. Please try again.');
        }
    }

    useEffect(() => {
        if (editModalOpen) {
            getAllRooms();
        }
    }, [editModalOpen]);

    const closeModal = () => {
        setEditModalOpen(false)
        setEditedDate(formattedDate);
        setEditedStartTime(startTime);
        setEditedEndTime(endTime);
        setEditedLocation(location);
        setEditedComment(comment);
        setEditedParticipants(participants);
    }

    return (
        <Box sx={{ p: 2, maxWidth: '800px', mx: 'auto' }}>
            {/* Main container with single card layout */}
            <Card
                sx={{
                    width: '100%',
                    bgcolor: theme.card.background,
                    color: theme.card.text,
                    border: theme.card.border,
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: 'center' }}>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Chip 
                                size="sm" 
                                variant="outlined" 
                                startDecorator={<LocationOn />}
                                sx={{
                                    borderColor: theme.chip.border,
                                    color: theme.chip.text,
                                }}
                            >
                                {location}
                            </Chip>
                            {camera && (
                                <Chip 
                                    size="sm" 
                                    variant="outlined"
                                    sx={{
                                        borderColor: theme.chip.border,
                                        color: theme.chip.text,
                                    }}
                                >
                                    Camera
                                </Chip>
                            )}
                            {beamer && (
                                <Chip 
                                    size="sm" 
                                    variant="outlined"
                                    sx={{
                                        borderColor: theme.chip.border,
                                        color: theme.chip.text,
                                    }}
                                >
                                    Beamer
                                </Chip>
                            )}
                            {touchscreen && (
                                <Chip 
                                    size="sm" 
                                    variant="outlined"
                                    sx={{
                                        borderColor: theme.chip.border,
                                        color: theme.chip.text,
                                    }}
                                >
                                    Touchscreen
                                </Chip>
                            )}
                            {whiteboard && (
                                <Chip 
                                    size="sm" 
                                    variant="outlined"
                                    sx={{
                                        borderColor: theme.chip.border,
                                        color: theme.chip.text,
                                    }}
                                >
                                    Whiteboard
                                </Chip>
                            )}
                        </Box>
                        <Button 
                            size="sm" 
                            variant="outlined" 
                            startDecorator={<Edit />}
                            onClick={() => setEditModalOpen(true)}
                            sx={{ color: theme.chip.text }}
                        >
                            Edit
                        </Button>
                    </Box>

                    <Typography level="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                        {title}
                    </Typography>

                    <Typography level="body-md" sx={{ mb: 3 }}>
                        {comment}
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mb: 3 }}>
                        <Box>
                            <Typography level="body-sm" sx={{ mb: 1, fontWeight: 'bold' }}>
                                Participants
                            </Typography>
                            <Typography level="body-md">
                                {participants}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography level="body-sm" sx={{ mb: 1, fontWeight: 'bold' }}>
                                Date
                            </Typography>
                            <Typography level="body-md">
                                {formattedDate}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography level="body-sm" sx={{ mb: 1, fontWeight: 'bold' }}>
                                Starting Time
                            </Typography>
                            <Typography level="body-md">
                                {formatTimeTo12Hour(startTime)}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography level="body-sm" sx={{ mb: 1, fontWeight: 'bold' }}>
                                Ending Time
                            </Typography>
                            <Typography level="body-md">
                                {formatTimeTo12Hour(endTime)}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography level="title-sm" sx={{ mb: 2, textTransform: 'uppercase' }}>
                        Room Keys
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Box sx={{ flex: 1, minWidth: '250px', bgcolor: 'rgba(0,0,0,0.05)', p: 2, borderRadius: '8px' }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography level="body-sm" fontWeight="md">
                                    <Key fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} /> 
                                    Public Key
                                </Typography>
                                <Button 
                                    size="sm" 
                                    variant="outlined" 
                                    onClick={handleCopy} 
                                    startDecorator={copied ? <Check /> : <ContentCopy />}
                                    sx={{ color: theme.chip.text }}
                                >
                                    {copied ? 'Copied' : 'Copy'}
                                </Button>
                            </Box>
                            <Typography sx={{ fontFamily: 'monospace', p: 1, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}>
                                {publicKey}
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1, minWidth: '250px', bgcolor: 'rgba(0,0,0,0.05)', p: 2, borderRadius: '8px' }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography level="body-sm" fontWeight="md">
                                    <Lock fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} /> 
                                    Private Key
                                </Typography>
                                <Button 
                                    size="sm" 
                                    variant="outlined" 
                                    onClick={() => setKeyModalOpen(true)} 
                                    startDecorator={<Visibility />}
                                    sx={{ color: theme.chip.text }}
                                >
                                    Reveal
                                </Button>
                            </Box>
                            <Typography sx={{ fontFamily: 'monospace', p: 1, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}>
                                ••••••••••••••••••••••••••••
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    px={3}
                    py={2}
                    bgcolor="rgba(0,0,0,0.05)"
                    mt="auto"
                >
                </Box>
            </Card>

            {/* Modal for Private Key */}
            <Modal 
                open={keyModalOpen}
                onClose={() => { setKeyModalOpen(false); setShowKey(false); setError(''); setPassword('')}}
                sx={{ 
                    '& .MuiModalDialog-root': { 
                        bgcolor: theme.card.background,
                        color: theme.card.text,
                        border: theme.card.border,
                    }
                }}
            >
                <ModalDialog>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography level="title-md">Private Key Access</Typography>
                        <IconButton variant="plain" onClick={() => { closeKeyModal(); }}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Typography level="body-sm" mb={2}>
                        For security reasons, please enter your password to reveal the private key.
                    </Typography>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ 
                            mb: 2,
                            bgcolor: theme.input.background,
                            color: theme.input.text,
                            '--Input-focusedHighlight': 'white',
                        }} 
                    />
                    {error && (
                        <Typography color="danger" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    {showKey && (
                        <Typography sx={{
                            fontFamily: 'monospace', 
                            bgcolor: 'rgba(0,0,0,0.05)', 
                            p: 1.5, 
                            borderRadius: '4px', 
                            mb: 2
                        }}>
                            {privateKey}
                        </Typography>
                    )}
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Button 
                            variant="outlined" 
                            color="neutral"
                            onClick={() => { closeKeyModal(); }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={() => checkPassword()}
                            variant="solid"
                        >
                            Reveal Key
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>

            {/* Modal for Edit Appointment */}
            <Modal 
                open={editModalOpen} 
                onClose={() => setEditModalOpen(false)}
                sx={{ 
                    '& .MuiModalDialog-root': { 
                        bgcolor: theme.editCard.background,
                        color: theme.editCard.text,
                        border: theme.card.border,
                        maxWidth: '600px',
                        width: '100%',
                    }
                }}
            >
                <ModalDialog>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography level="h4">
                            Edit Appointment
                        </Typography>
                        <IconButton variant="plain" onClick={() => setEditModalOpen(false)}>
                            <Close />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel>Title</FormLabel>
                            <Input
                                value={editedLocation}
                                readOnly
                                sx={{
                                    bgcolor: theme.input.background,
                                    color: theme.input.text,
                                    '--Input-focusedHighlight': 'white',
                                }}
                            />
                        </FormControl>
                    <FormControl sx={{ flex: 1 }}>
                        <FormLabel>Date</FormLabel>
                        <Input
                            value={editedDate}
                            onChange={(e) => setEditedDate(e.target.value)}
                            sx={{
                                bgcolor: theme.input.background,
                                color: theme.input.text,
                                '--Input-focusedHighlight': 'white',
                            }}
                        />
                    </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel>Starting Time</FormLabel>
                            <Input 
                                value={editedStartTime}
                                onChange={(e) => setEditedStartTime(e.target.value)}
                                sx={{ 
                                    bgcolor: theme.input.background,
                                    color: theme.input.text,
                                    '--Input-focusedHighlight': 'white',
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel>Ending Time</FormLabel>
                            <Input
                                value={editedEndTime}
                                onChange={(e) => setEditedEndTime(e.target.value)}
                                sx={{
                                    bgcolor: theme.input.background,
                                    color: theme.input.text,
                                    '--Input-focusedHighlight': 'white',
                                }}
                            />
                        </FormControl>
                    </Box>

                    <FormControl sx={{ mb: 2 }}>
                        <FormLabel>Location</FormLabel>
                        <select
                            value={editedLocation}
                            onChange={(e) => setEditedLocation(e.target.value)}
                            style={{
                                backgroundColor: theme.input.background,
                                color: theme.input.text,
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '8px',
                                width: '100%',
                            }}
                        >
                            {rooms.map((room) => (
                                <option key={room.name} value={room.name}>
                                    {room.name}
                                </option>
                            ))}
                        </select>
                    </FormControl>

                    <FormControl sx={{ mb: 2 }}>
                        <FormLabel>Description</FormLabel>
                        <Textarea 
                            minRows={3}
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                            sx={{ 
                                bgcolor: theme.input.background,
                                color: theme.input.text,
                                '--Textarea-focusedHighlight': 'white',
                            }}
                        />
                    </FormControl>

                    <FormControl sx={{ mb: 2 }}>
                        <FormLabel>Participants</FormLabel>
                        <Input 
                            value={editedParticipants}
                            onChange={(e) => setEditedParticipants(e.target.value)}
                            sx={{ 
                                bgcolor: theme.input.background,
                                color: theme.input.text,
                                '--Input-focusedHighlight': 'white',
                            }}
                        />
                    </FormControl>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button 
                            variant="outlined" 
                            color="neutral" 
                            onClick={() => closeModal()}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={() => editReservation()}>Save Changes</Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    );
}

export default AppointmentCard;
