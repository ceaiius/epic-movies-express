import Post from "../models/Post.js";

// 🟢 Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, quote } = req.body;
    const newPost = new Post({ title, quote, user: req.user._id });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // Default to 5 posts per page

    const skip = (page - 1) * limit; // Calculate the number of posts to skip

    const posts = await Post.find()
      .populate("user", "name email") // Populate user data
      .skip(skip)
      .limit(limit);
    
    const formattedPosts = posts.map((post) => ({
      ...post.toObject(),
      author: post.user
    }));
    formattedPosts.forEach((post) => delete post.user);

    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟠 Update a post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this post" });
    }

    // Proceed with update
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔴 Delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the logged-in user is the owner of the post
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this post" });
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

