var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")
subjectSchema = require("./subject")
var userSchema = new mongoose.Schema({
    email : String,
    username : String,
    password : String,
    goal : Number,
    subjects : [subjectSchema]
})

userSchema.plugin(passportLocalMongoose)

var User = mongoose.model("User",userSchema)
module.exports = User