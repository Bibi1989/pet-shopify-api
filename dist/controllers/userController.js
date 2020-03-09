"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email, password, isSeller } = req.body;
    const error = validateUsers(name, phone, email, password);
    if (error.name || error.email || error.password) {
        return res.status(404).json({ error });
    }
    let user = yield userModel_1.default.findOne({ email });
    if (user)
        return res.status(404).json({ error: "Email taken, try another one" });
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    console.log(req.body);
    const bool = isSeller === "seller" ? true : false;
    try {
        const registerUser = {
            name,
            phone,
            email,
            password: hashedPassword,
            isSeller: bool
        };
        user = new userModel_1.default(registerUser);
        const { SECRET_KEY } = process.env;
        yield user.save();
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            phone: user.phone,
            email: user.email,
            name: user.name,
            isSeller: user.isSeller
        }, SECRET_KEY);
        res.header("x-auth", token);
        res.json({
            data: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                isSeller: user.isSeller
            },
            token
        });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const error = validateAuth(email, password);
    if (error.email || error.password) {
        return res.status(404).json({ error });
    }
    let user = yield userModel_1.default.findOne({ email });
    if (!user)
        return res.status(404).json({ error: "You have not register" });
    const validPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!validPassword)
        return res.status(404).json({ error: "Invalid password" });
    try {
        const { SECRET_KEY } = process.env;
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            isSeller: user.isSeller
        }, SECRET_KEY);
        res.header("x-auth", token);
        res.json({
            data: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                isSeller: user.isSeller
            },
            token
        });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
function validateUsers(name, phone, email, password) {
    const error = {
        name: "",
        phone: "",
        email: "",
        password: ""
    };
    if (name.trim() === "") {
        error.name = "name is empty";
    }
    if (phone.trim() === "") {
        error.phone = "Phone Number is empty";
    }
    else {
        if (phone.length < 4) {
            error.phone = "Phone number is less than 4 characters";
        }
    }
    if (email.trim() === "") {
        error.email = "Email is empty";
    }
    else {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(regex)) {
            error.email = "Email is not valid";
        }
    }
    if (password.trim() === "") {
        error.password = "Password is empty";
    }
    return error;
}
exports.getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const userProfile = yield userModel_1.default.findById(id);
        console.log(req.params.id);
        return res.json({ profile: userProfile });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
function validateAuth(email, password) {
    const error = {
        email: "",
        password: ""
    };
    if (email.trim() === "") {
        error.email = "Email is empty";
    }
    else {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(regex)) {
            error.email = "Email is not valid";
        }
    }
    if (password.trim() === "") {
        error.password = "Password is empty";
    }
    return error;
}
//# sourceMappingURL=userController.js.map