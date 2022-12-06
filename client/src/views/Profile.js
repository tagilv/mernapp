import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import getToken from "../utils/getToken.js";

function Profile() {
  const { userLogin, setUserLogin } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setError("You need to log in");
    }
  }, [error]);

  // USE IF USER INSTEAD OF TOKEN AND DO IT IN AUTHCONTEXT

  const attachFilehandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("e.target.files[0]", e.target.files[0]);
    console.log("e.target", e.target.value);
  };

  const submitForm = async (e) => {
    console.log("selectedFile>>", selectedFile);
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/users/uploadimage",
      requestOptions
    );
    const result = await response.json();

    // Note: Since user with email and pw might already created we use the spread operator. Go inside the newUser variable and take whatever is there and put it together with what I insert.
    setUserLogin({ ...userLogin, avatarPicture: result.image });
    console.log("result>>", result);
  };

  // // To trigger the getProfile to get the userLogin info as the view loads
  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <>
      <div>
        <h2>Welcome to your profile</h2>\
        <form>
          <input
            type="file"
            name="file"
            id="file"
            onChange={attachFilehandler}
          />
          <button onClick={submitForm}>Upload Picture</button>
        </form>
        <h2>Placeholder pic</h2>
        {userLogin && (
          <div>
            <p>Welcome {userLogin.email}</p>
            <img src={userLogin.avatarPicture} alt="avatarPicture" />
            {/* <img src={userLogin.avatar} alt="avatar" /> */}
            {console.log("userLogin.avatarPicture", userLogin.avatarPicture)}
            {console.log("userLogin.avatar", userLogin.avatar)}
            {/* {console.log("userLogin", userLogin)} */}
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}

export default Profile;
