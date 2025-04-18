const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// the name of the model is important, because it's going to look at the name, it will then pluralize it, and look for that collection in the db.
// here that would be "blogs" that we established on https://cloud.mongodb.com/ account as Collection name.
// so whenever we use the Blog(capitalized) model, it will look into "blogs" collection automatically.
const Blog = mongoose.model("Blog", blogSchema); // name of model and it's schema as params.

module.exports = Blog; // we export Blog Model because that's what we will be using to interact with db
