// Need to recive the week here 9sending it in the getWeekDetails function and the getWeekDetailsHelper function in weeks to here

const getWeekDetails = async (week) => {
  console.log("week>>>>", week);
  try {
    const response = await fetch(`http://localhost:5000/api/weeks/all/${week}`);
    const results = await response.json();
    console.log("results>>", results);
    console.log("results.requestedWeek>>", results.requestedWeek);
    console.log("results.requestedWeek[0]>>", results.requestedWeek[0]);

    return results;
  } catch (error) {
    console.log("error fetching weekly excercises>>", error);
  }
};

export { getWeekDetails };

// Cant set state here, set it where you later recive the result
