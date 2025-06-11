package backend.repositories;

import backend.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    List<Reservation> findByUser_Id(UUID userId);
    Reservation findByPrivateKey(UUID privateKey);
}