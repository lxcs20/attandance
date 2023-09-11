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
exports.RateOfAttendByYear = exports.RateOfAttendThreeMonth = exports.RateOfAttendByMonth = exports.RateOfAttend = exports.AttendanceToday = void 0;
const db_1 = require("../../config/db");
const base_servics_1 = require("../../service/base.servics");
const sequelize_1 = require("sequelize");
class AttendanceToday {
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
                    message: base_servics_1.Message.FAILE,
                    data: ''
                };
                const date = new Date(this.date);
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
                let attend = yield db_1.UserEntity.findAll({
                    where: { isActive: true },
                    attributes: [
                        'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile'
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
                            attributes: [
                                'check', 'part', 'date', 'createdAt', 'description'
                            ]
                        }
                    ],
                    // group: ['user.uuid', 'attandances.uuid']
                });
                if (!attend) {
                    return resolve(base_servics_1.Message.FAILE);
                }
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = attend;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.AttendanceToday = AttendanceToday;
class RateOfAttend {
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
                    message: base_servics_1.Message.FAILE,
                    data: ''
                };
                let attend = yield db_1.UserEntity.findAll({
                    where: { isActive: true },
                    attributes: [
                        'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile'
                    ],
                    include: [
                        {
                            model: db_1.AttandanceEntity,
                            where: { isActive: true },
                            attributes: [
                                'check', 'part', 'date', 'createdAt', 'description'
                            ]
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                });
                if (!attend) {
                    return resolve(base_servics_1.Message.FAILE);
                }
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = attend;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.RateOfAttend = RateOfAttend;
class RateOfAttendByMonth {
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.ValidateParams(params);
                if (validate != base_servics_1.Message.SUCCESS)
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
                const date = new Date(this.year, this.month, 1);
                let startdate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth(), 0, 23, 59, 59, 999);
                let attend = yield db_1.UserEntity.findAll({
                    where: {
                        isActive: true,
                    },
                    attributes: [
                        'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile'
                    ],
                    include: [
                        {
                            model: db_1.AttandanceEntity,
                            where: {
                                isActive: true,
                                date: { [sequelize_1.Op.between]: [startdate, enddate] }
                            },
                            attributes: [
                                'check', 'part', 'date', 'createdAt', 'description'
                            ]
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                });
                if (!attend) {
                    return resolve(base_servics_1.Message.FAILE);
                }
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = attend;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.RateOfAttendByMonth = RateOfAttendByMonth;
class RateOfAttendThreeMonth {
    init(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = this.ValidateParams(params);
                if (validate != base_servics_1.Message.SUCCESS)
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
                let attend = yield db_1.UserEntity.findAll({
                    where: {
                        isActive: true,
                    },
                    attributes: [
                        'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile'
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
                            attributes: [
                                'check', 'part', 'date', 'createdAt', 'description'
                            ]
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                });
                if (!attend) {
                    return resolve(base_servics_1.Message.FAILE);
                }
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = attend;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.RateOfAttendThreeMonth = RateOfAttendThreeMonth;
class RateOfAttendByYear {
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
                    message: base_servics_1.Message.FAILE,
                    data: ''
                };
                const date = new Date(this.year, 0, 1);
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), 11, 0, 23, 59, 59, 999);
                let attend = yield db_1.UserEntity.findAll({
                    where: {
                        isActive: true,
                    },
                    attributes: [
                        'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile'
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
                            attributes: [
                                'check', 'part', 'date', 'createdAt', 'description'
                            ]
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                });
                if (!attend) {
                    return resolve(base_servics_1.Message.FAILE);
                }
                this.response.message = base_servics_1.Message.SUCCESS;
                this.response.data = attend;
                resolve(base_servics_1.Message.SUCCESS);
            }
            catch (error) {
                resolve(error.message);
            }
        }));
    }
}
exports.RateOfAttendByYear = RateOfAttendByYear;
