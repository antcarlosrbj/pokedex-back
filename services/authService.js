import jwt from "jsonwebtoken";

function generateToken(email) {
    const time24hours = 24 * 60 * 60;
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: time24hours });
    return token;
}

const authService = {
    generateToken
};
  
export default authService;