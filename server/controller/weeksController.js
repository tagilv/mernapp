// Import weekModel after moving this out of routes and into the controller
import weekModel from "../model/weeksModel.js";

const getAllWeeks = async (req, res) => {
  try {
    const allWeeks = await weekModel
      .find({})
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "user",
          select: "userName email avatarPicture",
        },
      })
      .populate({ path: "exercises" })
      .exec();
    // .populate({ path: "comments" });
    // .exec();
    console.log("allWeeks:>>", allWeeks);
    res.status(200).json({
      numberOfWeeks: allWeeks.length,
      data: allWeeks,
    });
  } catch (error) {
    console.log("error finding all weeks :>>", error);
    res.status(500).json({
      error,
      message: "There was a problem with the server",
    });
  }
};

const getWeeksByWeek = async (req, res) => {
  // Fidn user in req.user
  console.log("req.user from getWeeksByWeek", req.user);
  console.log("req.params>>", req.params);
  console.log("req.query>>", req.query);
  // const { week } = req.params;
  const week = req.params.week;

  try {
    const requestedWeek = await weekModel
      .find({ week: week })
      .populate({ path: "exercises", select: ["name", "description"] })
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "user",
          select: "userName email avatarPicture",
          // Add way of fitlering the comments to the right users
        },
      })
      .exec();
    console.log("requestedWeek from controller>>", requestedWeek);
    console.log("requestedWeek.comment", requestedWeek[0].comments);
    console.log("userid");
    if (requestedWeek.length === 0) {
      res.status(404).json({
        message: "No week with this number",
      });
    } else {
      // Mutating the object
      // Just want one week so requestedWeek[0]
      // Have to do it after requestedWeek since we are getting a list of weeks
      requestedWeek[0].comments = requestedWeek[0].comments.filter(
        (comment) => {
          console.log("comment.author._id", comment.author._id);
          console.log("req.user._id", req.user._id);
          return comment.author._id.toString() === req.user._id.toString();
        }
      );
      console.log("requestedWeek.comment", requestedWeek[0].comments);

      res.json({
        requestedWeek,
        number: requestedWeek.length,
      });
    }
  } catch (error) {
    console.log("error getting weeks>>", error);
    res.status(500).json({
      error: error.name,
      message: "server error",
    });
  }
};

// Note: name exports since there will be several functions here. Import it back in weeksRoutes.
export { getAllWeeks, getWeeksByWeek };

// const getWeeksByWeek = async (req, res) => {
//   console.log("req.params>>", req.params);
//   console.log("req.query>>", req.query);
//   // const { week } = req.params;
//   const week = req.params.week;
//   try {
//     const requestedWeek = await weekModel
//       .find({ week: week })
//       .populate({ path: "exercises", select: ["name", "description"] })
//       .exec();
//     console.log("requestedWeek>>", requestedWeek);
//     if (requestedWeek.length === 0) {
//       res.status(202).json({
//         message: "No week with this number",
//       });
//     } else {
//       res.json({
//         requestedWeek,
//         number: requestedWeek.length,
//       });
//     }
//   } catch (error) {
//     console.log("error getting weeks>>", error);
//     res.status(500).json({
//       error: error.name,
//       message: "server error",
//     });
//   }
// };
