# Fullstack room reservation mit Spring Boot (Backend) & Vite + TypeScript (Frontend)

Dieses Projekt besteht aus einem **Spring Boot**-Backend mit einer **MySQL**-Datenbank sowie einem **Vite**-Frontend mit **TypeScript**. Beide Teile sind containerisiert mit **Docker** und können separat oder gemeinsam ausgeführt werden.

---

## Projektstruktur

```
/
├── backend/         # Spring Boot Backend (Java)
│   └── Dockerfile
├── frontend/        # Vite Frontend (TypeScript)
│   └── Dockerfile
├── docker-compose.yml (optional, falls du es nutzen willst)
└── README.md        # Dieses Dokument
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

### Erklärung

- **Datenbankkonfiguration**: Es werden Umgebungsvariablen verwendet (`${DB_HOST}`, `${DB_PORT}` usw.), um flexibel zwischen Entwicklungs- und Produktionsumgebungen zu wechseln.
- **`createDatabaseIfNotExist=true`**: Praktisch für lokale Entwicklung – erstellt die Datenbank automatisch, falls sie noch nicht existiert.
- **JPA/Hibernate-Konfiguration**: `ddl-auto=update` sorgt dafür, dass das Datenbankschema automatisch mit den Entitäten synchronisiert wird.

### Dockerfile für Backend

```dockerfile
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY . .

RUN chmod +x ./mvnw
RUN ./mvnw package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
```

#### Erklärung:

- Nutzt ein leichtgewichtiges Java 21 Image.
- Build über das Wrapper-Script `mvnw` (vermeidet lokale Maven-Abhängigkeiten).
- Test werden beim Build übersprungen (`-DskipTests`), was den Build-Prozess beschleunigt.
- Port 8080 wird für HTTP-Anfragen freigegeben.

---

## Frontend (Vite + TypeScript)

### API-URL Helper

```ts
export function getApiUrl(): string {
    return import.meta.env.VITE_API_URL;
}
```

- Diese Funktion holt sich die API-URL aus den Umgebungsvariablen (`.env` oder Docker ENV), damit Frontend und Backend flexibel verbunden werden können.

### `Dockerfile` für Frontend

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 5173

CMD ["npm", "run", "preview", "--", "--host"]
```

#### Erklärung:

- Verwendet Node.js v20 auf Alpine Linux – leichtgewichtig und schnell.
- `npm run build` erstellt die statischen Dateien.
- `npm run preview -- --host` startet den Vite Preview Server und macht ihn von außen erreichbar (z. B. über Docker).


## Ausführen mit Docker

Du kannst beide Teile auch mit Docker Compose starten (optional):

```yaml
# docker-compose.yml (optional)
version: '3.8'

services:
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: mydb
      MYSQL_USER: user
      MYSQL_PASSWORD: pass
    ports:
      - "3306:3306"
```
