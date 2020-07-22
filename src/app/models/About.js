import mongoose from "mongoose";

const About = new mongoose.Schema(
  {
    titlePgAbout: {
      type: String,
      required: true,
    },
    titleAbout: {
      type: String,
      required: true,
    },
    descPgAbout: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("about", About);
