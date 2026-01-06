# Copilot Instructions for E-commerce Backend

## Architecture Overview
This is a MERN stack backend using Express.js with TypeScript, Mongoose for MongoDB, and JWT authentication. The app structure follows a layered architecture:
- **Models** (`src/models/`): Mongoose schemas with TypeScript interfaces (e.g., `IUser`, `IProduct`)
- **Routes** (`src/routes/`): Express routers handling HTTP endpoints
- **Services** (`src/services/`): Business logic layer called by routes

## Key Patterns
- **Response Format**: Services return `{ data: any, statusCode: number }` objects; routes extract and send as JSON
- **Authentication**: Passwords hashed with bcrypt (salt rounds: 10); JWT tokens generated with hardcoded secret `'DaXrvh1UDN7u78BP8r0EEvuXRsk09T5C'`
- **User Registration/Login**: Check for existing user, hash/compare passwords, return JWT on success
- **MongoDB Connection**: Hardcoded to `'mongodb://localhost:27017/ecommerce'` in `src/index.ts`

## Development Workflow
- **Run Dev Server**: `npm run dev` (uses nodemon with ts-node/esm loader, watches `src/` directory)
- **Start Production**: `npm start` (uses ts-node directly)
- **Build**: No build step; TypeScript compiled on-the-fly via ts-node

## Configuration
- **TypeScript**: NodeNext modules, ESNext target, strict type checking enabled (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- **ES Modules**: `"type": "module"` in package.json; imports use `.js` extensions despite `.ts` files
- **Middleware**: `express.json()` for parsing JSON bodies

## Conventions
- **File Extensions**: All source files are `.ts`; imports append `.js` (Node.js ES module requirement)
- **Timestamps**: All models use `{timestamps: true}` for automatic `createdAt`/`updatedAt`
- **Error Handling**: Basic checks (e.g., user exists); returns error messages as strings with 400 status
- **Interfaces**: Define parameter interfaces for service functions (e.g., `registerParams`)

## Security Notes
- JWT secret and MongoDB URI are hardcoded; consider moving to environment variables
- No input validation beyond basic existence checks; add validation middleware for production

## Current State
- User authentication implemented (register/login at `/user/register`, `/user/login`)
- Product model defined but no routes/services yet
- No tests, linting, or CI/CD configured</content>
<parameter name="filePath">c:\Users\saeed\Desktop\MERN\e-commerce\.github\copilot-instructions.md