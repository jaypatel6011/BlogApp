const Blog = require("../models/blog.model")


exports.createBlog = async (req, res) => {
    try {
        const { title,
            image,
            category,
            author,
            authorPic,
            published_date,
            content,
        } = req.body;

        const blog = await Blog.create({
            title,
            image,
            category,
            author,
            authorPic,
            published_date,
            content,
        })

        res.status(200).json({
            success:true,
            data:blog,
            message:"Blog create successfully"
        })

    } catch (err) {
        console.error("error : ",err)
        res.status(500).json({
            success:false,
            message:"Blog create internal error"
        })

    }
}




exports.updateBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const { title,
            image,
            category,
            author,
            authorPic,
            content,
        } = req.body;

        const blog = await Blog.findByIdAndUpdate({_id: id},{
            title,
            image,
            category,
            author,
            authorPic,
            content,
        })

        res.status(200).json({
            success:true,
            data:blog,
            message:"Updated successfully"
        })

    } catch (err) {
        console.error("error : ",err)
        res.status(500).json({
            success:false,
            message:"Updated Blog internal error"
        })

    }
}




exports.deleteBlog = async (req, res) => {
    try {
        const {id} = req.params;

        const blog = await Blog.findByIdAndDelete({_id: id})

        res.status(200).json({
            success:true,
            message:"Delete Blog successfully"
        })

    } catch (err) {
        console.error("error : ",err)
        res.status(500).json({
            success:false,
            message:"Delete Blog internal error"
        })

    }
}

