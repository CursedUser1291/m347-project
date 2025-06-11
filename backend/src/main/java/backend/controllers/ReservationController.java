package backend.controllers;

import backend.models.Reservation;
import backend.models.Room;
import backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import backend.services.ReservationService;

import java.sql.Time;
import java.time.LocalDate;
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

    @PatchMapping("/reservations")
    public Reservation updateReservation(
            @RequestParam UUID privateKey,
            @RequestParam UUID reservationID,
            @RequestParam Room room,
            @RequestParam LocalDate date,
            @RequestParam Time startTime,
            @RequestParam Time endTime,
            @RequestParam String comments,
            @RequestParam String participants
    ) {
        return reservationService.updateReservation(privateKey, reservationID, room, date, startTime, endTime, comments, participants);
    }
}
