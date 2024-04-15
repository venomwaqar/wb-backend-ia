const User = require("../models/user.model.js");
const Util = require("../helper/utils.js");

exports.register = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    let userResponse = await User.getUserByEmail(user.email);
    if (userResponse) {
      return res.status(500).send({
        message: "User with the same email already exists"
      });
    }
    let createUserResponse =  await User.create(user);
    return res.send(createUserResponse);
  }
  catch (ex)
  {
    console.trace(ex);
    return res.status(500).send({
      message: "Some error occurred"
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    let userResponse = await User.getUserByEmail(user.email);
    if (userResponse) {
      if (await Util.compareHashPassword(user.password, userResponse.password))
      {
        let userTokenModel = {
          "id": userResponse.id,
          "email": userResponse.email
        }
        const token = Util.generateAccessToken({user: userTokenModel})
        return res.json({accessToken: token})
      }
      else {
        return res.status(500).send({
          message: "Invalid username/password"
        });
      }
    }
    else
      return res.status(500).send({
        message: "Invalid username/password"
      });
  }
  catch (ex)
  {
    console.trace(ex);
    return res.status(500).send({
      message: "Invalid username/password"
    });
  }
};