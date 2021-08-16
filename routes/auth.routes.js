const { Router } = require("express");
const authController = require("../controller/auth.controller");

const authRouter = Router();

authRouter.get("/signup", authController.signupGet);
authRouter.post("/signup", authController.signupPost);
authRouter.get("/login", authController.loginGet);
authRouter.post("/login", authController.loginPost);
authRouter.get("/logout", authController.logoutGet);

authRouter.put("/signup", authController.signupPut);

module.exports = authRouter;
