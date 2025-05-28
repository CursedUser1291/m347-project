package backend.services;

import backend.models.Reservation;
import backend.models.User;
import backend.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getReservationsByUser(UUID userID) {
        return reservationRepository.findByUser_Id(userID);
    }
}
