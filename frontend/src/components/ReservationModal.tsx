import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalDialog,
    Box,
    Typography,
    IconButton,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Snackbar,
    Select,
    Option
} from '@mui/joy';
import { Close, CheckCircle, Error } from '@mui/icons-material';
import {participantsToArray} from "../utils/participantsToArray.ts";

interface ReservationModalProps {
    open: boolean;
    privateKey?: string;
    onClose: () => void;
    initialData?: any;
    isEditMode?: boolean;
    refreshDashboard: () => void;
    refreshAppointment?: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
        open,
        privateKey ,
        onClose,
        initialData = {},
        isEditMode = false,
        refreshDashboard,
        refreshAppointment
    }) => {
    const [editedDate, setEditedDate] = useState(initialData.date || '');
    const [editedStartTime, setEditedStartTime] = useState(initialData.startTime || '');
    const [editedEndTime, setEditedEndTime] = useState(initialData.endTime || '');
    const [editedLocation, setEditedLocation] = useState(initialData.location || '');
    const [editedComment, setEditedComment] = useState(initialData.comment || '');
    const [editedParticipants, setEditedParticipants] = useState(initialData.participants || '');
    const [roomIsAvailable, setRoomIsAvailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [rooms, setRooms] = useState<{ name: string }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [timeSnackbarError, setTimeSnackbarError] = useState(false);
    const [timeErrorMsg, setTimeErrorMsg] = useState('');

    const isValidTimeFormat = (value: string) => {
        const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        return regex.test(value);
    };

    const checkRoomAvailable = async () => {
        if (editedStartTime === '' || editedEndTime === '') {
            setTimeErrorMsg('Start time and end time are required to check room availability.');
            setTimeSnackbarError(true);
            setTimeout(() => setTimeSnackbarError(false), 3000);
            return;
        }
        if (editedStartTime > editedEndTime) {
            setTimeErrorMsg('Start time cannot be later than end time.');
            setTimeSnackbarError(true);
            setTimeout(() => setTimeSnackbarError(false), 3000);
            return;
        }
        if (!editedLocation) {
            console.error('Location is required to check room availability.');
            setSnackbarOpen(true);
            return;
        }
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            setLoading(false);
            const response = await fetch('http://localhost:8080/rooms/available', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    privateKey: privateKey,
                    roomName: editedLocation,
                    date: editedDate,
                    startTime: editedStartTime,
                    endTime: editedEndTime,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setRoomIsAvailable(data);
                setSnackbarOpen(true);
                setTimeout(() => setSnackbarOpen(false), 2000);
            } else {
                console.error('Failed to fetch room availability:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred while checking room availability:', error);
        } finally {
            setLoading(false);
        }
    };

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

    const handleSave = async () => {
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
                    userId: JSON.parse(localStorage.getItem('user') || '{}').id,
                }),
            });
            if (response.ok) {
                onClose();
                if (refreshAppointment) {
                    refreshAppointment();
                }
                refreshDashboard();
            }
        } catch {
            setError('An error occurred while trying to edit the reservation. Please try again.');
        }
    }

    useEffect(() => {
        getAllRooms();
        if (open) {
            setEditedDate(initialData.date || '');
            setEditedStartTime(initialData.startTime || '');
            setEditedEndTime(initialData.endTime || '');
            setEditedLocation(initialData.location || '');
            setEditedComment(initialData.comment || '');
            setEditedParticipants(initialData.participants || '');
            setRoomIsAvailable(false);
        }
    }, [open, initialData]);

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography level="h4">{isEditMode ? 'Edit Appointment' : 'Add Appointment'}</Typography>
                    <IconButton variant="plain" onClick={onClose}>
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
                                '--Input-focusedHighlight': 'white',
                            }}
                        />
                    </FormControl>
                <FormControl sx={{ flex: 1 }}>
                    <FormLabel>Date</FormLabel>
                    <Input
                        type="date"
                        value={editedDate}
                        onChange={(e) => { setEditedDate(e.target.value); setRoomIsAvailable(false); }}
                    />
                </FormControl>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <FormControl sx={{ flex: 1 }}>
                    <FormLabel>Starting Time</FormLabel>
                        <Input
                            placeholder="HH:MM:SS"
                            value={editedStartTime}
                            onChange={(e) => setEditedStartTime(e.target.value)}
                            error={!isValidTimeFormat(editedStartTime) && editedStartTime !== ""}
                        />
                    </FormControl>
                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel>Ending Time</FormLabel>
                            <Input
                                placeholder="HH:MM:SS"
                                value={editedEndTime}
                                onChange={(e) => setEditedEndTime(e.target.value)}
                                error={!isValidTimeFormat(editedEndTime) && editedEndTime !== ""}
                            />
                        </FormControl>
                </Box>

                <FormControl sx={{ mb: 2 }}>
                    <FormLabel>Location</FormLabel>
                    <Select
                        value={editedLocation}
                        onChange={(e, newValue) => {
                            setEditedLocation(newValue ?? '');
                            setRoomIsAvailable(false);
                        }}
                        placeholder="Select a location"
                    >
                        {rooms.map((room) => (
                            <Option key={room.name} value={room.name}>
                                {room.name}
                            </Option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ mb: 2 }}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        minRows={3}
                        value={editedComment}
                        onChange={(e) => { setEditedComment(e.target.value); setRoomIsAvailable(false); }}
                    />
                </FormControl>

                <FormControl sx={{ mb: 2 }}>
                    <FormLabel>Participants</FormLabel>
                    <Input
                        value={editedParticipants}
                        onChange={(e) => { setEditedParticipants(e.target.value); setRoomIsAvailable(false); }}
                    />
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" color="neutral" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        onClick={checkRoomAvailable}
                        disabled={roomIsAvailable || !editedLocation}
                        loading={loading}
                    >
                        Check room availability
                    </Button>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={snackbarOpen}
                        color={roomIsAvailable ? 'success' : 'danger'}
                        variant="solid"
                        startDecorator={roomIsAvailable ? <CheckCircle /> : <Error />}
                    >
                        {roomIsAvailable ? 'Room is available!' : 'Room is not available.'}
                    </Snackbar>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={timeSnackbarError}
                        color={'danger'}
                        variant="solid"
                        startDecorator={<Error />}
                    >
                        {timeErrorMsg}
                    </Snackbar>
                    <Button variant="solid" onClick={handleSave} disabled={!roomIsAvailable}>
                        Save
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default ReservationModal;