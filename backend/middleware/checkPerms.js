import User from "../models/user.model.js";

const checkPerms = async (req, res, next) => {
  try {
    const token = req.session.userId;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Session Provided" });
    }

    const user = await User.findById(token).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.role.includes("Employee")) {
      return res.status(404).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: "Internal Error" });
  }
};

export default checkPerms;
