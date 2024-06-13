const express = require("express")
const router = express.Router()

const {createBlog, updateBlog, deleteBlog } = require("../controllers/createBlog")
const { getBlog, getBlogById  } = require("../controllers/getBlog")
const { register, login, getAllUsers, getUserById, updateUserById } = require("../controllers/user")
const { auth, isAdmin } = require("../middleware/auth")

router.post("/createBlog", auth, isAdmin ,createBlog)
router.get("/", getBlog)
router.get("/users", auth, isAdmin, getAllUsers)
router.get("/user/:id", auth, getUserById)
router.put("/profile/:id", auth, updateUserById)
router.get("/getBlog/:id", getBlogById)
router.put("/updateBlog/:id", auth, isAdmin, updateBlog)
router.delete("/deleteBlog/:id", auth, isAdmin, deleteBlog)



router.post("/register", register)
router.post("/login", login)


module.exports = router;