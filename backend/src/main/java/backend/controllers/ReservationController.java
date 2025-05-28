package backend.controllers;

import backend.models.Reservation;
import backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import backend.services.ReservationService;

import java.util.List;
import java.util.UUID;

@RestController
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/reservations")
    public List<Reservation> login(@RequestParam UUID userID) {
        return reservationService.getReservationsByUser(userID);
    }
}
