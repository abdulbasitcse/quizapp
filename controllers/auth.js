const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require("jsonwebtoken");
require("dotenv").config()


exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (!(email && password)) {
    res.status(400).send("All input is requred")
  }
  User.findOne({ email })
    .then(result => {
      if (result) {
        return res.send({ "msg": "Duplicate Email" });
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email,
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
          res.status(201).send({ user, "msg": "successfully inserted" });
        })

    })

}

exports.postLogin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const user =User.findOne({ email: email })
    .then(result => {
      if (result && (bcrypt.compare(password, result.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        )
        //save user token
        result.token = token
        return res.status(200).send({result, "msg": "Login successfully" })
        
      }
     /*  bcrypt.compare(password, result.password)
        .then(doMatch => {
          if (!doMatch) {
            return res.status(400).send({ "msg": "Incorrect Credentials" })
          } */
          //Create token
       /*  const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        )
        //save user token
        user.token = token */
        res.status(400).send({ "msg": "Incorrect Credentials" })
        })

}