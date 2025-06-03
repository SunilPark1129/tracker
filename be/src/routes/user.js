const { Router } = require("express");
const userController = require("../controllers/user.controller");
const authenticate = require("../middlewares/authenticate");

const router = Router();

router.post("/register", userController.register);
router.get("/", authenticate, userController.getUser);

module.exports = router;
