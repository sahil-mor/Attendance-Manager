var User = require("./user")
function SettingGoal(req,res){
    User.findByIdAndUpdate(req.params.id,{ $set : {goal : req.body.goal}  } , { upsert : true , new : true} ,function(error,updateUser){
        if(error){
            console.log(error)
            res.render("loggedIn")
        }else{
            res.redirect("/signin",)
        }
    })
}
module.exports = SettingGoal