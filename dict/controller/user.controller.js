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
const base_servics_1 = require("../service/base.servics");
const user_api_1 = require("./api/user.api");
class UserController {
    constructor() { }
    register(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const func = new user_api_1.Register();
                func.init(params).then(run => {
                    console.log(`run register: `, run);
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 201, res);
                }).catch(error => {
                    return (0, base_servics_1.ResClient)([], error.message, 400, res);
                });
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    login(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const func = new user_api_1.Login();
                func.init(params).then(run => {
                    if (!run)
                        throw new Error(run);
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(error => {
                    return (0, base_servics_1.ResClient)([], error.message, 400, res);
                });
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    update(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const userId = res.locals['user'].uuid;
                const func = new user_api_1.Update(userId);
                func.init(params).then(run => {
                    if (!run)
                        throw new Error(run);
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(error => {
                    return (0, base_servics_1.ResClient)([], error.message, 400, res);
                });
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    changePassword(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const userId = res.locals['user'].uuid;
                const func = new user_api_1.ChangePassword(userId);
                func.init(params).then(run => {
                    if (!run)
                        throw new Error(run);
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(error => {
                    return (0, base_servics_1.ResClient)([], error.message, 400, res);
                });
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    forgotPassword(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const func = new user_api_1.ForgotPassword();
                func.init(params).then(run => {
                    if (!run)
                        throw new Error(run);
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(error => {
                    return (0, base_servics_1.ResClient)([], error.message, 400, res);
                });
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    delete(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userid;
                const func = new user_api_1.Delete(userId);
                func.init().then(run => {
                    if (!run)
                        throw new Error(run);
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(error => {
                    return (0, base_servics_1.ResClient)([], error.message, 400, res);
                });
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    getAll(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const func = new user_api_1.GetAll();
                func.init().then(run => {
                    if (!run)
                        throw new Error(run);
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(error => {
                    return (0, base_servics_1.ResClient)([], error.message, 400, res);
                });
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    getOne(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userid;
                const func = new user_api_1.GetOne(userId);
                func.init().then(run => {
                    if (!run)
                        throw new Error(run);
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(error => {
                    return (0, base_servics_1.ResClient)([], error.message, 400, res);
                });
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    myAccount(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = res.locals['user'].uuid;
                const func = new user_api_1.MyAccount(userId);
                func.init().then(run => {
                    if (!run)
                        throw new Error(run);
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(error => {
                    return (0, base_servics_1.ResClient)([], error.message, 400, res);
                });
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.default = UserController;
