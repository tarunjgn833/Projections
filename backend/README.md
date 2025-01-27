# Backend Service

## Overview
This is a Node.js backend service that processes data and provides histogram functionality.

## Prerequisites
- Docker and Docker Compose (for Docker deployment)
- Node.js 20.9.0 and npm (for local deployment)

## Configuration
Create a `.env` file in the root directory with the following variables (adjust as needed):
```
PORT=3000
DB_NAME=projections_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=postgres
DB_DIALECT=postgres
DB_PORT=5432
# Add other environment variables your app needs
```

## Running with Docker (Recommended)

### Using Docker Compose
1. Make sure Docker and Docker Compose are installed on your system
2. Run the following command in the project root:
```bash
docker-compose up --build 
```
The service will be available at `http://localhost:3000`
3. For subsequent uses:
```bash
docker-compose up
docker-compose down 
```
## Setup Postgres
1. Install Postgres14 or higher(use brew for mac)
2. Start the service, below for mac:

    ```bash
    brew services start postgresql@14
    ```
3. 
    ```bash
    psql -U postgres
    CREATE USER postgres WITH PASSWORD 'postgres';
    CREATE DATABASE projections_db OWNER postgres;
    ```

## Running Locally
1. Install dependencies:
```bash
npm install
```

2. Start the service:
```bash
npm run migrate #only once
npm start
```

## Development
For development with hot-reload:
```bash
npm run migrate #only once
npm run dev
```