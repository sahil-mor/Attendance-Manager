var mongoose = require("mongoose")
var subjectSchema = require("./subject")
var Subject = mongoose.model("Subject",subjectSchema)
var User = require("./user")
var i,j,index;
function LabMissed(req,res){
    i = 0;
    j = 0;
    index = 0;
    Subject.findById(req.params.id,function(error,foundSubject){
        if(error){
            res.send(error)
        }else{
            foundSubject["totalLab"] += 1;
            foundSubject["overall"] +=1;
            foundSubject.save(function(error,updatedSubject){
                if(error){
                    res.send(error)
                }else{
                    console.log(updatedSubject)
                    User.findById(req.params.userId,function(err,foundUser){
                        if(err){
                            res.send(err)
                        }else{
                            index = foundUser["subjects"].findIndex(function(subject,index){
                                console.log("in loop i : " + i)
                                console.log("subject id : " + subject["_id"])
                                console.log("updated Subject id : " + updatedSubject["_id"])
                                if(subject["name"] == updatedSubject["name"]){
                                    console.log("in if")
                                    j = i
                                    index = i
                                }
                                i++;
                                return subject["_id"] == updatedSubject["_id"]
                            })
                            console.log(index + "  i :  " + i + " j: " + j)
                            foundUser["subjects"].splice(j,1)
                            foundUser["subjects"].push(updatedSubject)
                            foundUser.save(function(err,updatedUser){
                                if(err){
                                    res.send(err)
                                }else{
                                    console.log("================================")
                                    console.log("UPDATED USER" + updatedUser)
                                    res.redirect("/user/" + req.params.userId + "/subjectInfo/" + req.params.id)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
module.exports = LabMissed