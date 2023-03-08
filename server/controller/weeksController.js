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
  const week = req.params.week;

  try {
    const requestedWeek = await weekModel
      .find({ week: week })
      .populate({
        path: "exercises",
        select: ["name", "description", "exerciseNumber"],
      })
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "user",
          select: "userName email avatarPicture",
        },
      })
      .exec();
    if (requestedWeek.length === 0) {
      res.status(404).json({
        message: "No week with this number",
      });
    } else {
      // Mutating the object, want one week so requestedWeek[0], after requestedWeek since we are getting a list of weeks
      requestedWeek[0].comments = requestedWeek[0].comments.filter(
        (comment) => {
          return comment.author._id.toString() === req.user._id.toString();
        }
      );

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

export { getAllWeeks, getWeeksByWeek };
