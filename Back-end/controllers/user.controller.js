import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const userRegister = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(401).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const token = jwt.sign({ email }, process.env.SECRET_JWT, {
      expiresIn: "1d",
    });
    const user = await User.create({ userName, email, password });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_JWT,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      message: "User Login",
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User login faild",
      error: error.message,
    });
  }
};

const allUsers = async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);
    res.status(200).json({
      message: "User data fetch successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User not found",
      success: false,
      error: error,
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

const logOutUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("userLogout", user);

    res.status(200).json({
      success: true,
      message: "User logout successfully",
      user: {
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

export { userRegister, userLogin, allUsers, getUser, logOutUser };
