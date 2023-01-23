export const server =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://mern-app-server.vercel.app";
