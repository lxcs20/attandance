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
exports.UpdateProfile = exports.MyAccount = exports.GetOne = exports.GetAll = exports.Delete = exports.ForgotPassword = exports.ChangePassword = exports.Update = exports.Login = exports.Register = void 0;
const base_servics_1 = require("../../service/base.servics");
const db_1 = require("../../config/db");
const private_1 = require("../../service/private");
class Register {
    constructor() { }
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.validateParams(params);
                if (validate != base_servics_1.Message.SUCCESS)
                    throw new Error(validate);
                const run = yield this.register();
                if (run != base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    validateParams(params) {
        const { firstname, lastname, phonenumber, password, email, profile } = params;
        const validate = (0, base_servics_1.Validator)({ firstname, lastname, phonenumber, password, email });
        if (validate != base_servics_1.Message.SUCCESS)
            return 'invalid paramiter: ' + validate;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.password = password;
        this.email = email;
        this.profile = profile || '';
        return base_servics_1.Message.SUCCESS;
    }
    register() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                const chckExit = yield db_1.UserEntity.findOne({
                    where: {
                        phonenumber: this.phonenumber
                    }
                });
                if (chckExit)
                    return resolve(base_servics_1.Message.PHONENUMBERAREEXIT);
                let data = {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    phonenumber: this.phonenumber,
                    password: null,
                    email: this.email,
                    profile: this.profile
                };
                data.password = yield (0, private_1.EncryptPassword)(this.password);
                let register = yield db_1.UserEntity.create(data);
                if (!register)
                    return resolve(base_servics_1.Message.FAILE);
                this.response.data = [];
                this.response.message = base_servics_1.Message.SUCCESS;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.Register = Register;
class Login {
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.validateParams(params);
                if (validate != base_servics_1.Message.SUCCESS)
                    throw new Error(validate);
                const run = yield this.login();
                if (run != base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    validateParams(params) {
        const { phonenumber, password } = params;
        const validate = (0, base_servics_1.Validator)({ phonenumber, password });
        if (validate != base_servics_1.Message.SUCCESS)
            return 'invalid paramiter: ' + validate;
        this.phonenumber = phonenumber;
        this.password = password;
        return base_servics_1.Message.SUCCESS;
    }
    login() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                let user = yield db_1.UserEntity.findOne({
                    where: {
                        phonenumber: this.phonenumber
                    }
                });
                if (!user)
                    return resolve(base_servics_1.Message.NOTFOUND);
                user = JSON.parse(JSON.stringify(user));
                const isMatch = yield (0, private_1.ComparePassword)(this.password, user.password);
                if (!isMatch)
                    return resolve(base_servics_1.Message.PASSINCORRECT);
                const playloaddata = {
                    uuid: user.uuid,
                    role: user.role
                };
                const token = yield (0, private_1.SignToken)(playloaddata);
                const userData = {
                    uuid: user.uuid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phonenumber: user.phonenumber,
                    email: user.email,
                    role: user.role,
                    profile: user.profile
                };
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = { token, user: userData };
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.Login = Login;
class Update {
    constructor(userId) {
        this.userId = userId;
    }
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.validateParams(params);
                if (validate != base_servics_1.Message.SUCCESS)
                    throw new Error(validate);
                const run = yield this.update();
                if (run != base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    validateParams(params) {
        const { firstname, lastname, profile } = params;
        const validate = (0, base_servics_1.Validator)({ firstname, lastname });
        if (validate != base_servics_1.Message.SUCCESS)
            return 'invalid paramiter: ' + validate;
        this.firstname = firstname;
        this.lastname = lastname;
        this.profile = profile || '';
        return base_servics_1.Message.SUCCESS;
    }
    update() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                let data = {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    profile: this.profile
                };
                let update = yield db_1.UserEntity.update(data, { where: { uuid: this.userId } });
                if (!update)
                    return resolve(base_servics_1.Message.FAILE);
                let user = yield db_1.UserEntity.findOne({
                    where: {
                        uuid: this.userId
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile']
                });
                user = JSON.parse(JSON.stringify(user));
                this.response.data = user;
                this.response.message = base_servics_1.Message.SUCCESS;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.Update = Update;
class ChangePassword {
    constructor(userId) {
        this.userId = userId;
    }
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.validateParams(params);
                if (validate != base_servics_1.Message.SUCCESS)
                    throw new Error(validate);
                const run = yield this.changePassword();
                if (run != base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    validateParams(params) {
        const { newPassword, oldPassword } = params;
        const validate = (0, base_servics_1.Validator)({ newPassword, oldPassword });
        if (validate != base_servics_1.Message.SUCCESS)
            return 'invalid paramiter: ' + validate;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        return base_servics_1.Message.SUCCESS;
    }
    changePassword() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                let user = yield db_1.UserEntity.findOne({
                    where: { uuid: this.userId }
                });
                if (!user)
                    return resolve(base_servics_1.Message.NOTFOUND + ' user');
                const isMatch = yield (0, private_1.ComparePassword)(this.oldPassword, user.password);
                if (!isMatch)
                    return resolve(base_servics_1.Message.PASSINCORRECT);
                const newPassword = yield (0, private_1.EncryptPassword)(this.newPassword);
                const upPass = yield db_1.UserEntity.update({ password: newPassword }, { where: { uuid: this.userId } });
                if (!upPass)
                    return resolve(base_servics_1.Message.FAILE);
                this.response.data = {};
                this.response.message = base_servics_1.Message.SUCCESS;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.ChangePassword = ChangePassword;
class ForgotPassword {
    constructor() { }
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.validateParams(params);
                if (validate != base_servics_1.Message.SUCCESS)
                    throw new Error(validate);
                const run = yield this.forgotPassword();
                if (run != base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    validateParams(params) {
        const { newPassword, phonenumber } = params;
        const validate = (0, base_servics_1.Validator)({ newPassword, phonenumber });
        if (validate != base_servics_1.Message.SUCCESS)
            return 'invalid paramiter: ' + validate;
        this.phonenumber = phonenumber;
        this.newPassword = newPassword;
        return base_servics_1.Message.SUCCESS;
    }
    forgotPassword() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                let user = yield db_1.UserEntity.findOne({
                    where: { phonenumber: this.phonenumber }
                });
                if (!user)
                    return resolve(base_servics_1.Message.NOTFOUND + ' user');
                const newPassword = yield (0, private_1.EncryptPassword)(this.newPassword);
                const upPass = yield db_1.UserEntity.update({ password: newPassword }, { where: { phonenumber: this.phonenumber } });
                if (!upPass)
                    return resolve(base_servics_1.Message.FAILE);
                this.response.data = {};
                this.response.message = base_servics_1.Message.SUCCESS;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.ForgotPassword = ForgotPassword;
class Delete {
    constructor(userId) {
        this.userId = userId;
    }
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const run = yield this.delete();
                if (run != base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    delete() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                let del = yield db_1.UserEntity.update({ isActive: false }, { where: { uuid: this.userId } });
                if (!del)
                    return resolve(base_servics_1.Message.NOTFOUND + ' user');
                this.response.data = {};
                this.response.message = base_servics_1.Message.SUCCESS;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.Delete = Delete;
class GetAll {
    constructor() { }
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const run = yield this.getAll();
                if (run != base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    getAll() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                let users = yield db_1.UserEntity.findAll({
                    where: {
                        isActive: true
                    }
                });
                if (!users)
                    return resolve(base_servics_1.Message.NOTFOUND + ' user');
                users = JSON.parse(JSON.stringify(users));
                this.response.data = users;
                this.response.message = base_servics_1.Message.SUCCESS;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetAll = GetAll;
class GetOne {
    constructor(userId) {
        this.userId = userId;
    }
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const run = yield this.getOne();
                if (run != base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    getOne() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                let users = yield db_1.UserEntity.findAll({
                    where: {
                        uuid: this.userId
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile']
                });
                if (!users)
                    return resolve(base_servics_1.Message.NOTFOUND + ' user');
                users = JSON.parse(JSON.stringify(users));
                this.response.data = users;
                this.response.message = base_servics_1.Message.SUCCESS;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetOne = GetOne;
class MyAccount {
    constructor(userId) {
        this.userId = userId;
    }
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const run = yield this.myAcount();
                if (run != base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    myAcount() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                let user = yield db_1.UserEntity.findOne({
                    where: {
                        uuid: this.userId
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile']
                });
                if (!user)
                    return resolve(base_servics_1.Message.NOTFOUND + ' user');
                user = JSON.parse(JSON.stringify(user));
                this.response.data = user;
                this.response.message = base_servics_1.Message.SUCCESS;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.MyAccount = MyAccount;
class UpdateProfile {
    constructor(userId) {
        this.userId = userId;
    }
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.ValidateParams(params);
                if (validate != base_servics_1.Message.SUCCESS)
                    throw new Error(validate);
                const run = yield this.porcess();
                if (run != base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    ValidateParams(params) {
        const { image } = params;
        const validate = (0, base_servics_1.Validator)({ image });
        if (validate != base_servics_1.Message.SUCCESS)
            return validate;
        this.image = image;
        return base_servics_1.Message.SUCCESS;
    }
    porcess() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    message: base_servics_1.Message.FAILE,
                    data: ''
                };
                const img = yield db_1.UserEntity.update({ profile: this.image }, { where: { uuid: this.userId } });
                if (!img)
                    return resolve(base_servics_1.Message.FAILE);
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = [];
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.UpdateProfile = UpdateProfile;
