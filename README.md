# Technical Test - Moment Authentication App

## Overview

This repository contains the full-stack authentication application developed as part of the technical test for Moment. The app consists of:

- **Frontend:** A Next.js application styled with Tailwind CSS and shad/cn components:`apps/web`
- **Backend:** A Nest.js API using Prisma ORM with a PostgreSQL database: `apps/api`
- **Database Management:** PostgreSQL and PGAdmin for database administration.
- **Docker:** Used to orchestrate and run the services in both development and production environments.

## Getting Started

### Prerequisites

Ensure the following tools are installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/) (version >= 18)
- [npm](https://www.npmjs.com/) (version >= 10.8.2)

### Environment Variables

To configure the environment, duplicate the `.env.example` file into `.env` files for each environment (development and production). These contain all necessary environment variables:

- `API_PORT`: Port for the API server (default: 4000)
- `API_JWT_SECRET`: Secret key for JWT authentication
- `API_JWT_EXPIRES_IN`: JWT expiration time (default: 90 days)
- `WEB_PORT`: Port for the web server (default: 3500)
- `POSTGRES_PORT`: Port for the PostgreSQL database (default: 5000)
- `POSTGRES_DB`: Name of the database (default: `moment`)
- `POSTGRES_USER`: PostgreSQL username
- `POSTGRES_PASSWORD`: PostgreSQL password
- `PGADMIN_PORT`: Port for PGAdmin (default: 8888)
- `PGADMIN_DEFAULT_EMAIL`: Default email for PGAdmin login
- `PGADMIN_DEFAULT_PASSWORD`: Default password for PGAdmin login
- `PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED`: Set to `False` to disable PGAdmin master password

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/technical-test-moment.git
   cd technical-test-moment
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup the `.env` file:**

   ```bash
   cp .env.example .env && cp apps/api/.env.example apps/api/.env && cp apps/web/.env.example apps/web/.env
   ```

   Update the values as needed

### Development

To spin up the PostgreSQL database and PGAdmin for development, run:

```bash
npm run dev:db:start
```

Once the database is ready, generate Prisma client:

```bash
npm run db:generate
```

Now, you can apply Prisma schema to the database:

```bash
npm run db:push
```

Finally, to launch the development servers for both the api and web app:

```bash
npm run dev
```

You will find:

- the api at `http://localhost:4000`
- the web at `http://localhost:3000`
- the pgadmin at `http://localhost:8888`

To stop the development database:

```bash
npm run dev:db:stop
```

#### Frontend

The frontend of this application is built using Next.js, styled with Tailwind CSS, and includes shad/cn components for UI elements. There are three main routes:

- `/`: The home page, which requires authentication. Users who are not authenticated will be redirected to the login page.
- `/login`: The login page, where users can enter their credentials to authenticate.
- `/register`: The registration page, where new users can create an account.
  The app uses a secure authentication mechanism with JWT tokens to protect the / route and manage user sessions.

#### API

The backend API is developed using Nest.js with Prisma ORM to interact with a PostgreSQL database. Swagger is integrated for API documentation and is available at the root `/` path. Developers can visit this route to explore the available endpoints, view request/response schemas using Swagger's interactive interface.

### Production

To launch all services in production mode (Next.js, Nest.js API, PostgreSQL, PGAdmin), use:

```bash
npm run prod:start
```

The Prisma schema needs to be applied the first time the database is started:

```bash
npm run db:push
```

To stop the production services:

```bash
npm run prod:stop
```

### Database Management

Prisma ORM is used to manage the database schema. Common commands include:

Generate Prisma client:

```bash
npm run db:generate
```

Push Prisma Schema to Database:

```bash
npm run db:push
```

Deploy Database Migrations:

```bash
npm run db:migrate-deploy
```

### Linting and Formatting

To lint the codebase:

```bash
npm run lint
```

To format the code using Prettier:

```bash
npm run format
```

### Running Tests

To run unit tests:

```bash
npm run test
```

To run end-to-end tests:

```bash
npm run test:e2e
```
