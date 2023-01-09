import mongoose from "mongoose";

const { Schema } = mongoose;

const weekSchema = new Schema({
  week: {
    type: String,
    required: true,
    unique: true,
  },

  exercisesImagesMain: {
    type: Array,
    required: true,
    unique: false,
  },

  weekFocus: {
    type: String,
    required: true,
    unique: false,
  },

  exercises: [{ type: Schema.Types.ObjectId, ref: "exercise" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
});

const weekModel = mongoose.model("week", weekSchema);

export default weekModel;
