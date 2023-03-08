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
  // Get weekId from the front end from weekDetials._id and append it to the urlencoded
  const { setWeekDetails, weekDetails, getWeekDetails } = useWeekDetails();

  const weekId = weekDetails._id;
  const [commentInput, setCommentInput] = useState("");

  const { week } = useParams();

  useEffect(() => {
    getWeekDetails(week);
  }, []);

  const handleCommentInput = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const token = getToken();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const urlencoded = new URLSearchParams();
    // Append keys and values to the urlencoded, add them to the body below
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
    } catch (error) {
      console.log("error adding comment", error);
    }
  };

  // DELETE
  // Pass commentID
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
      getWeekDetails(week);
    } catch (error) {
      console.log("error deleting comment", error);
    }
  };

  // EDIT
  const handleEdit = async (commentId, editedComment) => {
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
  };

  return (
    <div>
      <Box>
        <Box position={"relative"} p={"4"} width={"full"} overflow={"hidden"}>
          <form onClick={handleSubmitComment}>
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
                <span onClick={(e) => handleEdit(comment._id, editComment)}>
                  <Icon as={FaSave} />
                </span>
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
