import mongoose from "mongoose";

const { Schema } = mongoose;

const exerciseSchema = new Schema({
  week: {
    type: Number,
    required: true,
    unique: false,
  },
  exerciseNumber: {
    type: Number,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  instruction: {
    type: String,
    required: true,
    unique: false,
  },
  category: {
    type: String,
    required: true,
    unique: false,
  },
});

const exerciseModel = mongoose.model("exercise", exerciseSchema);

export default exerciseModel;
