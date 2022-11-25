import exerciseModel from "../model/exercisesModel.js";

const getAllExercises = async (req, res) => {
  const allExercises = await exerciseModel.find({});

  try {
    res.status(200).json({
      number: allExercises.length,
      allExercises,
    });
  } catch (error) {
    console.log("error>>", error);
    res.status(500).json({
      error: error,
    });
  }
};
export { getAllExercises };
