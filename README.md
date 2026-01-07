# E-commerce Backend (MERN Stack)

This is an incomplete MERN stack backend for an e-commerce application, built with Express.js, TypeScript, Mongoose, and JWT authentication.

## Tech Stack
- **Backend**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (hardcoded secret)
- **Modules**: ES Modules

## Features Implemented
- **User Authentication**:
  - User registration (`POST /user/register`)
  - User login (`POST /user/login`)
  - JWT-based authentication middleware
- **Cart Management** (Partial):
  - Get active cart for user (`GET /cart`)
  - Add/update/remove items in cart (`POST /cart/items`, `PUT /cart/items`, `DELETE /cart/items`)
  - Stock validation when adding/increasing quantities
- **Models**:
  - User model with password hashing (bcrypt, salt rounds 10)
  - Product model (defined but not fully used)
  - Cart model with products array and total amount

## Features Pending
- **Product Management**: No routes or services for CRUD operations on products
- **Order/Checkout**: No implementation for placing orders or payment
- **Admin Features**: No admin panel or product management endpoints
- **Testing**: No unit or integration tests
- **Linting/CI/CD**: No linting rules or CI pipeline
- **Security**: Hardcoded JWT secret and MongoDB URI (should use environment variables)
- **Validation**: Basic input validation; no comprehensive validation middleware
- **Error Handling**: Basic error responses; could be improved
- **Documentation**: API docs missing

## Setup Instructions
1. Create a `.env` file in the root directory with:
   ```
   JWT_SECRET=your_super_secret_jwt_key_here
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   ```
2. Ensure MongoDB is running.
3. Install dependencies: `npm install`
4. Run in development: `npm run dev` (uses nodemon with ts-node)
5. Run in production: `npm start`

**Note**: Never commit the `.env` file to version control. It's already added to `.gitignore`.

## API Endpoints
### User
- `POST /user/register` - Register a new user (body: { email, password })
- `POST /user/login` - Login user (body: { email, password })

### Cart (requires JWT auth)
- `GET /cart` - Get user's active cart
- `POST /cart/items` - Add item to cart (body: { productID, quantity })
- `PUT /cart/items` - Update item quantity (body: { productID, quantity }) - can add, update, or remove
- `DELETE /cart/items` - Remove item from cart (body: { productID })

## Notes
- This project is incomplete and should not be used in production without further development.
- Passwords are hashed with bcrypt.
- Timestamps are automatic on all models.
- ES Modules are used; imports require `.js` extensions despite `.ts` files.
- Environment variables are used for secrets (JWT secret and MongoDB URI).
- No frontend included; this is backend-only.