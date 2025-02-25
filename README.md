# Users CRUD Application

A full-stack application for managing users with a React frontend and Node.js backend.

## Tech Stack

### Frontend
- Next.js
- Next.js
- TypeScript
- StackAuth
- React
- Docker

### Backend
- Node.js
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker

## Project Structure

```
users-crud/
├── frontend/         # Next.js frontend application
├── backend/          # NestJS backend application
├── docker-compose.yml
└── .env             # Environment variables
```

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd users-crud
```

2. Create `.env` file in the root directory with the following variables:
```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STACK_PROJECT_ID=
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=
POSTGRES_HOST=
```

Get stack auth keys [here](https://docs.stack-auth.com/getting-started/setup#:~:text=Then%2C%20create%20an%20account%20on%20the%20Stack%20Auth%20dashboard%2C%20create%20a%20new%20project%20with%20an%20API%20key%2C%20and%20copy%20its%20environment%20variables%20into%20the%20.env.local%20file%20of%20your%20Next.js%20project%3A) 

3. Build and run with Docker:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4001
- PostgreSQL: localhost:5432

## Development

### Running Frontend Locally
```bash
cd frontend
npm install
npm run dev
```

### Running Backend Locally
```bash
cd backend
npm install
npm run start:dev
```

## API Endpoints

### Users
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Database Migrations

When running with Docker, migrations are automatically applied during container startup. For local development:

```bash
cd backend
npx prisma migrate dev
```

### Backend Tests

The backend uses Jest for unit and integration testing. To run the tests:
```bashID
cd backend
npm run test
```
