# URL Shortener API Documentation

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Status Codes:**
- `201`: User created successfully
- `400`: Invalid input data
- `409`: User already exists

---

### Login
**POST** `/api/auth/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Status Codes:**
- `200`: Login successful
- `401`: Invalid credentials

---

### Get Current User
**GET** `/api/auth/me`

Get the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized
- `404`: User not found

---

## URL Endpoints

### Create Short URL
**POST** `/api/create`

Create a shortened URL. Authentication is optional - if authenticated, the URL will be associated with the user.

**Headers (Optional):**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "Url": {
    "originalUrl": "https://example.com/very-long-url",
    "expiresAt": 604800
  }
}
```

Note: `expiresAt` is in seconds. For example:
- 1 day = 86400
- 7 days = 604800
- 30 days = 2592000

**Response:**
```json
{
  "shortId": "abc123xy"
}
```

**Status Codes:**
- `201`: URL created successfully
- `400`: Invalid input data

---

### Get All URLs
**GET** `/api/urls`

Retrieve all shortened URLs (limited to 100 most recent).

**Response:**
```json
{
  "urls": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "originalUrl": "https://example.com/very-long-url",
      "shortId": "abc123xy",
      "clicks": 42,
      "userId": "507f1f77bcf86cd799439012",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "expiresAt": "2025-01-08T00:00:00.000Z"
    }
  ]
}
```

**Status Codes:**
- `200`: Success

---

### Get My URLs
**GET** `/api/my-urls`

Retrieve all URLs created by the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "urls": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "originalUrl": "https://example.com/very-long-url",
      "shortId": "abc123xy",
      "clicks": 42,
      "userId": "507f1f77bcf86cd799439012",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "expiresAt": "2025-01-08T00:00:00.000Z"
    }
  ]
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized

---

### Redirect to Original URL
**GET** `/:shortId`

Redirect to the original URL and increment click counter.

**Example:**
```
GET http://localhost:3000/abc123xy
```

**Response:**
- Redirects to the original URL

**Status Codes:**
- `302`: Redirect successful
- `404`: Short URL not found

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message here",
  "statusCode": 400
}
```

Common status codes:
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

---

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Tokens expire after 7 days by default (configurable via `JWT_EXPIRES_IN` environment variable).

---

## Rate Limiting

Currently, there is no rate limiting implemented. Consider adding rate limiting for production use.

---

## CORS

CORS is configured to allow requests from the frontend URL specified in the `FRONTEND_URL` environment variable.
