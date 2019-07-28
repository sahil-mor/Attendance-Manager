var mongoose = require("mongoose")
var subjectSchema = require("./subject")
var Subject = mongoose.model("Subject",subjectSchema) 

function subjectInfo(req,res){
    Subject.findById(req.params.id,function(error,foundSubject){
        if(error){
            res.send(error)
        }else{
            if(foundSubject !== null)
                res.render("subjectInfo",{data : foundSubject, userId : req.params.userId})
            else
                res.send("SUBJECT NOT AVAILABLE")
        }
    })
}
module.exports = subjectInfo