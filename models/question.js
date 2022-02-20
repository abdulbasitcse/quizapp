var mongoose = require('mongoose')

//const Schema = mongoose.Schema;

var questionSchema = new mongoose.Schema({
    quizid: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    questionText:{
        type: String, 
        required: true
    },
    answer: {
        type: Number,
        required: true
    },
    options:{
        type  :Array,
        default:[],
        required: true
    },
    explanation:{
        type: String,
        default: ""
      }
    
},
{
    timestamps: true
})
module.exports = mongoose.model('question',questionSchema)

