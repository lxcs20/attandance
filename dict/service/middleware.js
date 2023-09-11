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
exports.admin = exports.auth = void 0;
const base_servics_1 = require("./base.servics");
const private_1 = require("./private");
const base_model_1 = require("../model/base.model");
const db_1 = require("../config/db");
const auth = (req, res, next) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers['token'];
            // console.log(`token: `, token)
            if (!token)
                return (0, base_servics_1.ResClient)([], base_servics_1.Message.INVALID_TOKEN, 400, res);
            let verify = yield (0, private_1.VerifyToken)(token);
            if (verify.message != base_servics_1.Message.SUCCESS) {
                return (0, base_servics_1.ResClient)([], verify.data, 401, res);
            }
            const data = verify.data;
            let user = yield db_1.UserEntity.findOne({
                where: {
                    uuid: data.uuid
                },
                attributes: ['uuid', 'firstname', 'lastname', 'role']
            });
            user = JSON.parse(JSON.stringify(user));
            // console.log(`user middleware: `, user)
            const userdata = {
                uuid: user.uuid,
                role: user.role
            };
            res.locals['user'] = userdata;
            // console.log(`res user`,res.locals['user'].uuid)
            next();
        }
        catch (error) {
            (0, base_servics_1.ResClient)([], error.message, 500, res);
        }
    }));
};
exports.auth = auth;
const admin = (req, res, next) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = res.locals['user'].role;
            if (user !== base_model_1.Role.ADMIN) {
                return (0, base_servics_1.ResClient)([], base_servics_1.Message.UNAUTHORIZED, 401, res);
            }
            next();
        }
        catch (error) {
            resolve(error.message);
        }
    }));
};
exports.admin = admin;
