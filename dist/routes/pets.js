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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var router = express_1.Router();
const animalsController_1 = require("../controllers/animalsController");
const cartControllers_1 = require("../controllers/cartControllers");
const multiparty = require("connect-multiparty");
const multipartyMiddleware = multiparty();
const userAuthentication_1 = require("../controllers/userAuthentication");
router.get("/animals", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const animals = yield animalsController_1.getPets();
    if (!animals)
        res.status(404).json({ error: "Something went wrong" });
    return res.json({ data: animals });
}));
router.get("/animals/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const animal = yield animalsController_1.getPet(id);
    if (!animal)
        res.status(404).json({ error: "Something went wrong" });
    return res.json({ data: animal });
}));
router.post("/animals", [userAuthentication_1.auth, multipartyMiddleware], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const animal = yield animalsController_1.createPets(req.body, req, res);
    if (!animal)
        res.status(404).json({ error: "Something went wrong" });
    return res.json({ data: animal });
}));
router.patch("/animals/:updateId", userAuthentication_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateId } = req.params;
    const animal = yield animalsController_1.updatePets(req.body, updateId);
    if (!animal)
        res.status(404).json({ error: "Something went wrong" });
    return res.json({ data: animal });
}));
router.get("/orders", userAuthentication_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield cartControllers_1.getCarts();
    return res.json({ data: carts });
}));
router.post("/orders", userAuthentication_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield cartControllers_1.createOrder(req.body, req, res);
    return res.json({ data: carts });
}));
router.delete("/orders/:deleteId", userAuthentication_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield cartControllers_1.deleteCart(req);
    return res.json({ data: carts });
}));
exports.default = router;
//# sourceMappingURL=pets.js.map