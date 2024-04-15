const Joi = require('joi'); 
const Util = require("./utils.js");

const validateModel = (schema, property) => { 
  return (req, res, next) => { 
    const { error } = schema.validate(req[property]); 
    const valid = error == null; 
    if (valid) { next(); } 
    else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',')
      console.log("error", message); 
      res.status(422).json({ error: message }) 
    }
  }
}

const authenticateRequest = () => { 
  return (req, res, next) => {
    let token = req.get("Authorization");
    if (token)
    {
      try {
        let formattedToken = token.replace("Bearer ", "");
        let decodedToken = Util.verifyJWT(formattedToken);
        if (decodedToken) {
          req["decodedToken"] = decodedToken;
          next();
        }
        else
          res.status(401).json({ 
            message: "Invalid credentials"
          });
      }
      catch (ex) {
        console.trace(ex);
        res.status(401).json({ 
          message: "Invalid credentials"
        });
      }
    }
    else { 
      res.status(401).json({ 
        message: "Invalid credentials"
       }) 
    }
  }
}

module.exports = {
  validateModel,
  authenticateRequest
};