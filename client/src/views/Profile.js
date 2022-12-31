import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import getToken from "../utils/getToken.js";

function Profile() {
  const { userLogin, setUserLogin, getProfile, server } =
    useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState({});
  const [error, setError] = useState(null);

  // Need to bring in isLogged from AuthContext below when adding proteced routes to give time to get user

  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setError("You need to log in");
    }
  }, [error]);

  const attachFilehandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("FILES ATTACHING");
    console.log("e.target.files[0]", e.target.files[0]);
    console.log("e.target", e.target.value);
  };

  const submitForm = async (e) => {
    console.log("selectedFile>>", selectedFile);
    e.preventDefault();
    const token = getToken();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `${server}/api/users/uploadimage`,
      // "http://localhost:5000/api/users/uploadimage",
      requestOptions
    );
    const result = await response.json();

    // Experiment starts here

    // Create a function that will take that image url
    // This function will make a reqest to the route just tested
    // At the end of the request we will recive the new user and set it
    // Set user below can be removed

    // Experiment ends here

    // setUser({ ...user, avatarPicture: result.image });

    console.log("result>>", result);
    console.log("selectedFile>>", selectedFile);
    // setUser(result);
    updateProfile(result);
  };

  const updateProfile = async (result) => {
    console.log("result", result);
    const token = getToken();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("avatarPicture", result.image);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${server}/api/users/update`,
        // "http://localhost:5000/api/users/update",
        requestOptions
      );
      const updatedUser = await response.json();
      console.log("updatedUser", updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.log("Error updating image>>", error);
    }
  };

  // // To trigger the getProfile to get the userLogin info as the view loads
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div>
        <h2>Welcome to your profile</h2>\
        <form>
          <input type="file" onChange={attachFilehandler} />
          <button onClick={submitForm}>Upload Picture</button>
        </form>
        <h2>Test</h2>
        {user && (
          <div>
            <p>Welcome {user.email}</p>
            <img src={user.avatarPicture} alt="avatarPicture" />
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}

export default Profile;

//  <>
//       <div>
//         <h2>Welcome to your profile</h2>\
//         <form>
//           <input
//             type="file"
//             name="file"
//             id="file"
//             onChange={attachFilehandler}
//           />
//           <button onClick={submitForm}>Upload Picture</button>
//         </form>
//         <h2>Test</h2>
//         {user && (
//           <div>
//             <p>Welcome {user.email}</p>
//             <img src={user.avatarPicture} alt="avatarPicture" />
//             {console.log("user", user)}
//           </div>
//         )}
//         <h2>Placeholder pic</h2>
//         {/* {!isLogged ? (
//           <p>NOT LOGGED!!!</p>
//         ) : (
//           userLogin && (
//             <div>
//               <p>Welcomesss {userLogin.email}</p>
//               <img src={userLogin.avatarPicture} alt="avatarPicture" />
//               <img src={userLogin.avatar} alt="avatar" />
//               {console.log("userLogin.avatarPicture", userLogin.avatarPicture)}
//               {console.log("userLogin", userLogin)}
//             </div>
//           )
//         )} */}
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>
//     </>
//   );
