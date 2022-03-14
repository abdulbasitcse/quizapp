const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require("jsonwebtoken");
require("dotenv").config()

//Signup
exports.postSignup = (req, res, next) => {
  try {
    // Get User input
    // const { first_name, last_name, email, password } = req.body
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (!(email && password)) {
      res.status(400).send("All input is requred")
    }
    //check is user already exist
    //Validate if user exist in our database
    User.findOne({ email })
      .then(result => { //oldUser
        if (result) {
          return res.send({ "msg": "User Already Exist. Please Login" });
        }
        return bcrypt.hash(password, 12) //Encrypt user password
          .then(hashedPassword => {
            const user = new User({ // Create user in our database
              email: email.toLowerCase(), //sanitize : convert email to lowercase
              password: hashedPassword,
            });
            user.save()
            //Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.TOKEN_KEY,
              { expiresIn: "2h" }
            )
            //save user token
            user.token = token
            res.status(201).send({ "msg": "successfully Registerd", user });
          })

      })
  } catch (err) {
    console.log(err)
  }
}

//Login
exports.postLogin = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    //Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required")
    }
    //Validate if user exist in our database
    const user = User.findOne({ email: email })
      .then(result => {
        if (!result) {
          return res.send({ "msg": "User Already Exist. Please Signup" });
        }
        return (bcrypt.compare(password, result.password))
          .then(doMatch => {
            if (doMatch) {
              const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" }
              )
              //save user token
              result.token = token
              return res.status(200).send({ "msg": "Login successfully", result })
            }
            res.status(400).send({ "msg": "Incorrect Credentials" })
          })
      })
  } catch (err) {
    console.log(err)
  }
}