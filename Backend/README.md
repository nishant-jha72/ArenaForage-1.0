# Frontend API Integration Guide

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

- Authentication: **Bearer JWT**
- Header:

```http
Authorization: Bearer <accessToken>
Content-Type: application/json
```

---

# Authentication Flow

```text
Register
   ↓
Login
   ↓
Receive accessToken + refreshToken
   ↓
Store Tokens
   ↓
GET /users/me
   ↓
User Logged In
```

When the access token expires:

```text
POST /auth/refresh-token
        ↓
Receive new accessToken
        ↓
Retry original request
```

Logout:

```text
POST /auth/logout
↓
Clear stored tokens
↓
Redirect to Login
```

---

# Auth Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/auth/register` | No | Register user |
| POST | `/auth/login` | No | Login |
| POST | `/auth/logout` | Optional | Logout |
| POST | `/auth/refresh-token` | No | Refresh JWT |
| POST | `/auth/forgot-password` | No | Send reset email |
| POST | `/auth/reset-password` | No | Reset password |

### Register

```ts
POST /auth/register

{
  username: string;
  email: string;
  password: string;
}
```

Responses

- 201 Created
- 400 Validation Failed
- 409 Duplicate Email/Username

---

### Login

```ts
POST /auth/login

{
  email: string;
  password: string;
}
```

Expected Response

```ts
{
  accessToken: string;
  refreshToken: string;
  user: User;
}
```

Store:

- accessToken
- refreshToken
- user

---

### Logout

```ts
POST /auth/logout

{
  refreshToken: string;
}
```

---

### Refresh Token

```ts
POST /auth/refresh-token

{
  refreshToken: string;
}
```

Returns a new access token.

---

### Forgot Password

```ts
POST /auth/forgot-password

{
  email: string;
}
```

---

### Reset Password

```ts
POST /auth/reset-password

{
  token: string;
  password: string;
}
```

---

# User Endpoints

## Get Current User

```http
GET /users/me
```

Requires Bearer Token.

Used for:

- Authentication check
- Dashboard
- Navbar
- Profile

---

## Update Profile

```http
PUT /users/me
```

Body depends on `UpdateProfileRequest`.

---

## Change Password

```ts
PUT /users/me/change-password

{
  currentPassword: string;
  newPassword: string;
}
```

---

## Check Username

```http
GET /users/check-username?username=john
```

Use a 300–500ms debounce during registration.

---

# Admin Endpoints

Base Route

```
/admin/users
```

Requires Admin authorization.

## Get Users

```http
GET /admin/users
```

Supported Query Parameters

| Parameter | Type |
|-----------|------|
| page | number |
| limit | number |
| search | string |
| sortBy | string |
| sortOrder | ASC / DESC |
| role | SUPER_ADMIN \| ADMIN \| USER |
| status | ACTIVE \| SUSPENDED \| BANNED |

Example

```http
GET /admin/users?page=1&limit=20&search=john&role=USER&status=ACTIVE
```

Supports:

- Pagination
- Search
- Sorting
- Filtering

---

## Get User

```http
GET /admin/users/:id
```

---

## Ban User

```http
PATCH /admin/users/:id/ban
```

---

## Suspend User

```http
PATCH /admin/users/:id/suspend
```

---

## Activate User

```http
PATCH /admin/users/:id/activate
```

---

## Delete User

```http
DELETE /admin/users/:id
```

---

# Endpoint Summary

| Method | Endpoint |
|--------|----------|
| POST | `/auth/register` |
| POST | `/auth/login` |
| POST | `/auth/logout` |
| POST | `/auth/refresh-token` |
| POST | `/auth/forgot-password` |
| POST | `/auth/reset-password` |
| GET | `/users/check-username` |
| GET | `/users/me` |
| PUT | `/users/me` |
| PUT | `/users/me/change-password` |
| GET | `/admin/users` |
| GET | `/admin/users/:id` |
| PATCH | `/admin/users/:id/ban` |
| PATCH | `/admin/users/:id/suspend` |
| PATCH | `/admin/users/:id/activate` |
| DELETE | `/admin/users/:id` |
