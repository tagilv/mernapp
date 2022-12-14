import React, { useState } from "react";
import getToken from "../utils/getToken";

function Comments({ weekDetails }) {
  // const [commentText, setCommentText] = useState("");

  // Get weekId from the front end from weekDetials._id (then use this in the to append it to the urlencoded)
  const weekId = weekDetails._id;

  // FOR THE COMMENT INPUT (could also use a ref)
  const [commentInput, setCommentInput] = useState("");

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

    //POSTMAN CODE GOES HERE
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
        "http://localhost:5000/api/comments/create",
        requestOptions
      );
      const result = await response.json();

      // Idea, set it with commentText instead of result?
      setCommentInput("");
    } catch (error) {
      console.log("error adding comment", error);
    }
  };

  return (
    <div>
      <form onClick={handleSubmitComment}>
        <label for="">Add Comment</label>
        <input type="text" onChange={handleCommentInput} value={commentInput} />
        <button>Add comment</button>
      </form>
      <h2>Chat to your nurse here</h2>
      {weekDetails &&
        weekDetails.comments.map((comments) => {
          return <p>{comments.text}</p>;
        })}
    </div>
  );
}

export default Comments;