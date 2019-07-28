var User = require("./user")

function Index(req,res){
    User.findById(req.user._id,function(error,user){
        if(error){
            console.log(error)
            res.render("signin",{validity : 0,Message : "PLEASE TRY AGAIN"})
        }else{
            res.render("index",{User : user, userId : user._id})
        }
    })
}
module.exports = Index