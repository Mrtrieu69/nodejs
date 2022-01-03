const mongoose = require("mongoose")
const slug = require("mongoose-slug-generator")
const mongooseDelete = require("mongoose-delete")
const AutoIncrement = require("mongoose-sequence")(mongoose)


const Schema = mongoose.Schema

const CourseSchema = new Schema({
    _id: {type: Number},
    name: {type: String, required:true, maxlength: 255},
    description: {type: String, maxlength: 255},
    image: {type: String, maxlength: 255},
    // Tạo slug từ name nhờ plugin mongoose, với giá trị duy nhất,
    // nếu trùng sẽ tạo thêm ký tự bất kì vào đuôi
    slug: {type: String, slug: "name", unique: true},
    videoId: {type: String, required:true},
    level: {type: String},
}, {
    _id: false,
    timestamps: true,
})


CourseSchema.query.sortable = function(req){
    if(req.query.hasOwnProperty("_sort")){
        const isValidType = ["asc", "desc"].includes(req.query.type)
        return this.sort({
            [req.query.column] : isValidType ? req.query.type : "desc"
        })
    }

    return this
}

// add pulugins
mongoose.plugin(slug)

CourseSchema.plugin(AutoIncrement)
CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: "all",
})

module.exports = mongoose.model("Course", CourseSchema)