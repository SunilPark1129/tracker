const { Router } = require("express");
const todosApi = require("./todos");
const authApi = require("./auth");
const userApi = require("./user");
const authenticate = require("../middlewares/authenticate");

const router = Router();

router.use("/todos", authenticate, todosApi);
router.use("/auth", authApi);
router.use("/user", userApi);

module.exports = router;
