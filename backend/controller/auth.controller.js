import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
} from "../mail/emails.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

//CREATING AN ACCOUNT FROM HERE
export const signup = async (req, res) => {
  try {
    const { displayName, email, password, confirmPassword } = req.body;
    console.log(req.body);
    //Salting and hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Function to check if all the details are inputted correctly
    const result = await signupChecks({
      displayName,
      email,
      password,
      confirmPassword,
    });

    //If details are not correct then sends a error response
    if (result !== true) {
      return res.status(400).json({ error: result.error });
    }

    //Generate random token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    //If it is able to pass every check create a new user
    const newUser = new User({
      displayName,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 Days
    });

    //Saving it to the database
    await newUser.save();

    req.session.userId = newUser._id;

    sendVerificationEmail(newUser.email, verificationToken);

    //Account has been created response
    res.status(200).json({ result: `Success` });
  } catch (err) {
    //Incase there is an error
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Function to check the details if they are correct or not
async function signupChecks({ displayName, email, password, confirmPassword }) {
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return { error: "Email is already in use" };
  }

  if (!password || !displayName || !confirmPassword || !email) {
    return { error: "Please fill all fields" };
  }

  if (displayName.length < 5) {
    return { error: "Names should be greater than 4 letters" };
  }

  if (password.length < 5) {
    return { error: "Names should be greater than 4 letters" };
  }

  if (!isValidEmail(email)) {
    return { error: "Invalid email format" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  return true;
}

//Check if its a valid email
function isValidEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

//LOGING IN ACCOUNT
export const login = async (req, res) => {
  //Check if already logged in
  if (req.session.userId) {
    return res.status(200).json({ error: "You are already logged in." });
  }

  //Request payload
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  //Search for the user and gets the details
  const user = await User.findOne({ email });

  //Decrypt and compare the password -- returns true or fals
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password || ""
  );

  //If incorrect return 400 error
  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Incorrect username or password" });
  }

  //If email is not verifed Delete Account
  if (user.verificationToken && user.verificationTokenExpiresAt < Date.now()) {
    await User.deleteOne({ _id: user._id });
    return res.status(400).json({
      error: "You failed to verify your email account has been deleted",
    });
  }

  //Create a session
  req.session.userId = user._id;

  //If success return 200 okk
  res.status(200).json({ result: "Success" });
};

//Logout of account
export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("AuthCookie");
    res.json({ result: "Logout successful" });
  });
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (token !== req.user.verificationToken) {
      return res.status(400).json({ error: "Invalid Token" });
    }

    if (Date.now > req.user.verificationTokenExpiresAt) {
      return res.status(400).json({ error: "Expired Token" });
    }

    const user = await User.findById(req.user._id);

    user.verifiedEmail = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    return res.status(200).json({ result: "Success" });
  } catch (err) {
    console.log("error in verifyEmail ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 3 * 60 * 60 * 1000; // 3 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({ result: "Password reset link sent to your email" });
  } catch (err) {
    console.log("Error during forgot password ", err);
    res.status(400).json({ error: err });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    sendResetSuccessEmail(user.email);

    res.status(200).json({ result: "Password reset successful" });
  } catch (err) {
    console.log("Error in resetPassword ", err);
    res.status(400).json({ error: err });
  }
};
