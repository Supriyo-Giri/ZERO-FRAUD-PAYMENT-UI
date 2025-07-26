# Secure Event Registration Portal - Backend

A secure backend system for event registration with payment verification capabilities.

## Features

- **User Authentication**: Student and organizer registration/login with JWT
- **Event Management**: Create and browse events
- **Secure Payments**: Transaction IDs, cryptographic hashes, QR codes
- **Verification System**: Admin verification with codes and QR scanning
- **Security**: Rate limiting, sanitization, XSS protection

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Argon2 (password hashing)
- JWT (authentication)
- QR Code generation

## Setup

1. Clone the repository
2. Run `npm install`
3. Create `.env` file with your configuration
4. Run `npm run dev` for development

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Events
- `POST /api/events` - Create event (organizer only)
- `GET /api/events` - Get all events

### Transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:transactionId` - Get transaction by ID
- `PUT /api/transactions/verify/:transactionId` - Verify transaction

### Verification
- `POST /api/verification/generate` - Generate verification code
- `POST /api/verification/verify` - Verify code

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing

## Security

- Passwords hashed with Argon2
- Rate limiting
- MongoDB injection protection
- XSS protection
- Security headers with Helmet.js