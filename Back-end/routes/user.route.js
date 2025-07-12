import express from "express";
import {
  allUsers,
  getUser,
  logOutUser,
  userLogin,
  userRegister,
} from "../controllers/user.controller.js";
import { isLogin } from "../middleware/isLogin.js";

const router = express.Router();

// Add some debugging middleware
router.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - User routes`);
  next();
});

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/", isLogin, allUsers);
router.post("/logout", isLogin, logOutUser);
router.get("/:id", isLogin, getUser);
export default router;
