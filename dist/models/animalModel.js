"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// const categorySchema = new Schema({
//   categoryName: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: String,
//     default: new Date().toISOString()
//   }
// });
const petSchema = new mongoose_1.Schema({
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
    age: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    image_id: {
        type: String,
    },
    seller_id: {
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
    createdAt: {
        type: String,
        default: new Date().toISOString()
    }
});
exports.default = mongoose_1.model("category", petSchema);
//# sourceMappingURL=animalModel.js.map