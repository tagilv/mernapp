import bcrypt from "bcrypt";

const isPasswordCorrect = async (password, hashedPassword) => {
  const passwordVerifiedBoolean = bcrypt.compare(password, hashedPassword);
  return passwordVerifiedBoolean;
};

export default isPasswordCorrect;
