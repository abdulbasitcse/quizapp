const bcrypt = require('bcryptjs');
const User = require('../models/user');


exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(result => {
      if (result) {
        return res.send({ "msg": "Duplicate Email" });
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
          });
          user.save();
          res.status(201).send({ "msg": "successfully inserted" });
        })

    })

}

exports.postLogin = (req, res, next) =>{
  const email = req.body.email
  console.log(req.body.email)
  const password = req.body.password
  User.findOne({email:email})
  .then(result =>{
    if(!result){
      return res.send({"msg":"No User exist with this email"})
    }
    bcrypt
    .compare(password, result.password)
    .then(doMatch => {
      if (!doMatch){
        return res.send({"msg":"Incorrect password"})
      }
      res.send({"msg":"Login successfully"})
    })
  })
  
}