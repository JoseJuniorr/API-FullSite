import mongoose from "mongoose";

const Footer = new mongoose.Schema(
  {
    titlePg: {
      type: String,
      required: true,
    },
    titleCont: {
      type: String,
      required: true,
    },
    telCont: {
      type: String,
      required: true,
    },
    endCont: {
      type: String,
      required: true,
    },
    titleRedSoc: {
      type: String,
      required: true,
    },
    instaTitle: {
      type: String,
      required: true,
    },
    instaLink: {
      type: String,
      required: true,
    },
    youtubeTitle: {
      type: String,
      required: true,
    },
    youtubeLink: {
      type: String,
      required: true,
    },
    FaceTitle: {
      type: String,
      required: true,
    },
    FaceLink: {
      type: String,
      required: true,
    },
    LinkedInTitle: {
      type: String,
      required: true,
    },
    LinkedInTitleLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("footer", Footer);
