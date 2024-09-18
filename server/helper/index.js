// Helper function to create a JWT token
import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
};

export const getCountryFromIp = async (ip) => {
  try {
    const ipResponse = await fetch('https://api.ipify.org')
    const ipAddress = await ipResponse.text();
    const response = await fetch(`http://ip-api.com/json/${ipAddress}`)
    const userLocation = await response.json();
    return {...userLocation, ipAddress}
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
};
