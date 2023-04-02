const mongoose =require("mongoose") ;
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      types: Array,
      default: [],
    },
  },
  { timesTamps: true }
);
const Post = mongoose.model("Post", postSchema);
module.exports=Post;
