var mongoose = require("mongoose")
var subjectSchema = require("./subject")
var Subject = mongoose.model("Subject",subjectSchema)
var User = require("./user")
function AddSubject(req,res){
    var i = 0;
    User.findById(req.user["_id"],function(err,foundUser){
        if(err){
            console.log(err)
            res.render("index", { User : req.user , userId : req.user._id})
        }else{
            foundUser["subjects"].forEach(function(subject){
                if(subject["name"] === req.body.name){
                    console.log("same name")
                    i = 1;
                }
            })
            if(i === 1)
                res.render("newSubject",{userId : req.user['_id'],Message : "SUBJECT NAME ALREADY EXITS"})
            else{
                Subject.create({
                    name : req.body.name,
                    lecture : req.body.lecture,
                    tutorial : req.body.tut,
                    lab : req.body.lab,
                    attendedLecture : 0,
                    totalLecture : 0,
                    attendedTut : 0,
                    totalTut : 0,
                    attendedLab : 0,
                    totalLab : 0 ,
                    overallAttended : 0,
                    overall : 0
                },function(error,newSubject){
                    if(error){
                        console.log(error)
                        res.render("index", { User : foundUser , userId : foundUser._id})
                    }else{
                        foundUser["subjects"].push(newSubject)
                        foundUser.save(function(err,updatedUser){
                            if(err){
                                res.send(err)
                            }else{
                                res.redirect("/index")
                            }
                        })
                    }
                })
            }
        }
    })
}
module.exports = AddSubject