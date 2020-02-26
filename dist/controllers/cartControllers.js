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
const cartModel_1 = __importDefault(require("../models/cartModel"));
exports.createOrder = (body, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    //   console.log(id)
    const { name, breed, description, price, image_url, category_id, user_id } = body;
    console.log({ name: body.name, breed, price });
    try {
        let cart = new cartModel_1.default({
            name,
            breed,
            price,
            description,
            image_url,
            category_id: category_id,
            user_id
        });
        return yield cart.save();
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.getCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield cartModel_1.default.find().sort({ createdAt: -1 });
        return carts;
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.getCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cartModel_1.default.findById(id);
        return cart;
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.deleteCart = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleteId } = req.params;
    try {
        yield cartModel_1.default.findByIdAndDelete(deleteId);
        return "Successfully deleted";
    }
    catch (error) {
        return { error: error.message };
    }
});
//# sourceMappingURL=cartControllers.js.map