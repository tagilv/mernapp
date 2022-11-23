import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
  week: {
    type: String,
    required: true,
    unique: true,
  },

  exercises: {
    type: [
      {
        description: String,
        instructions: String,
        category: String,
      },
    ],
    default: undefined,
  },
});

const weekModel = mongoose.model("week", weekSchema);
