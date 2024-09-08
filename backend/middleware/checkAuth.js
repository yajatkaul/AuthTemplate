import User from "../models/user.model.js";

const checkAuth = async (req, res) => {
  try {
    const token = req.session.userId;

    if (!token) {
      return res.status(401).json({ result: false, exists: false });
    }

    const user = await User.findById(token).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ result: user.verifiedEmail, exists: true, roles: user.role });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: "Internal Error" });
  }
};

export default checkAuth;
