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
      default: new Date(Date.now() + 10000), // just for checking 10 second = 10000   and for //1000*60*60 = 1hr
      expires: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("session", SessionSchema);
