const JWT = require("jsonwebtoken");
const User = require("../models/user");

module.exports = {
  login: async (req, res, next) => {
    try {
      const user = req.user; // User object from Passport
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // ❌ Kullanıcı pasifse girişe izin verme
    if (!user.active) {
      return res.status(403).json({ message: "Kullanıcı hesabı pasif durumda. Lütfen yöneticinize başvurun." });
    }

      // Sign a JWT token
      const token = JWT.sign(
        {
          iss: "apiSalesman",
          sub: user._id,
          iat: Math.floor(Date.now() / 1000), // Issued at (in seconds)
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
          company: user.company, // 💥 EKLENDİ
          group: user.group, // 💥 EKLENDİ
        },
        process.env.JWT_SECRET
      );

      const isProduction = process.env.NODE_ENV === "production";
      console.log("COOKIE SETS ENV isProduction", isProduction);

      // Set the token in an HTTP-only cookie
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: isProduction, // Only send over HTTPS in production
        sameSite: isProduction ? "none" : "lax", // Allow cross-site cookies
        path: "/", // Ensure the cookie is accessible across all routes
        maxAge: 1000 * 60 * 60, // 1 hour in milliseconds 1000
      });

      // Exclude `password` and `email_verified` from the `user` object
      const mutatedUser = { ...user._doc, password: null };

      // Send a success response
      res.status(200).json({
        message: "Login successful",
        user: mutatedUser,
      });
    } catch (error) {
      next(error); // Pass errors to the error-handling middleware
    }
  },

  validate: async (req, res, next) => {
    const token = req.cookies.access_token;

    // Check if the token exists
    if (!token) {
      console.log("----*** TOKEN NOT FOUND ****--------");
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // Verify the token
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      console.log("TOKEN DECODED : ", decoded);

      // find user
      const findUser = await User.findById(decoded.sub);
      if (!findUser) {
        return res.status(401).json({ message: "User not found" });
      }

      const user = { ...findUser._doc, password: null };

      res.status(200).json({ message: "Authenticated", user });
    } catch (error) {
      // Handle token verification errors
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      next(error); // Pass other errors to the error-handling middleware
    }
  },

  refresh: async (req, res, next) => {
    const refreshToken = req.cookies.refresh_token;
    console.log("AUTH REFERESH ENTERED");
  },
};
