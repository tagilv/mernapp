import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import getToken from "../utils/getToken.js";

function Profile() {
  const { userLogin, setUserLogin, getProfile } = useContext(AuthContext);
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
    console.log("image upload working");

    setUser({ ...user, avatarPicture: result.image });
    //Previously:
    // Then go to userController and set the image in the front
    // setUserLogin({ ...userLogin, avatarPicture: result.image });
    console.log("result>>", result);
    console.log("selectedFile>>", selectedFile);
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
