"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var router = express_1.Router();
const userController_1 = require("../controllers/userController");
router.get("profile/:id", userController_1.getProfile);
router.post("/login", userController_1.login);
router.post("/register", userController_1.register);
exports.default = router;
//# sourceMappingURL=users.js.map