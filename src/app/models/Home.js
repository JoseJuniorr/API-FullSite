import mongoose from "mongoose";

const Home = mongoose.Schema(
  {
    //topo da página
    titleTop: {
      type: String,
    },
    descTop: {
      type: String,
    },

    titleBtnTop: {
      type: String,
    },
    linkBtnTop: {
      type: String,
    },
    //area de serviços
    titleServ: {
      type: String,
    },
    iconOneServ: {
      type: String,
    },
    iconTwoServ: {
      type: String,
    },
    iconThreeServ: {
      type: String,
    },
    //video
    titleVideo: {
      type: String,
    },
    descTitleVideo: {
      type: String,
    },
    embedVideo: {
      type: String,
    },
    // area de projetos
    titleProj: {
      type: String,
    },
    iconOneProj: {
      type: String,
    },
    titleOneProj: {
      type: String,
    },
    descOneProj: {
      type: String,
    },

    iconTwoProj: {
      type: String,
    },
    titleTwoProj: {
      type: String,
    },
    descTwoProj: {
      type: String,
    },
    iconTrheeProj: {
      type: String,
    },
    titleTrheeProj: {
      type: String,
    },
    descTrheeProj: {
      type: String,
    },
    iconFourProj: {
      type: String,
    },
    titleFourProj: {
      type: String,
    },
    descFourProj: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("home", Home);
