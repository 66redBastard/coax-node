module.exports.signupGet = (req, res) => {
  res.render("signup");
};

module.exports.loginGet = (req, res) => {
  res.render("login");
};

module.exports.signupPost = (req, res) => {
  res.status(200).send("signup");
};
module.exports.loginPost = (req, res) => {
  res.status(200).send("signup");
};
