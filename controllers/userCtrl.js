const Users = require("../models/userModel");
const Payments = require("../models/paymentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../models/sendMail");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

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
      const isMatch = await bcrypt.compare(password, user.password);
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
      if (!rf_token) return res.status(400).json({ message: "Please Sign In" });
      //validate  refresh token
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error)
          return res.status(400).json({ message: "Please Sign In again" });
        //create access token
        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
        //access success
        // return res.status(200).json({access_token})
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      //get email
      const { email } = req.body;
      //check email
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "This email does not exist" });
      //create access token
      const access_token = createAccessToken({ id: user.id });
      //send email
      const url = `${CLIENT_URL}/user/reset/${access_token}`;
      sendMail(email, url, "Reset Your Password");
      //success
      res.json({
        message: "Your password has been reset, Please Check Your Email",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  resetPassword: async function (req, res) {
    try {
      // get password
      const { password } = req.body;
      // hash password
      const passwordHash = await bcrypt.hash(password, 12);
      // update password
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );
      // reset password success
      res.status(200).json({ message: "Your password has been updated" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      //get infor form user -password
      const user = await Users.findById(req.user.id).select("-password");
      //return user
      res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      //get infor
      const { name, avatar } = req.body;
      console.log(req.body);
      //update user info
      await Users.findOneAndUpdate({ _id: req.user.id }, { name, avatar });
      // success
      res.status(200).json({ message: "Your profile has been updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      //clear cookies
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      //success
      return res.status(500).json({ message: "Signout Successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  googleLogin: async (req, res) => {
    try {
      //get token
      const { tokenId } = req.body;
      //verify the token id
      const client = new OAuth2(process.env.G_MAILING_SERVICE_CLIENT_ID);
      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.G_MAILING_SERVICE_CLIENT_ID,
      });
      //get data
      const { email_verified, email, name, picture } = verify.payload;
      //failded  verification
      if (!email_verified)
        return res.status(400).json({ message: "Email verification failed !" });
      // passed verification
      const user = await Users.findOne({ email });
      // 1. If user exists / sign in
      if (user) {
        //refresh_token
        const refresh_token = createRefreshToken({ id: user._id });
        // store cookie
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, //7days
        });
        return res
          .status(200)
          .json({ message: "Sign in with Google Successfully" });
      } else {
        //new user / create new user
        const password = email + process.env.G_MAILING_SERVICE_CLIENT_ID;
        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = Users({
          name,
          email,
          password: hashPassword,
          avatar: picture,
        });
        await newUser.save();
        // sign in the user
        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, //7days
        });
        //success
        res.status(200).json({ message: "Sign in with Google Successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user)
        return res.status(400).json({ message: "User does not exist." });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        { cart: req.body.cart }
      );
      return res.json({ message: "Added to cart" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  history: async (req, res) => {
    try {
      const history = await Payments.find({ user_id: req.user.id });
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // for Admin function
  getUsersAllInfor: async (req, res) => {
    try {
      console.log(req.user);
      //get all user
      const users = await Users.find().select("-password");

      res.json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body;

      await Users.findOneAndUpdate({ _id: req.prams.id }, { role });
      return res
        .status(200)
        .json({ message: "Update role for user is completed" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await Users.findOneAndUpdate(req.prams.id);
      return res.status(200).json({ message: "Delete user is completed" });
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
    expiresIn: "11m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userCtrl;
