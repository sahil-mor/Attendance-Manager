var mongoose = require("mongoose")

var subjectSchema = new mongoose.Schema({
    name : String,
    lecture : String,
    tutorial : String,
    lab : String,
    attendedLecture : Number,
    totalLecture : Number,
    attendedTut : Number,
    totalTut : Number,
    attendedLab : Number,
    totalLab : Number,
    overallAttended : Number,
    overall : Number
})

module.exports = subjectSchema