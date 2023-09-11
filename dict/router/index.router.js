"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const attendance_controller_1 = __importDefault(require("../controller/attendance.controller"));
const Leave_controller_1 = __importDefault(require("../controller/Leave.controller"));
const checkIn_controller_1 = __importDefault(require("../controller/checkIn.controller"));
const middleware_1 = require("../service/middleware");
class Routes {
    constructor(routes) {
        this.userController = new user_controller_1.default;
        this.attendanceController = new attendance_controller_1.default;
        this.leaveController = new Leave_controller_1.default;
        this.checkInController = new checkIn_controller_1.default;
        // ----------------user
        routes.post("/user/register", this.userController.register.bind(this.userController));
        routes.post("/user/login", this.userController.login.bind(this.userController));
        routes.post("/user/update", middleware_1.auth, this.userController.update.bind(this.userController));
        routes.post("/user/changepassword", middleware_1.auth, this.userController.changePassword.bind(this.userController));
        routes.post("/user/forgotpassword", this.userController.forgotPassword.bind(this.userController));
        routes.post("/user/delete/:userid", middleware_1.auth, middleware_1.admin, this.userController.delete.bind(this.userController));
        routes.post("/user/getall", middleware_1.auth, middleware_1.admin, this.userController.getAll.bind(this.userController));
        routes.post("/user/getone/:userid", middleware_1.auth, middleware_1.admin, this.userController.getOne.bind(this.userController));
        routes.post("/user/myaccount", middleware_1.auth, this.userController.myAccount.bind(this.userController));
        // -----------------checkIn
        routes.post("/checkin", middleware_1.auth, this.checkInController.checkin.bind(this.checkInController));
        routes.post("/checkin/getall", middleware_1.auth, middleware_1.admin, this.checkInController.getCheckAll.bind(this.checkInController));
        routes.post("/checkin/getbydate", middleware_1.auth, middleware_1.admin, this.checkInController.getCheckByDate.bind(this.checkInController));
        routes.post("/checkin/getbymonth", middleware_1.auth, middleware_1.admin, this.checkInController.getCheckByMonth.bind(this.checkInController));
        routes.post("/checkin/getbyyear", middleware_1.auth, middleware_1.admin, this.checkInController.getCheckByYear.bind(this.checkInController));
        routes.post("/checkin/quarter", middleware_1.auth, middleware_1.admin, this.checkInController.getCheckThreeMonth.bind(this.checkInController));
        // // ------------------leave
        routes.post('/leave', middleware_1.auth, this.leaveController.leaveRequest.bind(this.leaveController));
        routes.post('/leave/admin', middleware_1.auth, middleware_1.admin, this.leaveController.leaveByAdmin.bind(this.leaveController));
        routes.post('/leave/getall', middleware_1.auth, middleware_1.admin, this.leaveController.getLeaveAll.bind(this.leaveController));
        routes.post('/leave/getbydate', middleware_1.auth, middleware_1.admin, this.leaveController.getLeaveByDate.bind(this.leaveController));
        routes.post('/leave/getbymonth', middleware_1.auth, middleware_1.admin, this.leaveController.getLeaveByMonth.bind(this.leaveController));
        routes.post('/leave/getbyyear', middleware_1.auth, middleware_1.admin, this.leaveController.getLeaveByYear.bind(this.leaveController));
        routes.post('/leave/getbyquater', middleware_1.auth, middleware_1.admin, this.leaveController.getLeaveThreeMonth.bind(this.leaveController));
        routes.post('/leave/getleavereq', middleware_1.auth, middleware_1.admin, this.leaveController.getAllLeaveReq.bind(this.leaveController));
        // --------------------report
        routes.post('/report/all', middleware_1.auth, middleware_1.admin, this.attendanceController.rateOfAttend.bind(this.attendanceController));
        routes.post('/report/today', middleware_1.auth, middleware_1.admin, this.attendanceController.attendToday.bind(this.attendanceController));
        routes.post('/report/month', middleware_1.auth, middleware_1.admin, this.attendanceController.rateOfAttendByMonth.bind(this.attendanceController));
        routes.post('/report/threemonth', middleware_1.auth, middleware_1.admin, this.attendanceController.rateOfAttendThreeMonth.bind(this.attendanceController));
        routes.post('/report/year', middleware_1.auth, middleware_1.admin, this.attendanceController.rateOfAttendByYear.bind(this.attendanceController));
        // ------------------------------------------------------------------------------------
        // routes.post("/checkin", auth, this.attendanceController.checkin.bind(this.attendanceController));
        // routes.post("/checkin/getall", auth, admin, this.attendanceController.getCheckAll.bind(this.attendanceController));
        // routes.post("/checkin/getbydate", auth, admin, this.attendanceController.getCheckByDate.bind(this.attendanceController));
        // routes.post("/checkin/getbymonth", auth, admin, this.attendanceController.getCheckByMonth.bind(this.attendanceController));
        // routes.post("/checkin/getbyyear", auth, admin, this.attendanceController.getCheckByYear.bind(this.attendanceController));
        // routes.post("/checkin/quarter", auth, admin, this.attendanceController.getCheckThreeMonth.bind(this.attendanceController));
        // routes.post("/leave/leavebyadmin", auth, admin, this.leaveController.leaveByAdmin.bind(this.leaveController));
        // routes.post("/leave/bypart/:part", auth, this.leaveController.leave.bind(this.leaveController));
        // // routes.post("/leave/morning", auth, this.leaveController.leaveMorning.bind(this.leaveController));
        // // routes.post("/leave/afternoon", auth, this.leaveController.leaveAfternoon.bind(this.leaveController));
        // routes.post("/leave/getall", auth, admin, this.leaveController.getAll.bind(this.leaveController));
        // routes.post("/leave/getbydate/:date", auth, admin, this.leaveController.getByDate.bind(this.leaveController));
        // routes.post("/leave/getbymonth/:yyyy_mm", auth, admin, this.leaveController.getByMonth.bind(this.leaveController));
        // routes.post("/leave/getbyyear/:year", auth, admin, this.leaveController.getByYear.bind(this.leaveController));
        // routes.post("/leave/threemonth", auth, admin, this.leaveController.getThreeMonth.bind(this.leaveController));
        // routes.post("/leave/leavereq", auth, admin, this.leaveController.leaveRequest.bind(this.leaveController));
    }
}
exports.default = Routes;
