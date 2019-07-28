var User = require("./user")
var passport = require("passport")
function SignUp(req,res){
    if(req.body.password !== req.body.confirmPassword){
        res.render("signup",{validity : 0,Message : "PASSWORD IS NOT SAME"})
    }else{
        User.findOne({
            email : req.body.email
        },function(error,user){
            if(error){
                console.log(error)
                res.render("signup",{validity : 0,Message : "TRY AGAIN"})
            }else{
                if(user !== null){
                    res.render("signup",{validity : 0,Message : "EMAIL ALREADY TAKEN"})
                }else{
                    User.findOne({
                        username : req.body.username
                    },function(err,foundUsername){
                        if(err){
                            console.log(err)
                            res.render("signup",{validity : 0,Message : "TRY AGAIN"})
                        }else{
                            if(foundUsername !== null){
                                res.render("signup",{validity : 0,Message : "USERNAME ALREADY TAKEN"})
                            }else{
                                User.register({ username : req.body.username,email : req.body.email,goal : 0},req.body.password,function(error,newUser){
                                    if(error){
                                        console.log(error)
                                        res.render("signup",{validity : 0,Message : "PROBLEM WHILE SIGNING YOU"})
                                    }else{
                                        console.log(newUser)
                                        passport.authenticate("local");
                                        res.render("loggedIn",{id : newUser._id})
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }
}

module.exports = SignUp