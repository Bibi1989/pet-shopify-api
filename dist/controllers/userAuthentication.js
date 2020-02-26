"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.auth = (req, res, next) => {
    const token = req.headers["x-auth"];
    if (!token) {
        throw Error("unauthorize user, access denied");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
//# sourceMappingURL=userAuthentication.js.map