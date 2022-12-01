import bcrypt from "bcrypt";

const isPasswordCorrect = async (password, hashedPassword) => {
  console.log("password", password);
  console.log("hasedPassword", hashedPassword);
  const passwordVerifiedBoolean = bcrypt.compare(password, hashedPassword);
  return passwordVerifiedBoolean;
};

export default isPasswordCorrect;
