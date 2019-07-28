var mongoose = require("mongoose")
var subjectSchema = require("./subject")
var Subject = mongoose.model("Subject",subjectSchema)
var User = require("./user")
function deleteSubject(req,res){
    var i,j,index;
    i = 0;
    j = 0;
    index = 0;
    Subject.findById(req.params.subjectId,function(err,foundSubject){
        if(err){
            res.send(err)
        }else{
            User.findById(req.params.userId,function(err,foundUser){
                if(err){
                    res.send(err)
                }else{
                    if(foundUser !== null){
                        index = foundUser["subjects"].findIndex(function(subject){
                            if(subject['name'] == foundSubject["name"]){
                                j = i;
                            }
                            i++;
                        })
                        foundUser["subjects"].splice(j,1);
                        foundUser.save(function(error,updatedUser){
                            if(error){
                                res.send(error)
                            }else{
                                console.log(updatedUser)
                                Subject.findByIdAndRemove(req.params.subjectId,function(err){
                                    if(err){
                                        res.send(err)
                                    }else{
                                        console.log("SUBJECT IS DELETED")
                                        res.redirect("/index")
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    })
    
}

module.exports = deleteSubject