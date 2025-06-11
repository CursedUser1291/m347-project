
import AppointmentCard from "../components/AppointmentCard.tsx";
import {useEffect, useState} from "react";


export function Dashboard() {
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

    useEffect(() => {
        const fetchReservations = async () => {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (user && user.id) {
                try {
                    console.log(user.id)
                    const response = await fetch(`http://localhost:8080/reservations?userID=${user.id}`);
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
        }, []);
    return (
        <div>
            <h1>All Reservations</h1>
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
                />
            ))}
        </div>
    );
}
export default Dashboard;