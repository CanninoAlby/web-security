"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("not auth");
    }
    let secretKey = process.env.JWT_SECRET_KEY || "secret";
    const token = req.headers.authorization.split(" ")[1];
    try {
        const credential = jsonwebtoken_1.default.verify(token, secretKey);
        if (credential) {
            req.app.locals.credential = credential;
            return next();
        }
        return res.send("token invalid");
    }
    catch (error) {
        res.send(error);
    }
};
exports.auth = auth;
