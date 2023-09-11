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
const attendance_api_1 = require("./api/attendance.api");
class AttendanceController {
    rateOfAttend(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const func = new attendance_api_1.RateOfAttend();
                func.init().then(run => {
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(err => {
                    return (0, base_servics_1.ResClient)([], err.message, 400, res);
                });
            }
            catch (error) {
                return (0, base_servics_1.ResClient)([], error.message, 500, res);
            }
        }));
    }
    attendToday(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const date = req.query.date;
                const func = new attendance_api_1.AttendanceToday(date);
                func.init().then(run => {
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(err => {
                    return (0, base_servics_1.ResClient)([], err.message, 400, res);
                });
            }
            catch (error) {
                return (0, base_servics_1.ResClient)([], error.message, 500, res);
            }
        }));
    }
    rateOfAttendByMonth(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const func = new attendance_api_1.RateOfAttendByMonth();
                func.init(params).then(run => {
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(err => {
                    return (0, base_servics_1.ResClient)([], err.message, 400, res);
                });
            }
            catch (error) {
                return (0, base_servics_1.ResClient)([], error.message, 500, res);
            }
        }));
    }
    rateOfAttendThreeMonth(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const func = new attendance_api_1.RateOfAttendThreeMonth();
                func.init(params).then(run => {
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(err => {
                    return (0, base_servics_1.ResClient)([], err.message, 400, res);
                });
            }
            catch (error) {
                return (0, base_servics_1.ResClient)([], error.message, 500, res);
            }
        }));
    }
    rateOfAttendByYear(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const year = req.query.year;
                const func = new attendance_api_1.RateOfAttendByYear(year);
                func.init().then(run => {
                    if (run.message != base_servics_1.Message.SUCCESS)
                        throw new Error(run);
                    return (0, base_servics_1.ResClient)(run.data, base_servics_1.Message.SUCCESS, 200, res);
                }).catch(err => {
                    return (0, base_servics_1.ResClient)([], err.message, 400, res);
                });
            }
            catch (error) {
                return (0, base_servics_1.ResClient)([], error.message, 500, res);
            }
        }));
    }
}
exports.default = AttendanceController;
