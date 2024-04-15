const sql = require("./db.js");
const bcrypt = require("bcrypt")

const User = function(user) {
  this.email = user.email;
  this.password = user.password;
};

User.create = async (newUser) => {
  const hashedPassword = await bcrypt.hash(newUser.password, 10)
  newUser.password = hashedPassword;
  
  const query = sql.format("INSERT INTO users SET ?", [newUser]);
  let [res] = await sql.execute(query);
  
  console.log("created user: ", { id: res.insertId, ...newUser });
  return { 
    id: res.insertId, 
    message: "User has been created" 
  };
};

User.getUserByEmail = async (email) => {
  let user = null;
  const query = `SELECT id, password from users WHERE email = '${email}'`;
  const [response] = await sql.execute(query);
  if (response.length)
    user = response[0]

  return user
};

module.exports = User;
