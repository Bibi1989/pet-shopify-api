"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: new Date().toISOString()
    }
});
exports.default = mongoose_1.model("user", userSchema);
//# sourceMappingURL=userModel.js.map