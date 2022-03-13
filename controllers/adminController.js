var User = require('../models/user')
const Question = require('../models/question');
const { compareSync } = require('bcryptjs');
const req = require('express/lib/request');
const axios = require("axios");

const Redis = require("ioredis");
const redis = new Redis();

exports.getAllusers = (req, res) => {
    const users = req.params.users;
    redis.get("searchtext", async(error, result) => {
        if (error) throw error;
        if (result !== null) {
          return res.status(200).send({
              message: `Data from the cache`,
              data: JSON.parse(result)
          })
        } else {
            const data = await User.find({});
            redis.set("searchtext", JSON.stringify(data), "ex", 15);
            return res.status(200).send({
                message: `Data from the server`,
                data: data
            });
        }
      })
}
  
  

exports.user = (req, res, next) => {
    const email = req.params.email;
    User.findOne({ email: email }, (err, result) => {
        if (!result) {
            //console.log(result);
            return res.status(404).json({ msg: "Not found!" });
        }
        res.status(200).send(result);
    });
}



exports.deleteUser = (req, res, next) => {
    var email = req.params.email
    User.deleteOne({ email: email }, (err, result) => {
        if (err) {
            //return res.status(404).json({ msg: "Somthing went wrong!!" });
            return res.status(404).send(err);

        }
        res.status(200).send(result)
        //res.json({ msg: "yes deleted user by admin" })
    })
}

exports.updateUser = (req, res) => {
    var email = req.params.email
    User.updateOne({ email: email }, { "$set": req.body }, (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(200).send(result);
    });
}

exports.addQuestion = (req, res) => {
    /* console.log(req.body)
    console.log(typeof(req.body))
    if({})
    {console.log("TRUE")}
    else {console.log("False")} */

    /*  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
         console.log('Object missing');
       } */

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).json({ "msg": "body is empty" })
    }
    else {
        Question.find({ quizid: req.body.quizid }, (err, q) => {
            console.log(req.body.quizid)
            if (err) {
                console.log(err);
                res.json({ msg: "some error!" });
            }
            else {
                var question = new Question({
                    quizid: req.body.quizid,
                    questionId: q.length + 1,
                    questionText: req.body.questionText,
                    answer: req.body.answer,
                    options: req.body.options
                })
                question.save((err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ msg: "some error! occured while creating" });
                    }
                    else {
                        //res.status(200).json({ message: "yes question added!!" })
                        res.status(201).send(result);
                    }
                })
            }
        })
    }
}

exports.getAllQuestion = (req, res) => {
    Question.find({}, (err, result) => {
        if (err) {
            return res.status(204).json({ msg: "some error!" });
            //return res.status(404).send(err);

        }
        else {
            res.status(200).send(result);
        }
    })
}

exports.deleteQuestion = (req, res) => {
    var id = req.params.id
    Question.deleteOne({ _id: id }, (err, result) => {
        if (err) {
            //return res.status(404).json({ msg: "Somthing went wrong!!" });
            return res.status(404).send(err);

        }
        res.status(200).send(result)
        //res.json({ msg: "yes deleted user by admin" })
    })
}


exports.updateQuestion = (req, res) => {
    var id = req.params.id
    Question.updateOne({ _id: id }, { "$set": req.body }, (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(200).send(result);
    });
}
