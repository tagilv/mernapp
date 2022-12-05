import JsonWebToken from "jsonwebtoken";

// what matters here is the position when we are sneidng it in the user controller
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
