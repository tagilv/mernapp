import React from "react";

function Comments({ weekDetails }) {
  return (
    <div>
      <h2>Chat to your nurse here</h2>
      {weekDetails &&
        weekDetails.comments.map((comments) => {
          return <p>{comments.text}</p>;
        })}
    </div>
  );
}

export default Comments;
