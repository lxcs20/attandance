import { Message, ResClient } from "../service/base.servics";
import { Request, Response } from "express";
import { IAttendanceController } from "./base.controller";
import {RateOfAttend, RateOfAttendByMonth, RateOfAttendThreeMonth, RateOfAttendByYear, AttendanceToday
} from "./api/attendance.api";


class AttendanceController { // implement IAttendanceController

    public rateOfAttend(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const func = new RateOfAttend();
                func.init().then(run => {
                    if (run.message != Message.SUCCESS) throw new Error(run as any);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }

    public attendToday(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const date = req.query.date as unknown as string;
                const func = new AttendanceToday(date);
                func.init().then(run => {
                    if (run.message != Message.SUCCESS) throw new Error(run as any);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }

    public rateOfAttendByMonth(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const params = req.query;
                const func = new RateOfAttendByMonth();
                func.init(params).then(run => {
                    if (run.message != Message.SUCCESS) throw new Error(run as any);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }

    public rateOfAttendThreeMonth(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const params = req.query;
                const func = new RateOfAttendThreeMonth();
                func.init(params).then(run => {
                    if (run.message != Message.SUCCESS) throw new Error(run as any);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }

    public rateOfAttendByYear(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const year = req.query.year as unknown as number;
                const func = new RateOfAttendByYear(year);
                func.init().then(run => {
                    if (run.message != Message.SUCCESS) throw new Error(run as any);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    }
}

export default AttendanceController;