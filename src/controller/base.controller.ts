import { Request, Response } from "express";

export interface IResponse {
    data: any;
    message: string;
}

export interface IUserController {
    register: (req: Request, res: Response) => any;
    login: (req: Request, res: Response) => any;
    update: (req: Request, res: Response) => any;
    changePassword: (req: Request, res: Response) => any;
    forgotPassword: (req: Request, res: Response) => any;
    delete: (req: Request, res: Response) => any;
    getAll: (req: Request, res: Response) => any;
    getOne: (req: Request, res: Response) => any;
    myAccount: (req: Request, res: Response) => any;
}

export interface ICheckInController {
    checkin: (req: Request, res: Response) => any;
    getCheckAll: (req: Request, res: Response) => any;
    getCheckByDate: (req: Request, res: Response) => any;
    getCheckByMonth: (req: Request, res: Response) => any;
    getCheckThreeMonth: (req: Request, res: Response) => any;
    getCheckByYear: (req: Request, res: Response) => any;
}

export interface ILeaveController {
    leaveRequest: (req: Request, res: Response) => any;
    leaveByAdmin: (req: Request, res: Response) => any;
    getLeaveAll: (req: Request, res: Response) => any;
    getLeaveByDate: (req: Request, res: Response) => any;
    getLeaveByMonth: (req: Request, res: Response) => any;
    getLeaveThreeMonth: (req: Request, res: Response) => any;
    getLeaveByYear: (req: Request, res: Response) => any;
    getAllLeaveReq: (req: Request, res: Response) => any;
}

export interface IAttendanceController {
    // check
    checkin: (req: Request, res: Response) => any;
    getCheckAll: (req: Request, res: Response) => any;
    getCheckByDate: (req: Request, res: Response) => any;
    getCheckByMonth: (req: Request, res: Response) => any;
    getCheckThreeMonth: (req: Request, res: Response) => any;
    getCheckByYear: (req: Request, res: Response) => any;
    // leave
    leaveRequest: (req: Request, res: Response) => any;
    leaveByAdmin: (req: Request, res: Response) => any;
    getLeaveAll: (req: Request, res: Response) => any;
    getLeaveByDate: (req: Request, res: Response) => any;
    getLeaveByMonth: (req: Request, res: Response) => any;
    getLeaveThreeMonth: (req: Request, res: Response) => any;
    getLeaveByYear: (req: Request, res: Response) => any;
    // overall
    rateOfAttend: (req: Request, res: Response) => any;
    rateOfAttendByMonth: (req: Request, res: Response) => any;
    rateOfAttendThreeMonth: (req: Request, res: Response) => any;
    rateOfAttendByYear: (req: Request, res: Response) => any;
}