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
exports.GetAllLeaveReq = exports.GetLeaveByYear = exports.GetLeaveThreeMonth = exports.GetLeaveByMonth = exports.GetLeaveByDate = exports.GetLeaveAll = exports.LeaveByAdmin = exports.LeaveRequest = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
const base_servics_1 = require("../../service/base.servics");
class LeaveRequest {
    constructor(userUuid) {
        this.userUuid = userUuid;
    }
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.ValidateParams(params);
                if (validate !== base_servics_1.Message.SUCCESS)
                    throw new Error(validate);
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
    ValidateParams(params) {
        const { description, dateLeave, part } = params;
        const validate = (0, base_servics_1.Validator)({ description, dateLeave });
        if (validate != base_servics_1.Message.SUCCESS)
            return validate;
        this.description = description;
        this.dateLeave = dateLeave;
        this.part = part;
        return base_servics_1.Message.SUCCESS;
    }
    process() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    message: base_servics_1.Message.FAILE,
                    data: ''
                };
                const data = {
                    userUuid: this.userUuid,
                    check: false,
                    part: this.part,
                    date: this.dateLeave,
                    description: this.description
                };
                let leaveReq = yield db_1.AttandanceEntity.create(data);
                if (!leaveReq) {
                    return resolve(base_servics_1.Message.FAILE);
                }
                // leaveReq = JSON.parse(JSON.stringify(leaveReq));
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = leaveReq;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.LeaveRequest = LeaveRequest;
class LeaveByAdmin {
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.ValidateParams(params);
                if (validate !== base_servics_1.Message.SUCCESS)
                    throw new Error(validate);
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
    ValidateParams(params) {
        const { userid, description, dateLeave, part } = params;
        const validate = (0, base_servics_1.Validator)({ description, dateLeave });
        if (validate != base_servics_1.Message.SUCCESS)
            return validate;
        this.userUuid = userid;
        this.description = description;
        this.dateLeave = dateLeave;
        this.part = part;
        return base_servics_1.Message.SUCCESS;
    }
    process() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    message: base_servics_1.Message.FAILE,
                    data: ''
                };
                const data = {
                    userUuid: this.userUuid,
                    check: false,
                    part: this.part,
                    date: this.dateLeave,
                    description: this.description
                };
                let leaveReq = yield db_1.AttandanceEntity.create(data);
                if (!leaveReq) {
                    return resolve(base_servics_1.Message.FAILE);
                }
                // leaveReq = JSON.parse(JSON.stringify(leaveReq));
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = leaveReq;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.LeaveByAdmin = LeaveByAdmin;
class GetLeaveAll {
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
                let leaveReq = yield db_1.UserEntity.findAll({
                    where: { isActive: true },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: db_1.AttandanceEntity,
                            where: { check: false, isActive: true },
                            attributes: ['check', 'date', 'description', 'part', 'createdAt'],
                        }
                    ]
                });
                if (!leaveReq) {
                    return resolve(base_servics_1.Message.FAILE);
                }
                // leaveReq = JSON.parse(JSON.stringify(leaveReq));
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = leaveReq;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetLeaveAll = GetLeaveAll;
class GetLeaveByDate {
    constructor(date) {
        this.date = date;
    }
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const run = yield this.process();
                if (run !== base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                console.log(this.response);
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
                const date = new Date(`${this.date}`);
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
                let leave = yield db_1.UserEntity.findAll({
                    where: {
                        isActive: true,
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: db_1.AttandanceEntity,
                            where: {
                                check: false, isActive: true,
                                date: {
                                    [sequelize_1.Op.between]: [startdate, enddate]
                                }
                            },
                            attributes: ['check', 'date', 'description', 'part', 'createdAt'],
                        }
                    ]
                });
                if (!leave)
                    return resolve(base_servics_1.Message.FAILE);
                // leave = JSON.parse(JSON.stringify(leave));
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = leave;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetLeaveByDate = GetLeaveByDate;
class GetLeaveByMonth {
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.ValidateParams(params);
                if (validate !== base_servics_1.Message.SUCCESS)
                    throw new Error(validate);
                const run = yield this.process();
                if (run !== base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    ValidateParams(params) {
        const { year, month } = params;
        const validate = (0, base_servics_1.Validator)({ year, month });
        if (validate !== base_servics_1.Message.SUCCESS)
            return validate;
        this.year = year;
        this.month = month;
        return base_servics_1.Message.SUCCESS;
    }
    process() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    message: base_servics_1.Message.FAILE,
                    data: ''
                };
                const date = new Date(`${this.year}-${this.month}-01`);
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
                let leave = yield db_1.UserEntity.findAll({
                    where: {
                        isActive: true,
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: db_1.AttandanceEntity,
                            where: {
                                check: false, isActive: true,
                                date: {
                                    [sequelize_1.Op.between]: [startdate, enddate]
                                }
                            },
                            attributes: ['check', 'date', 'description', 'part', 'createdAt'],
                        }
                    ]
                });
                // leave = JSON.parse(JSON.stringify(leave));
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = leave;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetLeaveByMonth = GetLeaveByMonth;
class GetLeaveThreeMonth {
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.ValidateParams(params);
                if (validate !== base_servics_1.Message.SUCCESS)
                    throw new Error(validate);
                const run = yield this.process();
                if (run !== base_servics_1.Message.SUCCESS)
                    throw new Error(run);
                resolve(this.response);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
    ValidateParams(params) {
        const { year, quarter } = params;
        const validate = (0, base_servics_1.Validator)({ year, quarter });
        if (validate !== base_servics_1.Message.SUCCESS)
            return validate;
        let qt = (0, base_servics_1.Quarter)(quarter);
        if (qt === 1)
            return 'invalid quarter';
        this.year = year;
        this.quarter = qt;
        return base_servics_1.Message.SUCCESS;
    }
    process() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.response = {
                    message: base_servics_1.Message.FAILE,
                    data: ''
                };
                const date = new Date(this.year, this.quarter, 1);
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth() + 3, 0, 23, 59, 59, 999);
                let leave = yield db_1.UserEntity.findAll({
                    where: {
                        isActive: true,
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: db_1.AttandanceEntity,
                            where: {
                                check: false, isActive: true,
                                date: {
                                    [sequelize_1.Op.between]: [startdate, enddate]
                                }
                            },
                            attributes: ['check', 'date', 'description', 'part', 'createdAt'],
                        }
                    ]
                });
                if (!leave)
                    return resolve(base_servics_1.Message.FAILE);
                // leave = JSON.parse(JSON.stringify(leave));
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = leave;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetLeaveThreeMonth = GetLeaveThreeMonth;
class GetLeaveByYear {
    constructor(year) {
        this.year = year;
    }
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const run = yield this.process();
                if (!run)
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
                let startdate = new Date(this.year, 0, 1, 0, 0, 0, 0);
                let enddate = new Date(startdate.getFullYear(), 11, 0, 23, 59, 59, 999);
                let leaveYear = yield db_1.UserEntity.findAll({
                    where: {
                        isActive: true,
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: db_1.AttandanceEntity,
                            where: {
                                check: false, isActive: true,
                                date: {
                                    [sequelize_1.Op.between]: [startdate, enddate]
                                }
                            },
                            attributes: ['check', 'date', 'description', 'part', 'createdAt'],
                        }
                    ]
                });
                if (!leaveYear)
                    return resolve(base_servics_1.Message.FAILE);
                // leaveYear = JSON.parse(JSON.stringify(leaveYear));
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = leaveYear;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetLeaveByYear = GetLeaveByYear;
class GetAllLeaveReq {
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
                let startdate = new Date();
                let leaveReq = yield db_1.AttandanceEntity.findAll({
                    where: {
                        isActive: true,
                        check: false,
                        date: {
                            [sequelize_1.Op.gte]: startdate
                        }
                    },
                    attributes: ['date', 'description', 'part', 'check', 'createdAt'],
                    include: [
                        {
                            model: db_1.UserEntity,
                            where: { isActive: true },
                            attributes: ['uuid', 'firstname', 'lastname', 'profile']
                        }
                    ],
                });
                if (!leaveReq)
                    return resolve(base_servics_1.Message.FAILE);
                // leaveYear = JSON.parse(JSON.stringify(leaveYear));
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = leaveReq;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.GetAllLeaveReq = GetAllLeaveReq;
