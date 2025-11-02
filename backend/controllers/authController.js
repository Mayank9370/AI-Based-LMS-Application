import { genToken } from "../configs/token.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import sendMail from "../configs/Mail.js";

/* ================================
   SIGN UP
================================ */
export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,        // ✅ Required for HTTPS
      sameSite: "none",    // ✅ Allow cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("signUp error:", error);
    return res.status(500).json({ message: `Signup Error: ${error.message}` });
  }
};

/* ================================
   LOGIN
================================ */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,       // ✅ for HTTPS
      sameSite: "none",   // ✅ for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("login error:", error);
    return res.status(500).json({ message: `Login Error: ${error.message}` });
  }
};

/* ================================
   LOGOUT
================================ */
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout Error: ${error.message}` });
  }
};

/* ================================
   GOOGLE SIGNUP / LOGIN
================================ */
export const googleSignup = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, role });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("googleSignup error:", error);
    return res.status(500).json({ message: `Google Signup Error: ${error.message}` });
  }
};

/* ================================
   SEND OTP
================================ */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerifed = false;

    await user.save();
    await sendMail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("sendOtp error:", error);
    return res.status(500).json({ message: `Send OTP Error: ${error.message}` });
  }
};

/* ================================
   VERIFY OTP
================================ */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isOtpVerifed = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("verifyOtp error:", error);
    return res.status(500).json({ message: `Verify OTP Error: ${error.message}` });
  }
};

/* ================================
   RESET PASSWORD
================================ */
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerifed) {
      return res.status(404).json({ message: "OTP verification required" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.isOtpVerifed = false;

    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("resetPassword error:", error);
    return res.status(500).json({ message: `Reset Password Error: ${error.message}` });
  }
};
