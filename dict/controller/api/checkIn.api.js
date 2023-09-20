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
exports.GetCheckByYear = exports.GetCheckThreeMonth = exports.GetCheckByMonth = exports.GetCheckByDate = exports.GetCheckAll = exports.CheckIn = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
const base_servics_1 = require("../../service/base.servics");
const sequelize_2 = __importDefault(require("sequelize"));
const key_1 = require("../../config/key");
const axios_1 = __importDefault(require("axios"));
class CheckIn {
    constructor(userUuid) {
        this.userUuid = userUuid;
    }
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const run = yield this.process();
                // console.log(run)
                if (run != base_servics_1.Message.SUCCESS) {
                    throw new Error(run);
                }
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    process() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    message: base_servics_1.Message.FAILE,
                    data: ''
                };
                const date = new Date();
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
                // console.log(`${startdate}, ${enddate}`)
                const checkEx = yield db_1.AttandanceEntity.findOne({
                    where: {
                        userUuid: this.userUuid,
                        createdAt: {
                            [sequelize_1.Op.between]: [startdate, enddate]
                        }
                    }
                });
                if (checkEx) {
                    return resolve(base_servics_1.Message.CHECKINSUCCESS);
                }
                const checkin = yield db_1.AttandanceEntity.create({
                    userUuid: this.userUuid, check: true, date: date
                });
                if (!checkin) {
                    return resolve(base_servics_1.Message.FAILE);
                }
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
exports.CheckIn = CheckIn;
class GetCheckAll {
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const run = yield this.process();
                if (run != base_servics_1.Message.SUCCESS) {
                    throw new Error(run);
                }
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    process() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    message: base_servics_1.Message.FAILE,
                    data: ''
                };
                let checkin = yield db_1.UserEntity.findAll({
                    where: { isActive: true },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: db_1.AttandanceEntity,
                            where: { isActive: true, check: true },
                            attributes: ['check', 'date', 'createdAt'],
                        }
                    ]
                });
                if (!checkin) {
                    return resolve(base_servics_1.Message.FAILE);
                }
                checkin = JSON.parse(JSON.stringify(checkin));
                const lockApi = `${key_1.LOCKAPI}/lockRecord/list`;
                const accessToken = "942ae953feb3f5ebbd00d014f12c3604";
                const pageNo = 1;
                const pageSize = 30;
                const qry = `?clientId=${key_1.LOCK_CLIENTID}&accessToken=${accessToken}&lockId=${key_1.LOCKID}&pageNo=1&pageSize=20&date=${Date.now()}`;
                const lockRecord = yield axios_1.default.get(`${lockApi}${qry}`);
                console.log(lockRecord.data);
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = [checkin, lockRecord.data];
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetCheckAll = GetCheckAll;
class GetCheckByDate {
    constructor(date) {
        this.date = date;
    }
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const run = yield this.process();
                if (run != base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    process() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                const date = new Date(this.date);
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
                let checkin = yield db_1.UserEntity.findAll({
                    where: {
                        isActive: true,
                    },
                    attributes: ['firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: db_1.AttandanceEntity,
                            where: {
                                date: {
                                    [sequelize_1.Op.between]: [startdate, enddate]
                                }
                            },
                            attributes: ['check', 'date', 'createdAt']
                        }
                    ]
                });
                if (!checkin)
                    return resolve(base_servics_1.Message.NOTFOUND);
                // checkin = JSON.parse(JSON.stringify(checkin));
                const lockApi = `${key_1.LOCKAPI}/lockRecord/list`;
                const accessToken = "942ae953feb3f5ebbd00d014f12c3604";
                const pageNo = 1;
                const pageSize = 30;
                const qry = `?clientId=${key_1.LOCK_CLIENTID}&accessToken=${accessToken}&lockId=${key_1.LOCKID}&startDate=${startdate.getTime()}&endDate${enddate.getTime()}&pageNo=1&pageSize=30&date=${Date.now()}`;
                // console.log('qry: ', qry)
                const lockRecord = yield axios_1.default.get(`${lockApi}${qry}`);
                // console.log(lockRecord.data)
                this.response.data = [checkin, lockRecord.data];
                this.response.message = base_servics_1.Message.SUCCESS;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetCheckByDate = GetCheckByDate;
class GetCheckByMonth {
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.validateParams(params);
                if (validate !== base_servics_1.Message.SUCCESS)
                    throw new Error(validate);
                const run = yield this.process();
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
        const { year, month } = params;
        const validate = (0, base_servics_1.Validator)({ year, month });
        if (validate !== base_servics_1.Message.SUCCESS) {
            return validate;
        }
        this.year = year;
        this.month = month;
        return base_servics_1.Message.SUCCESS;
    }
    process() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                const date = new Date(`${this.year}-${this.month}-01`);
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
                let checkin = yield db_1.UserEntity.findAll({
                    where: {
                        isActive: true
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile',
                        [sequelize_2.default.fn(("COUNT"), sequelize_2.default.col('user.uuid')), "count"]
                    ],
                    include: [
                        {
                            model: db_1.AttandanceEntity,
                            where: {
                                isActive: true,
                                date: {
                                    [sequelize_1.Op.between]: [startdate, enddate]
                                }
                            },
                            attributes: ['check', 'date', 'createdAt']
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                });
                if (!checkin)
                    return resolve(base_servics_1.Message.NOTFOUND);
                // checkin = JSON.parse(JSON.stringify(checkin));
                const lockApi = `${key_1.LOCKAPI}/lockRecord/list`;
                const accessToken = "942ae953feb3f5ebbd00d014f12c3604";
                const pageNo = 1;
                const pageSize = 30;
                const qry = `?clientId=${key_1.LOCK_CLIENTID}&accessToken=${accessToken}&lockId=${key_1.LOCKID}&startDate=${startdate.getTime()}&endDate${enddate.getTime()}&pageNo=1&pageSize=30&date=${Date.now()}`;
                // console.log('qry: ', qry)
                const lockRecord = yield axios_1.default.get(`${lockApi}${qry}`);
                this.response.data = [checkin, lockRecord.data];
                this.response.message = base_servics_1.Message.SUCCESS;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetCheckByMonth = GetCheckByMonth;
class GetCheckThreeMonth {
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.validateParams(params);
                if (validate !== base_servics_1.Message.SUCCESS)
                    throw new Error(validate);
                const run = yield this.process();
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
        const { year, quarter } = params;
        const validate = (0, base_servics_1.Validator)({ year, quarter });
        if (validate !== base_servics_1.Message.SUCCESS) {
            return validate;
        }
        let qt = (0, base_servics_1.Quarter)(quarter);
        if (qt === 1)
            return 'invalid quarter';
        this.year = year;
        this.month = qt;
        return base_servics_1.Message.SUCCESS;
    }
    process() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                const date = new Date(this.year, this.month, 1);
                let startdate = new Date(this.year, this.month, 1, 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth() + 3, 0, 23, 59, 59, 999);
                // console.log(`${startdate}, ${enddate}`)
                let checkin = yield db_1.UserEntity.findAll({
                    where: {
                        isActive: true
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: db_1.AttandanceEntity,
                            where: {
                                isActive: true,
                                date: {
                                    [sequelize_1.Op.between]: [startdate, enddate]
                                }
                            },
                            attributes: ['check', 'date', 'createdAt']
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                });
                if (!checkin)
                    return resolve(base_servics_1.Message.NOTFOUND);
                // checkin = JSON.parse(JSON.stringify(checkin));
                const lockApi = `${key_1.LOCKAPI}/lockRecord/list`;
                const accessToken = "942ae953feb3f5ebbd00d014f12c3604";
                const pageNo = 1;
                const pageSize = 30;
                const qry = `?clientId=${key_1.LOCK_CLIENTID}&accessToken=${accessToken}&lockId=${key_1.LOCKID}&startDate=${startdate.getTime()}&endDate${enddate.getTime()}&pageNo=1&pageSize=30&date=${Date.now()}`;
                // console.log('qry: ', qry)
                const lockRecord = yield axios_1.default.get(`${lockApi}${qry}`);
                this.response.data = [checkin, lockRecord.data];
                this.response.message = base_servics_1.Message.SUCCESS;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetCheckThreeMonth = GetCheckThreeMonth;
class GetCheckByYear {
    constructor(year) {
        this.year = year;
    }
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const run = yield this.process();
                if (run != base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    process() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    data: null,
                    message: base_servics_1.Message.FAILE
                };
                const date = new Date(this.year, 0, 1);
                let startdate = new Date(this.year, 0, 1, 0, 0, 0, 0);
                let enddate = new Date(this.year, 11, 0, 23, 59, 59, 999);
                // console.log(`st: ${startdate}, en: ${enddate}`)
                let checkin = yield db_1.UserEntity.findAll({
                    where: {
                        isActive: true
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: db_1.AttandanceEntity,
                            where: {
                                isActive: true,
                                date: {
                                    [sequelize_1.Op.between]: [startdate, enddate]
                                }
                            },
                            attributes: ['check', 'date', 'createdAt']
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                });
                if (!checkin)
                    return resolve(base_servics_1.Message.NOTFOUND);
                // checkin = JSON.parse(JSON.stringify(checkin));
                const lockApi = `${key_1.LOCKAPI}/lockRecord/list`;
                const accessToken = "942ae953feb3f5ebbd00d014f12c3604";
                const pageNo = 1;
                const pageSize = 30;
                const qry = `?clientId=${key_1.LOCK_CLIENTID}&accessToken=${accessToken}&lockId=${key_1.LOCKID}&startDate=${startdate.getTime()}&endDate${enddate.getTime()}&pageNo=1&pageSize=30&date=${Date.now()}`;
                // console.log('qry: ', qry)
                const lockRecord = yield axios_1.default.get(`${lockApi}${qry}`);
                this.response.data = [checkin, lockRecord.data];
                this.response.message = base_servics_1.Message.SUCCESS;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetCheckByYear = GetCheckByYear;
