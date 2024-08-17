const Blog = require("../models/Blog");

const createblog = async (req, res) => {
  try {
    const { title, categories, content, author, image } = req.body;

    if(!title || categories.length ==0 || !content || !author || !image){
      return res.status(400).json({
        success:false,
        message:"Please fill all fields"
      })
    }

    // Check if the blog title already exists
    const titleFound = await Blog.findOne({ title });
    if (titleFound) {
      return res.status(400).json({
        success: false,
        message: "Blog title must be unique!"
      });
    }

    // Create a new blog instance
    const newBlog = new Blog({
      title,
      image,
      categories,
      content,
      author
    });

    // Save the blog to the database
    await newBlog.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Blog added successfully",
      blog: newBlog
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    let response = await Blog.find();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    let id = req.params.id;
    let blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, error: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const blogByUser = async (req, res) => {
  try {
    let author = req.params.author;
    let response = await Blog.find({ author });
  
    if (response.length === 0) {
        return res.status(404).json({ success: false, error: 'No blogs found for this category' });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

const blogsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const blogs = await Blog.find({ categories: category });

        if (blogs.length === 0) {
            return res.status(404).json({ success: false, error: 'No blogs found for this category' });
        }

        return res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
};

const deleteBlog = async  (req,res) =>{
 try {
  let id = req.params.id
  let deletedBlog = await Blog.findByIdAndDelete(id)
  if(deleteBlog){
    res.status(200).json({
      success:true,
      message:"Blog Deleted Successfully"
    })
  }
 } catch (error) {
  res.status(400).json({
    success:false,
    error
  })
 }
}

const updateblog = async (req,res) =>{
try {
  let id = req.params.id
  let updatedblog = await Blog.findByIdAndUpdate(id,req.body,{new:true})
  if(updatedblog){{
    res.status(200).json(updatedblog)
  }
   
  }
} catch (error) {
  res.status(400).json({
    message:"Error updating blog",
    success:false
  })
  
}
}



module.exports = {
  createblog,
  getBlogs,
  getBlogById,
  blogByUser,
  blogsByCategory,
  deleteBlog,
  updateblog
};
