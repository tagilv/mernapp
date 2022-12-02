const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("user is logged in");
    return token;
  } else {
    console.log("user is not logged in");
    return false;
  }
};

export default getToken;
