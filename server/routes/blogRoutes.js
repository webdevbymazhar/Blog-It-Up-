const { createblog, getBlogs, getBlogById,blogByUser,blogsByCategory, deleteBlog, updateblog } = require("../controllers/blogControllers")
const {verifyToken} = require("../middlewares/blogMiddleware")

const router = require("express").Router()


router.post("/create-blog",verifyToken,createblog)
router.get("/get-blogs",getBlogs)
router.get("/get-blog/:id",getBlogById)
router.get("/get-blog-by-author/:author",blogByUser)
router.get("/get-blog-by-cat/:category",blogsByCategory)
router.delete("/delete-blog/:id",verifyToken,deleteBlog)
router.patch("/update-blog/:id",verifyToken,updateblog)





module.exports = router