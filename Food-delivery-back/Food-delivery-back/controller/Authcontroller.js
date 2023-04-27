var jwt = require("jsonwebtoken");
const Users = require("../models/user");
var bcrypt = require("bcryptjs");
const register = async (req, res, next) => {
  const data = req.body;
  if (data) {
    const oldUser = await Users.findOne({ email: data.email });
    if (oldUser) {
      return res.status(400).json({
        success: false,
        status: "hereglegch burtgeltei baina.nevterch orno uu",
      });
    }
    var hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    data.role == 0 ? (data.role_id = 1) : (data.role_id = data.role);
    data.created_date = Date("Y-m-d");
    data.last_activity = Date("Y-m-d h:m:s");
    email = data.email;
    const token = jwt.sign(
      {
        user_id: data._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    Users.create(data)
      .then((data) => {
        return res.status(200).json({
          success: true,
          data: data,
          token: token,
        });
      })
      .catch((err) => {
        res.status(400).json({ succes: false, message: err });
      });
  } else {
    return res.json({ error: "the inpud field is empthy" });
  }
};


const login = async(req, res, next)=>{
  try {
      const { email, password} = req.body;
      if(!(email && password)){
        res.status(400).json({success: false, status: "Utguudaa buren oruulna uu!"})
        return;
      }
      else{
        const user = await Users.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))){
          const token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h"
            }
          )
          res.status(200).json({success: true, status: "Amjilttai nevterlee", data: user, token: token})
          return;
        }
        else{
          res.status(400).json({
            succes: false,
            status: "Nuuts ug hoorondoo taarahgui baina"
          })
          return;
        }
      }
  }catch (err){
    console.log(err)
  }
}

module.exports = {
  register,
  login
};
