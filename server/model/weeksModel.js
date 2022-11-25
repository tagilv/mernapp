import mongoose from "mongoose";

const { Schema } = mongoose;

const weekSchema = new Schema({
  week: {
    type: String,
    required: true,
    unique: true,
  },

  excercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
});

const weekModel = mongoose.model("week", weekSchema);

export default weekModel;
