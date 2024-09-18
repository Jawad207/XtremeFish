// Helper function to create a JWT token
import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
};

export const getCountryFromIp = async (ip) => {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    return response.data.country;
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
};
