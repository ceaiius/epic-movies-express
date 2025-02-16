import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// Create a comment
export const createComment = async (req, res) => {
    try {
      const { postId, text } = req.body;
      const author = req.user.id;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      const comment = new Comment({ post: postId, author, text });
      await comment.save();

      const populatedComment = await Comment.findById(comment._id).populate("author", "name avatar");
  
      res.status(201).json(populatedComment); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

// Get comments for a post
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the logged-in user is the author of the comment
    if (comment.author.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateComment = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
  
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      if (comment.author.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized to delete this comment" });
      }
  
      const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };