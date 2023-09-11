import { Request, Response } from "express";
import { ResClient, Message } from "../service/base.servics";
import { ILeaveController } from "./base.controller";
import { GetAllLeaveReq, GetLeaveAll, GetLeaveByDate, GetLeaveByMonth, GetLeaveByYear, GetLeaveThreeMonth, LeaveByAdmin, LeaveRequest } from "./api/leave.api";


class LeaveController implements ILeaveController{

    public leaveRequest(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const userUuid = res.locals.user.uuid;
                const params = req.body;
                const func = new LeaveRequest(userUuid);
                func.init(params).then(run => {
                    // console.log(run)
                    if (run.message !== Message.SUCCESS) throw new Error(run as any)
                    return ResClient(run.data, Message.SUCCESS, 201, res)
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }

    public leaveByAdmin(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const params = req.body;
                const func = new LeaveByAdmin();
                func.init(params).then(run => {
                    if (run.message !== Message.SUCCESS) throw new Error(run as any)
                    return ResClient(run.data, Message.SUCCESS, 201, res)
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }

    public getLeaveAll(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const func = new GetLeaveAll();
                func.init().then(run => {
                    // console.log(run)
                    if (run.message !== Message.SUCCESS) throw new Error(run as any)
                    return ResClient(run.data, Message.SUCCESS, 200, res)
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }

    public getLeaveByDate(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const date = req.query.date;
                const func = new GetLeaveByDate(date);
                func.init().then(run => {
                    if (run.message !== Message.SUCCESS) throw new Error(run as any)
                    return ResClient(run.data, Message.SUCCESS, 200, res)
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }

    public getLeaveByMonth(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const params = req.query;
                const func = new GetLeaveByMonth();
                func.init(params).then(run => {
                    if (run.message !== Message.SUCCESS) throw new Error(run as any)
                    return ResClient(run.data, Message.SUCCESS, 200, res)
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }

    public getLeaveThreeMonth(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const params = req.query;
                const func = new GetLeaveThreeMonth();
                func.init(params).then(run => {
                    if (run.message !== Message.SUCCESS) throw new Error(run as any)
                    return ResClient(run.data, Message.SUCCESS, 200, res)
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }

    public getLeaveByYear(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const year = req.query.year as unknown as number;
                const func = new GetLeaveByYear(year);
                func.init().then(run => {
                    if (run.message !== Message.SUCCESS) throw new Error(run as any)
                    return ResClient(run.data, Message.SUCCESS, 200, res)
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }

    public getAllLeaveReq(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const func = new GetAllLeaveReq();
                func.init().then(run => {
                    if (run.message !== Message.SUCCESS) throw new Error(run as any)
                    return ResClient(run.data, Message.SUCCESS, 200, res)
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }
}

export default LeaveController


