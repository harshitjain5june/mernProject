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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../models/users");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
exports.router = router;
const jwtSecret = "HelloIamA#SoftwareEngineer";
router.post('/createuser', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 5 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const encryptedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
    try {
        yield users_1.userSchema.create({
            name: req.body.name,
            password: encryptedPassword,
            location: req.body.location,
            email: req.body.email
        });
        res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
}));
router.post('/login', (0, express_validator_1.body)('email').isEmail(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    try {
        const email = req.body.email;
        const userData = yield users_1.userSchema.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }
        const passCompare = yield bcrypt_1.default.compare(req.body.password, userData.password);
        if (!passCompare) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }
        const jwtData = {
            user: {
                id: userData.id
            }
        };
        const authToken = jsonwebtoken_1.default.sign(jwtData, jwtSecret);
        return res.json({ success: true, authToken: authToken });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ errors: error });
    }
}));
module.exports = router;
