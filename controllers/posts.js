import Posts from "../models/posts.js";
import mongoose from "mongoose";
export const getPosts = async (req, res) => {
  const {page} = req.query;
  try {
    const LIMIT = 2;
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await Posts.countDocuments({})
    const posts = await Posts.find().sort({ createdAt: -1 }).limit(LIMIT).skip(startIndex)
    return res.json({ result: posts , currentPage: Number(page), numberOfpage: Math.ceil(total / LIMIT)});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBySearchPosts = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await Posts.find({ title: title });

    return res.json({ result: posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const fileimg = req.files
  const post = req.body;

  const image = fileimg.map(img => img.filename)

  const newPost = new Posts({
    ...post,
    image: image,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    return res.json({ result: newPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No posts with that id");

  try {
    const post = await Posts.findOneAndRemove({ _id: id });
    return res.json({ result: post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const post = req.body;

  if (!req.userId) return res.status(403).send("Unauthenticated");

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  try {
    const updatePost = await Posts.findByIdAndUpdate(
      { _id: id },
      { ...post, _id: id },
      { new: true }
    );

    return res.json({ result: updatePost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const id = req.params.id;

  if (!req.userId) return res.status(403).send("Unauthenticated");

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No posts with that id");

  try {
    const post = await Posts.findById({ _id: id });
    const index = await post.like.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.like.push(req.userId);
    } else {
      post.like = post.like.filter((id) => id !== req.userId);
    }

    const UpdatePost = await Posts.findByIdAndUpdate({ _id: id }, post, {
      new: true,
    });
    return res.json({ result: UpdatePost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  if (!req.userId) return res.status(403).send("Unauthenticated");

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No posts with that id");

  try {
    const post = await Posts.findById({ _id: id });

    post.comment.push(comment);
    const updatePost = await Posts.findByIdAndUpdate({ _id: id }, post, {
      new: true,
    });

    return res.json({ result: updatePost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getLibPosts = async (req, res) => {
  try {
    const posts = await Posts.find({ creator: req.userId }).sort({
      createdAt: -1,
    });

    return res.json({ result: posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
