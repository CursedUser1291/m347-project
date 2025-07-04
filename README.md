# Fullstack ruumi mit Spring Boot (Backend) & Vite + TypeScript (Frontend)

Dieses Projekt besteht aus einem **Spring Boot**-Backend mit einer **MySQL**-Datenbank sowie einem **Vite**-Frontend mit **TypeScript**. Beide Teile sind mit **Docker** containerisiert und können unabhängig oder gemeinsam ausgeführt werden.

---

## Projektstruktur

```
/
├── backend/         # Spring Boot Backend (Java)
│   └── Dockerfile
├── frontend/        # Vite Frontend (TypeScript)
│   └── Dockerfile
├── docker-compose.yml 
└── README.md
```
---

## Backend (Spring Boot)

### application.properties

```properties
spring.application.name=backend

spring.datasource.url=jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}?createDatabaseIfNotExist=true
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASS}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

#### Erklärung

- **Datenbankkonfiguration**: Die Verbindung zur MySQL-Datenbank erfolgt über Umgebungsvariablen, um zwischen verschiedenen Umgebungen (lokal, staging, production) flexibel zu sein.
- **`createDatabaseIfNotExist=true`**: Erstellt die Datenbank automatisch, falls sie noch nicht existiert – ideal für lokale Entwicklung.
- **`ddl-auto=update`**: Hibernate aktualisiert das Datenbankschema automatisch basierend auf deinen Java-Entitäten.

---

### Dockerfile (Backend)

```dockerfile
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY . .

RUN chmod +x ./mvnw
RUN ./mvnw package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
```

#### Erklärung

- **Image**: Java 21 auf Alpine – klein, schnell und stabil.
- **Build**: Das Projekt wird mit dem Maven Wrapper gebaut, was unabhängig vom System funktioniert.
- **Tests übersprungen**: Spart Build-Zeit in Docker (`-DskipTests`).
- **Port 8080**: Standardport des Spring Boot Servers.

---

## Frontend (Vite + TypeScript)

### API-URL Helper

```ts
export function getApiUrl(): string {
    return import.meta.env.VITE_API_URL;
}
```

- Holt sich die API-URL aus den Umgebungsvariablen – z. B. `VITE_API_URL=http://localhost:8080`.

---

### Dockerfile (Frontend)

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 5173

CMD ["npm", "run", "preview", "--", "--host"]
```

#### Erklärung

- **Node.js 20 Alpine**: Leichtgewichtiges Node-Image für schnelle Builds.
- **Build-Befehl**: Erstellt ein Produktions-Build mit Vite.
- **Preview-Server**: Wird mit `--host` von außen zugänglich gemacht (z. B. über Docker).

---

## Ausführen mit Docker

Du kannst beide Teile mit Docker Compose starten:

```
docker compose up
```

Die Dienste werden automatisch gebaut und gestartet. Zugriff:

- Frontend: http://localhost:4173
- Backend (API): http://localhost:8080
- MySQL: läuft intern auf Port 3306

---

## Docker-Compose Dienste

### Backend (Spring Boot)

```yaml
backend:
  build:
    context: ./backend
    dockerfile: Dockerfile
  ports:
    - "8080:8080"
  environment:
    - DB_HOST=db
    - DB_PORT=3306
    - DB_NAME=roomReservation
    - DB_USER=root
    - DB_PASS=MySQLPassword
  depends_on:
    - db
  networks:
    - room_reservation_network
```

- Baut das Backend aus dem `./backend`-Ordner.
- Setzt Umgebungsvariablen zur Verbindung mit der Datenbank.
- Ist abhängig vom `db`-Service (MySQL), sodass dieser zuerst gestartet wird.
- Exponiert Port `8080`.

---

### Frontend (Vite)

```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
  ports:
    - "4173:4173"
  depends_on:
    - backend
  networks:
    - room_reservation_network
```

- Baut das Frontend aus dem `./frontend`-Ordner.
- Hängt vom Backend ab, um sicherzustellen, dass die API erreichbar ist.
- Exponiert Port `4173` für das UI.

---

### Datenbank (MySQL)

```yaml
db:
  image: mysql:8.0
  restart: always
  environment:
    MYSQL_ROOT_PASSWORD: MySQLPassword
    MYSQL_DATABASE: roomReservation
  ports:
    - "3306:3306"
  volumes:
    - db_data:/var/lib/mysql
  networks:
    - room_reservation_network
```

- Verwendet das offizielle `mysql:8.0` Docker-Image.
- Erstellt beim Start die Datenbank `roomReservation`.
- Speichert persistente Daten im Volume `db_data`.
- Exponiert Port `3306` (optional für lokale Tools wie DBeaver, HeidiSQL etc.).

---

## Netzwerk

```yaml
networks:
  room_reservation_network:
    driver: bridge
```

- Alle Dienste sind im gleichen privaten Netzwerk.
- Sie können sich gegenseitig über ihre Servicenamen (`db`, `backend`, `frontend`) ansprechen.

---

## Datenvolumen

```yaml
volumes:
  db_data:
```

- Persistiert die MySQL-Daten auch nach einem Container-Neustart.

---

## Container stoppen

```bash
docker-compose down
```

Wenn du auch die Daten löschen möchtest:

```bash
docker-compose down -v
```

---

## Beispiel für API-Verbindung im Backend

Die Umgebungsvariablen im Backend sorgen dafür, dass du dynamisch mit der Datenbank verbinden kannst. Beispielhafte Konfiguration (Spring Boot `application.properties`):

```properties
spring.datasource.url=jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASS}
```

---

## Fragen oder Probleme?

Erstelle ein Issue oder kontaktiere das Projektteam.
