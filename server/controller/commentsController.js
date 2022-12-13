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
      res.status(201).json({
        message: "comment saved and added to week",
        comment: newComment,
      });
    }
    // if object id is in new object, go to weeks collection and update the array, find week and push to cometns
  } catch (error) {
    console.log(error);
  }
};

export { createComment };

// CREATE COMMENT

// const createComment = async (req, res) => {
//   // objctid lives in _id
//   const { _id } = req.user;
//   const { comment } = req.body;
//   console.log("req.body in comments controller", req.body);
//   console.log("req.user in comments controller", req.user);

//   try {
//     const newComment = await commentModel.create({
//       // Using whats in the model so need to put author there
//       author: _id,
//       comment: "Funkar nu?",
//     });
//     if (newComment) {
//       const savedComment = await weekModel.findOne({
//         id: _id,
//         $push: { comments: comment },
//         new: true,
//       });
//       console.log("savedComment", savedComment);
//       // const savedComment = await newComment.save();
//     }
//     // if opera , object id is in new object, so go to weeks collection  and uptate the array, find week and push to cometns
//   } catch (error) {
//     console.log(error);
//   }
// };

// export { createComment };
