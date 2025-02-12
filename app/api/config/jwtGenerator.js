
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "Stylediva@2025";

export function generateToken(userData) {
    return jwt.sign(userData, SECRET_KEY, { expiresIn: "1h" }); // Expires in 1 hour
  }

  