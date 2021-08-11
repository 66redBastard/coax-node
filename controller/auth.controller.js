require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secretToken = process.env.JWT_SECRET;

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.signupGet = (req, res) => {
  res.render("signup");
};

module.exports.loginGet = (req, res) => {
  res.render("login");
};

module.exports.signupPost = async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    console.log(password, email, first_name, last_name);

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, secretToken, {
      expiresIn: "6h",
    });
    // save user token
    user.token = token;

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.loginPost = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, secretToken, {
        expiresIn: "6h",
      });

      // save user token
      user.token = token;
      // user

      return res
        .cookie("jwt", token, { maxAge: 1000 * 60 * 60 })
        .status(200)
        .json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logoutGet = (req, res) => {
  res.cookie("jwt", "", { expiresIn: 1 });
  res.redirect("/");
};
