import JsonWebToken from "jsonwebtoken";

const issueToken = (userId, userEmail) => {
  const payload = {
    sub: userId,
    email: userEmail,
  };

  const options = {
    expiresIn: "7d",
  };

  const token = JsonWebToken.sign(payload, process.env.JWT_SECRET_KEY, options);

  return token;
};

export default issueToken;
