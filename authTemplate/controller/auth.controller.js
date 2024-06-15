import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

//CREATING AN ACCOUNT FROM HERE
export const signup = async (req, res) => {
  try {
    //Transporter setting up the host
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.ENV_EMAIL,
        pass: process.env.ENV_PASSWORD,
      },
    });

    //Needs a raw body as a request
    /*
    Example
    {
      "displayName": "Testingopop",
      "userName": "SOAJDIAJS",
      "email": "test@gmail.com",
      "password": "123456",
      "confirmPassword": "123456"
    }
    */
    const { displayName, userName, email, password, confirmPassword } =
      req.body;

    //Salting and hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Function to check if all the details are inputted correctly
    const result = await signupChecks({
      displayName,
      userName,
      email,
      password,
      confirmPassword,
    });

    //If details are not correct then sends a error response
    if (result !== true) {
      return res.status(400).json({ message: result.message });
    }

    //If it is able to pass every check create a new user
    const newUser = new User({
      displayName,
      userName,
      email,
      password: hashedPassword,
    });

    //Saving it to the database
    await newUser.save();

    //The email with details you want to send
    const info = await transporter.sendMail({
      from: process.env.ENV_EMAIL,
      to: email,
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    //Account has been created response
    res.status(200).json({ result: `Success` });
  } catch (err) {
    //Incase there is an error
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Function to check the details if they are correct or not
async function signupChecks({
  displayName,
  userName,
  email,
  password,
  confirmPassword,
}) {
  const userCheck = await User.findOne({ userName });

  const emailCheck = await User.findOne({ email });

  if (userCheck) {
    return { message: "Username taken" };
  }

  if (emailCheck) {
    return { message: "Email is already in use" };
  }

  if (!userName || !password || !displayName || !confirmPassword || !email) {
    return { message: "Please fill all fields" };
  }

  if (userName.length < 5 || displayName.length < 5) {
    return { message: "Names should be greater than 4 letters" };
  }

  if (password.length < 5) {
    return { message: "Names should be greater than 4 letters" };
  }

  if (!isValidEmail(email)) {
    return { message: "Invalid email format" };
  }

  if (password !== confirmPassword) {
    return { message: "Passwords do not match" };
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
    return res.status(200).json({ message: "You are already logged in." });
  }

  //Request payload
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  //Search for the user and gets the details
  const user = await User.findOne({ userName });

  //Decrypt and compare the password -- returns true or fals
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password || ""
  );

  //If incorrect return 400 error
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect username or password" });
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
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.clearCookie("AuthCookie");
    res.json({ message: "Logout successful" });
  });
};
