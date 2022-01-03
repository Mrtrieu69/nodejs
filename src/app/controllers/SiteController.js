
const Course = require("../models/Course")
const { mutipleMongooseToObject } = require("../../util/mongoose")

class SiteController {
    // [GET] /
    index(req, res, next) {
        
        // Course.find({}, (err, courses, next) => {
        //     if(err){
        //         res.render('home', { courses })
        //     }
        //     else{
        //         next(err)
        //     }
        // })

        Course.find({})
            .then(courses => {
                res.render('home', { 
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(next)
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
