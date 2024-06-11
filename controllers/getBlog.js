const Blog = require("../models/blog.model")


exports.getBlog = async (req, res) => {
    try {
        
        const blog = await Blog.find({})

        res.status(200).json({
            success:true,
            data:blog,
            message:"fetched All Blog successfully"
        })

    } catch (err) {
        console.error("error : ",err)
        res.status(500).json({
            success:false,
            message:"fetched all Blog internal error"
        })

    }
}




exports.getBlogById = async (req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findById({_id:id})

        res.status(200).json({
            success:true,
            data:blog,
            message:"fetched Blog using ID successfully"
        })

    } catch (err) {
        console.error("error : ",err)
        res.status(500).json({
            success:false,
            message:"fetched Blog by id internal error"
        })

    }
}