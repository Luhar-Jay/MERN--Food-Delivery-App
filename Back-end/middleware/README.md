# Authentication Middleware

This directory contains authentication and authorization middleware for the Food Delivery API.

## Available Middleware

### 1. `isLogin` - Required Authentication

Ensures the user is authenticated before accessing protected routes.

**Usage:**

```javascript
import { isLogin } from "../middleware/isLogin.js";

router.get("/protected-route", isLogin, (req, res) => {
  // req.user contains the authenticated user
  res.json({ user: req.user });
});
```

**Features:**

- Extracts JWT token from cookies or Authorization header
- Verifies token validity
- Checks if user still exists in database
- Provides detailed error messages for different failure scenarios

### 2. `optionalAuth` - Optional Authentication

Allows routes to work with or without authentication.

**Usage:**

```javascript
import { optionalAuth } from "../middleware/optionalAuth.js";

router.get("/public-route", optionalAuth, (req, res) => {
  if (req.user) {
    // User is authenticated
    res.json({ message: "Welcome back!", user: req.user });
  } else {
    // User is not authenticated
    res.json({ message: "Welcome guest!" });
  }
});
```

### 3. `requireRole` - Role-based Authorization

Restricts access based on user roles.

**Usage:**

```javascript
import {
  requireRole,
  requireAdmin,
  requireUser,
} from "../middleware/requireRole.js";

// Admin only route
router.post("/admin/delete-user", isLogin, requireAdmin, (req, res) => {
  // Only admins can access this
});

// User or admin route
router.get("/profile", isLogin, requireRole(["user", "admin"]), (req, res) => {
  // Both users and admins can access this
});

// User only route
router.get("/user-dashboard", isLogin, requireUser, (req, res) => {
  // Only regular users can access this
});
```

## Token Extraction

The middleware supports two methods of token extraction:

1. **Cookies**: `req.cookies.token`
2. **Authorization Header**: `Bearer <token>`

## Error Responses

### Authentication Errors (401)

- No token provided
- Invalid token
- Token expired
- User not found

### Authorization Errors (403)

- Insufficient permissions
- Role not allowed

## Environment Variables

Make sure you have the following environment variable set:

```
SECRET_JWT=your_jwt_secret_key_here
```

## Example Route Setup

```javascript
import express from "express";
import { isLogin, optionalAuth, requireAdmin } from "../middleware/index.js";

const router = express.Router();

// Public routes
router.get("/public", optionalAuth, publicController);

// Protected routes
router.get("/profile", isLogin, profileController);
router.put("/profile", isLogin, updateProfileController);

// Admin routes
router.get("/admin/users", isLogin, requireAdmin, adminUsersController);
router.delete("/admin/users/:id", isLogin, requireAdmin, deleteUserController);

export default router;
```
