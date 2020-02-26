"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    stock: {
        type: Number
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users"
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "categories"
    },
    createdAt: {
        type: String,
        default: new Date().toISOString()
    }
});
exports.default = mongoose_1.model("order", cartSchema);
//# sourceMappingURL=cartModel.js.map