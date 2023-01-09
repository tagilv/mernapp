import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import getToken from "../utils/getToken.js";

// Could also destruct the props with {}and pass in each props
function WeekProgress(props) {
  return (
    <Box>
      <Text mb={"2"}>{props.name}</Text>
      <CircularProgress value={props.progress} color="green.400">
        <CircularProgressLabel>{props.progress}%</CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
}
const exampleProgress = Array(8)
  .fill(null)
  .map((x, i) => {
    return { name: `Week ${i + 1}`, progress: Math.floor(Math.random() * 100) };
  });
console.log("exampleProgress", exampleProgress);

function Profile() {
  const { userLogin, setUserLogin, getProfile, server } =
    useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState({});
  const [error, setError] = useState(null);

  // Need to bring in isLogged from AuthContext below when adding proteced routes to give time to get user

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
      <Box maxW="100%" align="center" minH="100vh" py={{ base: 8, md: 20 }}>
        {/* For upper */}
        <Flex
          bg={"lightgray"}
          borderRadius={"20"}
          justify={{ base: "start", md: "space-around" }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 8, md: 5 }}
          direction={{ base: "column", md: "row" }}
          maxW={{ base: "90%", md: "85%", lg: "80%" }}
          height={"300px"}
        >
          <Box maxH={"80%"}>
            <Heading
              as="h3"
              size="md"
              align={{ base: "center", md: "right" }}
              justify={{ base: "start", md: "space-around" }}
              pt={{ base: "", md: "10" }}
            >
              {user && <p>Welcome back {user.userName}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </Heading>
          </Box>
          <Box height={{ base: "80%", md: "100%" }}>
            <Box height={"80%"} rounded={"2xl"} pt={{ base: 2, md: 0 }}>
              <Image
                borderRadius="50"
                alt={"Hero Image"}
                fit={"cover"}
                h={"100%"}
                src={user.avatarPicture}
              />
            </Box>
            <Box mt={"3"}>
              <Flex
                direction={{ base: "row", md: "s" }}
                justify={"space-around"}
              >
                <ButtonGroup size="sm" isAttached variant="outline">
                  <Input
                    type="file"
                    onChange={attachFilehandler}
                    id="upload"
                    hidden
                  />
                  <FormLabel
                    pt={0.5}
                    for="upload"
                    height="24px"
                    lineHeight="1.2"
                    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                    border="1px"
                    px="8px"
                    borderRadius="2px"
                    fontSize="14px"
                    fontWeight="semibold"
                    bg="#f5f6f7"
                    borderColor="#ccd0d5"
                    color="#4b4f56"
                    _hover={{ bg: "#ebedf0" }}
                    _active={{
                      bg: "#dddfe2",
                      transform: "scale(0.98)",
                      borderColor: "#bec3c9",
                    }}
                  >
                    +
                  </FormLabel>
                  <Button
                    onClick={submitForm}
                    for="upload"
                    height="24px"
                    lineHeight="1.2"
                    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                    border="1px"
                    px="8px"
                    borderRadius="2px"
                    fontSize="14px"
                    fontWeight="semibold"
                    bg="#f5f6f7"
                    borderColor="#ccd0d5"
                    color="#4b4f56"
                    _hover={{ bg: "#ebedf0" }}
                    _active={{
                      bg: "#dddfe2",
                      transform: "scale(0.98)",
                      borderColor: "#bec3c9",
                    }}
                  >
                    Upload image
                  </Button>
                </ButtonGroup>
              </Flex>
            </Box>
          </Box>
        </Flex>

        <Flex
          mt={"5"}
          bg={"lightgray"}
          borderRadius={"20"}
          justify={{ base: "start", md: "space-around" }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 8, md: 5 }}
          direction={{ base: "column", md: "row" }}
          maxW={{ base: "90%", md: "85%", lg: "80%" }}
        >
          {exampleProgress.map((week) => {
            return <WeekProgress name={week.name} progress={week.progress} />;
          })}
        </Flex>
      </Box>
    </>
  );
}

export default Profile;

// pre 2nd
{
  /* <div>
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
</div> */
}

// Pre
// Welcome back {user.userName}
// <div>
//   <h2>Welcome to your profile</h2>\
//   <form>
//     <input type="file" onChange={attachFilehandler} />
//     <button onClick={submitForm}>Upload Picture</button>
//   </form>
//   <h2>Test</h2>
//   {user && (
//     <div>
//       <p>Welcome {user.email}</p>
//       <img src={user.avatarPicture} alt="avatarPicture" />
//     </div>
//   )}
//   {error && <p style={{ color: "red" }}>{error}</p>}
// </div>
// ;

// Pre

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

// Before chakra impl

//   return (
//     <>
//       <div>
//         <h2>Welcome to your profile</h2>\
//         <form>
//           <input type="file" onChange={attachFilehandler} />
//           <button onClick={submitForm}>Upload Picture</button>
//         </form>
//         <h2>Test</h2>
//         {user && (
//           <div>
//             <p>Welcome {user.email}</p>
//             <img src={user.avatarPicture} alt="avatarPicture" />
//           </div>
//         )}
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//       {/* Test */}
//       <div></div>
//     </>
//   );
