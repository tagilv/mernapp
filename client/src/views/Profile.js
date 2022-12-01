import React, { useState } from "react";

function Profile() {
  const [selectedFile, setSelectedFile] = useState({});
  const [newUser, setNewUser] = useState({});

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
    setNewUser({ ...newUser, avatarPicture: result.image });

    console.log("newUser>>", newUser);
    console.log("result>>", result);
  };

  return (
    <>
      <div>
        <h2>Welcome to your profile</h2>
        <form>
          <input
            type="file"
            name="file"
            id="file"
            onChange={attachFilehandler}
          />
          <button onClick={submitForm}>Upload Picture</button>
        </form>
        {newUser && <img src={newUser.avatarPicture} alt="" />}
      </div>
    </>
  );
}

export default Profile;
