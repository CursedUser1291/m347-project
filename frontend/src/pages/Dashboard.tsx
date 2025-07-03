
import AppointmentCard from "../components/AppointmentCard.tsx";
import {useEffect, useState} from "react";
import {Box, Button} from "@mui/joy";
import ReservationModal from "../components/ReservationModal.tsx";
import { getApiUrl } from '../utils/getApiUrl.ts';

interface DashboardProps {
    refresh: number;
    refreshDashboard: () => void;
}

export function Dashboard({ refresh, refreshDashboard }: DashboardProps) {
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

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            window.location.href = "/login";
        }

        const fetchReservations = async () => {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (user && user.id) {
                try {
                    const response = await fetch(`${getApiUrl()}/reservations?userID=${user.id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setReservations(data);
                    } else {
                        console.error("Failed to fetch reservations");
                    }
                } catch (error) {
                    console.error("Error fetching reservations:", error);
                }
            }
        };

        fetchReservations();
        }, [refresh]);
    return (
        <div>
            <Box display="flex" alignItems="center" gap={2} justifyContent="space-around">
                {reservations.length === 0 ? (<h1>You Have No Reservations</h1>) : (<h1>All Reservations</h1>)}
                <Button color={"neutral"} variant={"outlined"} onClick={() => setModalOpen(true)} sx={{ fontSize: '1.25rem' }}>
                    Reserve a room
                </Button>
            </Box>

            {modalOpen && (
                <ReservationModal
                    open={modalOpen}
                    privateKey={""}
                    onClose={() => setModalOpen(false)}
                    initialData={{
                        date: '',
                        startTime: '',
                        endTime: '',
                        location: '',
                        comment: '',
                        participants: '',
                    }}
                    isEditMode={false}
                    refreshDashboard={refreshDashboard}
                />
            )}

            {/* Render all reservations */}
            {reservations.map((reservation, index) => (
                <AppointmentCard
                    key={index}
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
                />
            ))}
        </div>
    );
}
export default Dashboard;