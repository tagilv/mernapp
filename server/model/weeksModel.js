import mongoose from "mongoose";

const { Schema } = mongoose;

const weekSchema = new Schema({
  week: {
    type: String,
    required: true,
    unique: true,
  },

  exercises: [{ type: Schema.Types.ObjectId, ref: "exercise" }],
});

const weekModel = mongoose.model("week", weekSchema);

export default weekModel;
