import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
    unique: false,
  },

  author: { type: Schema.Types.ObjectId, ref: "user" },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
