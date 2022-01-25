const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../models/sendMail");

const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill in all fields." });
      }

      if (!validateEmail(email)) {
        return res
          .status(400)
          .json({ message: "This email is unavailable. !!!" });
      }

      const user = await Users.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ message: "This email is already exists. !!!" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }

      //hash password
      const passwordHash = await bcrypt.hash(password, 12);

      // create token
      const newUser = {
        name,
        email,
        password: passwordHash,
      };
      const activation_token = createActivaitonsToken(newUser);
      console.log(newUser);

      // sendMail from Admin thanhtung1482013@gmail.com
      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendMail(email, url, "Verify Your Email");

      //Register Successfully
      res.json({
        message:
          "Register  Successfully, Please Check Your Email  before starting ^_^",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      //get token
      const { activation_token } = req.body;
      // verify token
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const { name, email, password } = user;
      console.log(user);

      // check user
      const check = await Users.findOne({ email });
      if (check)
        return res
          .status(400)
          .json({ message: "This email is already register" });
      // add user to the đatabase
      const newUser = new Users({ name, email, password });
      await newUser.save();
      // activation success
      res.json({
        message: "Your account has been activated, you can now sign in ",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      //get credentials
      const { email, password } = req.body;
      //check email
      const user = await Users.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ message: "This Email is not registered in our system." });
      //check password
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch)
        return res.status(400).json({ message: "This password is incorrect." });
      //refresh token
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7days
      });
      // login success
      res.status(200).json({ message: "Login Successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAccessToken: async (req, res) => {
    try {
      //refresh token
      const rf_token = req.cookies.refreshtoken;
      if(!rf_token) return res.status(400).json({ message: "Please Sign In"})
      //validate  refresh token
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if(error) return res.status(400).json({message:"Please Sign In again"})
        //create access token
        const access_token = createAccessToken({id: user.id})
        res.json({access_token})
        //access success
        // return res.status(200).json({access_token})
      })
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivaitonsToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userCtrl;
