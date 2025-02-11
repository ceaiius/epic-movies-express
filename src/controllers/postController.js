import Post from "../models/Post.js";

// 🟢 Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const newPost = new Post({ title, description, image, user: req.user._id });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email"); // Populate user data
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟠 Update a post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔴 Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }
    await post.remove();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
