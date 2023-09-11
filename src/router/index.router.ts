import UserController from "../controller/user.controller";
import AttendanceController from "../controller/attendance.controller";
import LeaveController from "../controller/Leave.controller";
import CheckInController from "../controller/checkIn.controller";
import { Router } from "express";
import { auth, admin } from "../service/middleware";

class Routes {

    private userController: UserController;
    private attendanceController: AttendanceController;
    private leaveController: LeaveController;
    private checkInController: CheckInController;

    constructor(routes: Router) {
        this.userController = new UserController;
        this.attendanceController = new AttendanceController;
        this.leaveController = new LeaveController;
        this.checkInController = new CheckInController;


        // ----------------user

        routes.post("/user/register", this.userController.register.bind(this.userController));
        routes.post("/user/login", this.userController.login.bind(this.userController));
        routes.post("/user/update", auth, this.userController.update.bind(this.userController));
        routes.post("/user/changepassword", auth, this.userController.changePassword.bind(this.userController));
        routes.post("/user/forgotpassword", this.userController.forgotPassword.bind(this.userController));
        routes.post("/user/delete/:userid", auth, admin, this.userController.delete.bind(this.userController));
        routes.post("/user/getall", auth, admin, this.userController.getAll.bind(this.userController));
        routes.post("/user/getone/:userid", auth, admin, this.userController.getOne.bind(this.userController));
        routes.post("/user/myaccount", auth, this.userController.myAccount.bind(this.userController));

        // -----------------checkIn

        routes.post("/checkin", auth, this.checkInController.checkin.bind(this.checkInController));
        routes.post("/checkin/getall", auth, admin, this.checkInController.getCheckAll.bind(this.checkInController));
        routes.post("/checkin/getbydate", auth, admin, this.checkInController.getCheckByDate.bind(this.checkInController));
        routes.post("/checkin/getbymonth", auth, admin, this.checkInController.getCheckByMonth.bind(this.checkInController));
        routes.post("/checkin/getbyyear", auth, admin, this.checkInController.getCheckByYear.bind(this.checkInController));
        routes.post("/checkin/quarter", auth, admin, this.checkInController.getCheckThreeMonth.bind(this.checkInController));

        
        // // ------------------leave
        
        routes.post('/leave', auth, this.leaveController.leaveRequest.bind(this.leaveController));
        routes.post('/leave/admin', auth, admin, this.leaveController.leaveByAdmin.bind(this.leaveController));
        routes.post('/leave/getall', auth, admin, this.leaveController.getLeaveAll.bind(this.leaveController));
        routes.post('/leave/getbydate', auth, admin, this.leaveController.getLeaveByDate.bind(this.leaveController));
        routes.post('/leave/getbymonth', auth, admin, this.leaveController.getLeaveByMonth.bind(this.leaveController));
        routes.post('/leave/getbyyear', auth, admin, this.leaveController.getLeaveByYear.bind(this.leaveController));
        routes.post('/leave/getbyquater', auth, admin, this.leaveController.getLeaveThreeMonth.bind(this.leaveController));
        routes.post('/leave/getleavereq', auth, admin, this.leaveController.getAllLeaveReq.bind(this.leaveController));
        
        // --------------------report
        routes.post('/report/all', auth, admin, this.attendanceController.rateOfAttend.bind(this.attendanceController));
        routes.post('/report/today', auth, admin, this.attendanceController.attendToday.bind(this.attendanceController));
        routes.post('/report/month', auth, admin, this.attendanceController.rateOfAttendByMonth.bind(this.attendanceController));
        routes.post('/report/threemonth', auth, admin, this.attendanceController.rateOfAttendThreeMonth.bind(this.attendanceController));
        routes.post('/report/year', auth, admin, this.attendanceController.rateOfAttendByYear.bind(this.attendanceController));
        
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

export default Routes;