package backend.services;

import backend.models.Reservation;
import backend.models.Room;
import backend.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getReservationsByUser(UUID userID) {
        return reservationRepository.findByUser_Id(userID);
    }

    public Reservation updateReservation(
            UUID privateKey,
            Room room,
            LocalDate date,
            Time startTime,
            Time endTime,
            String comments,
            String participants
    ) {
        Reservation reservation = reservationRepository.findByPrivateKey(privateKey);

        reservation.setRoom(room);
        reservation.setDate(date);
        reservation.setStartTime(startTime);
        reservation.setEndTime(endTime);
        reservation.setComments(comments);
        reservation.setParticipants(participants);

        return reservationRepository.save(reservation);
    }
}
