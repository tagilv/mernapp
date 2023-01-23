import React, { useContext, useEffect, useState } from "react";
import getToken from "../utils/getToken";
import useWeekDetails from "../utils/useWeekDetails.js";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import { FaTrashAlt, FaSave } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/react";
import { server } from "../utils/server";

function Comments() {
  // const { server } = useContext(AuthContext);
  // Get weekId from the front end from weekDetials._id (then use this in the to append it to the urlencoded)

  const { setWeekDetails, weekDetails, getWeekDetails } = useWeekDetails();

  console.log("weekDetails", weekDetails);

  const weekId = weekDetails._id;
  const [commentInput, setCommentInput] = useState("");

  const { week } = useParams();

  useEffect(() => {
    getWeekDetails(week);
    // Need to send the week as argument here
    // getWeekDetailsHelper(week);
  }, []);

  console.log("weekDetails", weekDetails);

  // ref or new state called allcomments

  const handleCommentInput = (e) => {
    console.log("typing");
    setCommentInput(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const token = getToken();
    console.log("submit");
    console.log("commentInput", commentInput);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const urlencoded = new URLSearchParams();
    // append the keys and values to the urlencoded and then we add them to the body later below
    // Replace the hardcoded values with variables
    urlencoded.append("weekId", weekId);
    urlencoded.append("comment", commentInput);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${server}/api/comments/create`,
        // "http://localhost:5000/api/comments/create",
        requestOptions
      );
      const result = await response.json();
      getWeekDetails(week);
      setCommentInput("");

      // call get week detials
    } catch (error) {
      console.log("error adding comment", error);
    }
  };

  // DELETE
  // pass from delete functiomn the commentID
  const handleDelete = async (commentId) => {
    const token = getToken();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("commentId", commentId);
    urlencoded.append("weekId", weekId);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${server}/api/comments/delete`,
        // "http://localhost:5000/api/comments/delete",
        requestOptions
      );
      const result = await response.json();

      // Use hook to return
      getWeekDetails(week);
    } catch (error) {
      console.log("error deleting comment", error);
    }
  };

  // EDIT

  const handleEdit = async (commentId, editedComment) => {
    console.log("editedComment", editedComment);
    console.log("commentId", commentId);
    const token = getToken();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("commentId", commentId);
    urlencoded.append("editedComment", editedComment);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${server}/api/comments/edit`,
        // "http://localhost:5000/api/comments/edit",
        requestOptions
      );
      const result = response.json();
      getWeekDetails(week);
      setEditCommentId(null);
      setEditComment("");
    } catch (error) {
      console.log("error updating the comments", error);
    }
  };

  const [editComment, setEditComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const handleEditToggle = (commentId, editCommentText) => {
    setEditCommentId(commentId);
    setEditComment(editCommentText);

    console.log("commentId!!", commentId);
    // setEditToggle((prev) => !prev);
    console.log("edit text");
  };

  return (
    <div>
      <Box>
        <Box position={"relative"} p={"4"} width={"full"} overflow={"hidden"}>
          {/* Chat tools here */}
          <form onClick={handleSubmitComment}>
            {/* chat */}
            <Text fontSize="md">Chat to your nurse here</Text>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <Textarea
                fontSize="sm"
                maxW={"50%"}
                className="bg-gray-100 rounded border border-gray-400 leading-normal w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                placeholder="Type Your Message"
                required
                type="text"
                onChange={handleCommentInput}
                value={commentInput}
              ></Textarea>
              <button className="bg-white py-1 px-4 border border-gray-400 rounded-lg hover:bg-gray-100">
                <Tooltip label="Send" fontSize="md">
                  <Icon as={FaPaperPlane} boxSize={6} />
                </Tooltip>
              </button>
            </div>
          </form>
        </Box>
      </Box>

      {weekDetails &&
        weekDetails.comments.map((comment) => {
          return (
            <Box align="right" p={"4"}>
              <div className="flex-row justify-center py-6 px-10">
                <div>
                  {editCommentId !== comment._id ? (
                    <Card
                      maxW={"50%"}
                      onClick={(e) =>
                        handleEditToggle(comment._id, comment.comment)
                      }
                      className=" bg-gray-100 rounded border border-gray-400 leading-normal w-full h-20 py-2 px-3 font-medium placeholder-gray-700
                    hover:bg-white cursor-text"
                    >
                      <CardBody>
                        <Text>{comment.comment}</Text>
                      </CardBody>
                    </Card>
                  ) : (
                    <textarea
                      onChange={(e) => setEditComment(e.target.value)}
                      className=" bg-gray-100 rounded border border-gray-400 leading-normal w-full h-20 py-2 px-3 font-medium placeholder-gray-700
                    hover:bg-white cursor-text"
                    >
                      {editComment}
                    </textarea>
                  )}
                </div>
                {/* Take value of the text with e.target.value */}
                <span onClick={(e) => handleEdit(comment._id, editComment)}>
                  <Icon as={FaSave} />
                </span>
                {/* use the e and call back function to pass data back to the handleDelete function */}
                <span onClick={(e) => handleDelete(comment._id)}>
                  <Icon as={FaTrashAlt} />
                </span>
              </div>
            </Box>
          );
        })}
    </div>
  );
}

export default Comments;

// return (
//   <div>
//     <form onClick={handleSubmitComment}>
//       <label for=""></label>
//       <input type="text" onChange={handleCommentInput} value={commentInput} />
//       <button>Add comment</button>
//     </form>
//     <h2>Chat to your nurse here</h2>
//     {weekDetails &&
//       weekDetails.comments.map((comment) => {
//         return <p>{comment.comment}</p>;
//       })}
//     <span onClick={handleDelete}>Delete comment</span>
//   </div>
// );

//   !editToggle && comment._id ? (
//     <div
//       onClick={(e) => handleEditToggle(comment._id)}
//       // onClick={(e) => handleEdit(comment._id)
//       className=" bg-gray-100 rounded border border-gray-400 leading-normal w-full h-20 py-2 px-3 font-medium placeholder-gray-700
//                     hover:bg-white cursor-text"
//     >
//       <p>{comment.comment}</p>
//       {/* <button onClick={handleEditToggle} type="">
//                       Open edit text
//                     </button> */}
//     </div>
//   ) : (
//     <textarea
//       className=" bg-gray-100 rounded border border-gray-400 leading-normal w-full h-20 py-2 px-3 font-medium placeholder-gray-700
//                     hover:bg-white cursor-text"
//     >
//       None
//     </textarea>
//   );
// }

// Pre

// return (
//     <div>
//       <Box>
//         <Box
//           position={"relative"}
//           p={"4"}
//           height={"300px"}
//           width={"full"}
//           overflow={"hidden"}
//         >
//           {/* Chat tools here */}

//         </Box>
//       </Box>
//       <form onClick={handleSubmitComment}>
//         <div className="flex-row justify-center py-6 px-10">
//           {/* chat */}
//           <h4 className="px-4 pt-3 text-md">Chat to your nurse here</h4>
//           <div className="w-full md:w-full px-3 mb-2 mt-2">
//             <textarea
//               className="bg-gray-100 rounded border border-gray-400 leading-normal w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
//               placeholder="Type Your Comment"
//               required
//               type="text"
//               onChange={handleCommentInput}
//               value={commentInput}
//             ></textarea>
//             <button className="bg-white py-1 px-4 border border-gray-400 rounded-lg hover:bg-gray-100">
//               Add comment
//             </button>
//           </div>
//         </div>
//       </form>
//       {weekDetails &&
//         weekDetails.comments.map((comment) => {
//           return (
//             <div className="flex-row justify-center py-6 px-10">
//               <div>
//                 {editCommentId !== comment._id ? (
//                   <div
//                     onClick={(e) =>
//                       handleEditToggle(comment._id, comment.comment)
//                     }
//                     className=" bg-gray-100 rounded border border-gray-400 leading-normal w-full h-20 py-2 px-3 font-medium placeholder-gray-700
//                     hover:bg-white cursor-text"
//                   >
//                     <p>{comment.comment}</p>
//                   </div>
//                 ) : (
//                   <textarea
//                     onChange={(e) => setEditComment(e.target.value)}
//                     className=" bg-gray-100 rounded border border-gray-400 leading-normal w-full h-20 py-2 px-3 font-medium placeholder-gray-700
//                     hover:bg-white cursor-text"
//                   >
//                     {editComment}
//                   </textarea>
//                 )}
//               </div>
//               {/* Take value of the text with e.target.value */}
//               <span onClick={(e) => handleEdit(comment._id, editComment)}>
//                 Save edit
//               </span>
//               {/* use the e and call back function to pass data back to the handleDelete function */}
//               <span onClick={(e) => handleDelete(comment._id)}>
//                 Delete comment
//               </span>
//             </div>
//           );
//         })}
//     </div>
//   );
// }

// export default Comments;
