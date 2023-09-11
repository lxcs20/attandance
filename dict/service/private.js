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
exports.VerifyToken = exports.SignToken = exports.ComparePassword = exports.EncryptPassword = exports.Decrypt = exports.Encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key_1 = require("../config/key");
const base_servics_1 = require("./base.servics");
const Encrypt = (data) => {
    return crypto_js_1.default.AES.encrypt(data, key_1.SECRET_KEY).toString();
};
exports.Encrypt = Encrypt;
const Decrypt = (encrypted) => {
    return crypto_js_1.default.AES.decrypt(encrypted, key_1.SECRET_KEY).toString(crypto_js_1.default.enc.Utf8);
};
exports.Decrypt = Decrypt;
const EncryptPassword = (password) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const enpass = crypto_js_1.default.AES.encrypt(password, key_1.SECRET_KEY).toString();
            resolve(enpass);
        }
        catch (error) {
            resolve(error.message);
        }
    }));
};
exports.EncryptPassword = EncryptPassword;
const ComparePassword = (password, enpass) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let isMatch = false;
            const decrypted = (0, exports.Decrypt)(enpass);
            if (password === decrypted) {
                isMatch = true;
            }
            resolve(isMatch);
        }
        catch (error) {
            resolve(error.message);
        }
    }));
};
exports.ComparePassword = ComparePassword;
const SignToken = (playloaddata) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let plaload = {
                id: (0, exports.Encrypt)(playloaddata.uuid),
                type: (0, exports.Encrypt)(playloaddata.role)
            };
            jsonwebtoken_1.default.sign(plaload, key_1.SECRET_KEY, { expiresIn: '30d' }, (error, encode) => {
                if (error)
                    return resolve(error.message);
                // console.log(`error jwt: `, error)
                resolve(encode);
            });
        }
        catch (error) {
            resolve(error.message);
        }
    }));
};
exports.SignToken = SignToken;
const VerifyToken = (token) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let playload;
            let response = {
                data: null,
                message: base_servics_1.Message.FAILE
            };
            jsonwebtoken_1.default.verify(token, key_1.SECRET_KEY, (error, decoded) => {
                if (error) {
                    response.data = error.message;
                    return resolve(response);
                }
                playload = decoded;
            });
            response.data = {
                uuid: (0, exports.Decrypt)(playload.id),
                role: (0, exports.Decrypt)(playload.type)
            };
            response.message = base_servics_1.Message.SUCCESS;
            resolve(response);
        }
        catch (error) {
            resolve(error.message);
        }
    }));
};
exports.VerifyToken = VerifyToken;
