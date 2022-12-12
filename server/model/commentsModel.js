import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
    unique: false,
  },
  author: { type: Schema.Types.ObjectId, ref: "user" },
  // author: {
  //   type: String,
  // },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
