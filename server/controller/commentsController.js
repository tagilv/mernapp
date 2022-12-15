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
  const { commentId } = req.body;

  try {
    // const deleteComment = await commentModel.updateOne(
    //   { _id: weeksId },
    //   { $pull: { comments:commentsId} },
    //   { new: true }
    // );
    const deleteComment = await commentModel.findOneAndDelete({
      _id: commentId,
    });
    if (deleteComment) {
      //remove comment from week
    }
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

export { createComment, deleteComment };
