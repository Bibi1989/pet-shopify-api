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
const animalModel_1 = __importDefault(require("../models/animalModel"));
exports.createPets = (body, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { name, breed, description, age, price, stock, location, image_url, phone } = body;
    const error = validatePets(name, breed, price, description, age, location);
    if (error.age)
        return { error: error.age };
    if (error.name)
        return { error: error.name };
    if (error.breed)
        return { error: error.breed };
    if (error.price)
        return { error: error.price };
    if (error.description)
        return { error: error.description };
    if (error.location)
        return { error: error.location };
    let animal = new animalModel_1.default({
        name,
        breed,
        price,
        description,
        age,
        stock,
        location,
        image_url,
        phone,
        image_id: id,
        seller_id: id
    });
    return yield animal.save();
});
exports.updatePets = (body, updateId) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, breed, description, age, price, stock, location } = body;
    const error = validatePets(name, breed, price, description, age, location);
    if (error.age)
        return { error: error.age };
    if (error.name)
        return { error: error.name };
    if (error.breed)
        return { error: error.breed };
    if (error.price)
        return { error: error.price };
    if (error.description)
        return { error: error.description };
    if (error.location)
        return { error: error.location };
    try {
        const updateObj = {
            name,
            breed,
            description,
            age,
            price,
            location,
            stock,
        };
        const animal = yield animalModel_1.default.findByIdAndUpdate(updateId, updateObj, {
            new: true
        });
        return animal;
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.getPets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animals = yield animalModel_1.default.find().sort({ createdAt: -1 });
        return animals;
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.getPet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animals = yield animalModel_1.default.findById(id);
        return animals;
    }
    catch (error) {
        return { error: error.message };
    }
});
function validatePets(name, breed, price, description, age, location) {
    const error = {
        name: "",
        price: "",
        breed: "",
        description: "",
        age: "",
        stock: 0,
        location: "",
        image_url: ""
    };
    if (name.trim() === "") {
        error.name = "Name is empty";
    }
    if (breed.trim() === "") {
        error.breed = "Breed is empty";
    }
    if (price.trim() === "") {
        error.price = "Price is empty";
    }
    if (description.trim() === "") {
        error.description = "Description is empty";
    }
    if (age.trim() === "") {
        error.age = "Age is empty";
    }
    if (location.trim() === "") {
        error.location = "Location is empty";
    }
    return error;
}
//# sourceMappingURL=animalsController.js.map