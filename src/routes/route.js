const express = require('express');


const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const middleware = require("../middleware/auth")


router.post("/authors", authorController.createAuthor)

router.post("/blogs",middleware.Authentication, blogController.createBlog)

router.get("/blogs",middleware.Authentication, blogController.blogDetails)

router.put("/blogs/:blogId", middleware.Authentication, middleware.Authorisation, blogController.updateBlog)

router.delete("/blogs/:blogId", middleware.Authentication, middleware.Authorisation, blogController.deleteBlog)

router.delete("/blogs", blogController.deleteByQuery)

router.post("/login", authorController.login)


module.exports = router;