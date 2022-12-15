import commentModel from "../model/commentsModel.js";
import weekModel from "../model/weeksModel.js";

// CREATE COMMENT

const createComment = async (req, res) => {
  // ObjectId lives in _id
  const { _id } = req.user;
  // Body is coming from front end, need to pass as weekId, name it in the front end
  const { comment, weekId } = req.body;
  console.log("req.body in comments controller", req.body);
  console.log("req.user in comments controller", req.user);

  try {
    const newComment = await commentModel.create({
      // Using whats in the model so need to put author there
      author: _id,
      comment: comment,
    });
    if (newComment) {
      const newCommentInWeek = await weekModel.updateOne(
        // Here I need to find the Id fo the week (weekId)
        { _id: weekId },
        // Here I want to set the newComment._id since that contains the objectId
        { $push: { comments: newComment._id } },
        { new: true }
      );
      console.log("newComment", newComment);
      //
      res.status(201).json({
        message: "success saving comment to week",
        // This way you update the front end state accordign to hat is in your bacend db
      });
    }
    // if object id is in new object, go to weeks collection and update the array, find week and push to cometns
  } catch (error) {
    res.status(500).json({
      message: "error saving comment to week",
    });
    console.log(error);
  }
};

const deleteComment = async (req, res) => {
  const { _id } = req.user;
  const { commentId, weekId } = req.body;

  try {
    const deleteComment = await commentModel.findOneAndDelete({
      _id: commentId,
    });
    if (deleteComment) {
      //remove comment from week
    }
    const deleteCommentFromWeek = await weekModel.updateOne(
      { _id: weekId },
      { $pull: { comments: commentId } },
      { new: true }
    );
    console.log("Comment deleted?", deleteComment);
    res.status(201).json({
      message: "Comment deleted?",
    });
  } catch (error) {
    console.log("error deleting the comment", error);
    res.status(201).json({
      message: "error deleting the comment",
    });
  }
};

const editComment = async (req, res) => {
  const { _id } = req.user;
  const { commentId } = req.body;
  const { editedComment } = req.body;

  console.log("req.body for edit", req.body);
  console.log("req.user for edit", req.user);

  try {
    const findAndEditComment = await commentModel.findByIdAndUpdate(
      // After commentID I can put an object and specify the properties I want to update in the comment
      commentId,
      { comment: editedComment },
      { new: true }
    );
    console.log("Succesfully updated comment", editedComment);
    res.status(201).json({
      message: "Succesfully updated comment",
    });
  } catch (error) {
    console.log("error updating comment", error);
    res.status(500).json({
      message: "Not succesfully updated comment",
    });
  }
};

export { createComment, deleteComment, editComment };
