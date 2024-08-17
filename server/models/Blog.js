const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    categories:{
        type:Array,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
    
},{timestamps:true})

const BlogModel = mongoose.model("blog",blogSchema)
module.exports = BlogModel