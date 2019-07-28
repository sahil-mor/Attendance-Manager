var express = require("express");
var mongoose = require("mongoose");
var app = express();
var bodyParser = require("body-parser")
var methodOverride = require("method-override")
var passport = require("passport")
var LocalStratergy = require("passport-local")
var passportLocalMongoose = require("passport-local-mongoose")

app.use(methodOverride("_method"));
var subjectSchema = require("./models/subject")
var Subject = mongoose.model("Subject",subjectSchema)
var User = require("./models/user")
var Signup = require("./models/signup")
var SettingGoal = require("./models/settingGoal")
var addSubject = require("./models/addSubject")
var lectureAttended = require("./models/lectureAttended")
var lectureMissed = require("./models/lectureMissed")
var labAttended = require("./models/labAttended")
var labMissed = require("./models/labMissed")
var tutAttended = require("./models/tutAttended")
var tutMissed = require("./models/tutMissed")
var deleteSubject = require("./models/deleteSubject")
var Index = require("./models/index")
var subjectInfo = require("./models/subjectInfo")

app.use(require("express-session")({
    //3 things
    secret : "HELLO",
    resave : false,
    saveUninitialized : false
}))

app.use(function(req,res,next){
    res.locals.User = req.user
    next();
})

//2 things of passport initialising and passport session
app.use(passport.initialize())
app.use(passport.session())

//3 things of passport
passport.use(new LocalStratergy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

mongoose.connect("mongodb://localhost:27017/attenManager" , { useNewUrlParser: true })
app.use(bodyParser.urlencoded({extended : true}))
app.set("view engine","ejs")
app.use(express.static("public"))

app.get("/",function(req,res){
    res.render("home")
})

app.get("/signup",function(req,res){
    res.render("signup",{validity : 1})
})

app.post("/signup",Signup)

app.get("/signin",function(req,res){
    res.render("signin",{validity : 1})
})

app.post("/signin",passport.authenticate("local",{
    //now give success and failure redirect
    successRedirect: "index",
    failureRedirect : "wrongCredentials"
}),isLoggedIn,function(req,res){
})

app.get("/logout",function(req,res){
    req.logout();
    res.render("home")
})

app.patch("/settingGoal/:id",SettingGoal)
app.get("/index",isLoggedIn,Index)

app.get("/wrongCredentials",function(req,res){
    res.render("signin",{validity : 0,Message : "WRONG CREDENTIALS"})
})

app.get("/resetGoal/:id",isLoggedIn,function(req,res){
    res.render("resetGoal",{ id : req.params.id})
})

app.get("/user/:id/newSubject",isLoggedIn,function(req,res){
    res.render("newSubject",{userId : req.params.id,Message : "SO, WHATS YOUR NEW SUBJECT"})
})

app.patch("/addSubject/",isLoggedIn,addSubject)
app.get("/user/:userId/subjectInfo/:id",isLoggedIn,subjectInfo)
app.get("/user/:userId/subjectInfo/:id/lectureAttended",isLoggedIn,lectureAttended)
app.get("/user/:userId/subjectInfo/:id/lectureMissed",isLoggedIn,lectureMissed)
app.get("/user/:userId/subjectInfo/:id/tutAttended",isLoggedIn,tutAttended)
app.get("/user/:userId/subjectInfo/:id/tutMissed",isLoggedIn,tutMissed)
app.get("/user/:userId/subjectInfo/:id/labAttended",isLoggedIn,labAttended)
app.get("/user/:userId/subjectInfo/:id/labMissed",isLoggedIn,labMissed)
app.get("/user/:userId/deleteSubject/:subjectId",isLoggedIn,deleteSubject)
//check weather user is logged in or not
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.render("signin",{validity : 0,Message : "YOU MUST SIGN IN FIRST"})
    }
}

app.listen(1000,function(){
    console.log("SERVER LISTENING 1000");
})