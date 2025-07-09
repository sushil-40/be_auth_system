import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    association: {
      type: String,
    },
    expire: {
      type: Date,
      required: true,
      default: new Date(Date.now() + 3600000), //1000*60*60 = 1hr
      expires: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("session", SessionSchema);
