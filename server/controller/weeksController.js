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
  console.log("req.params>>", req.params);
  console.log("req.query>>", req.query);
  // const { week } = req.params;
  const week = req.params.week;
  try {
    const requestedWeek = await weekModel
      .find({ week: week })
      .populate({ path: "exercises", select: ["name", "description"] })
      .exec();
    console.log("requestedWeek>>", requestedWeek);
    if (requestedWeek.length === 0) {
      res.status(202).json({
        message: "No week with this number",
      });
    } else {
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
