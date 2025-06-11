package backend.services;

import backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import backend.repositories.UserRepository;
import backend.utils.PasswordHasher;

import java.util.UUID;

@Service
public class UserService {
    PasswordHasher passwordHasher = new PasswordHasher();

    @Autowired
    private UserRepository userRepository;

    public User login(String username, String password) {
        User user = userRepository.findByName(username);

        if(user != null) {
            if(passwordHasher.verifyPassword(password, user.getPassword())) {
                user.setPassword("REDACTED");
                return user;
            } else {
                throw new RuntimeException("Invalid password");
            }
        }
        return null;
    }

    public User signup(String username, String password) {
        if (userRepository.findByName(username) != null) {
            throw new RuntimeException("User already exists");
        }

        String hashedPassword = passwordHasher.hashPassword(password);
        User newUser = new User(UUID.randomUUID(), username, hashedPassword);
        return userRepository.save(newUser);
    }
}
