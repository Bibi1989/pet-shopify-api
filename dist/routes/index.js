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
const userAuthentication_1 = require("../controllers/userAuthentication");
router.post("/animals", userAuthentication_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const animal = yield animalsController_1.createPets(req.body, req);
    if (!animal)
        res.status(404).json({ error: "Something went wrong" });
    return res.json({ data: animal });
}));
router.get("/animals", userAuthentication_1.auth, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const animals = yield animalsController_1.getPets();
    if (!animals)
        res.status(404).json({ error: "Something went wrong" });
    return res.json({ data: animals });
}));
exports.default = router;
//# sourceMappingURL=index.js.map