import bcrypt from "bcryptjs";

const password = "1234"; // Replace with your actual admin password
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log("Hashed Password:", hashedPassword);
