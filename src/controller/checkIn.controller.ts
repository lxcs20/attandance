import { ResClient, Message } from "../service/base.servics";
import { CheckIn, GetCheckAll, GetCheckByDate, GetCheckByMonth, GetCheckByYear, GetCheckThreeMonth } from "./api/checkIn.api";
import { Request, Response } from "express";
import { ICheckInController } from "./base.controller";

class CheckInController implements ICheckInController{

    public checkin(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const userUuid = res.locals['user'].uuid;
                const func = new CheckIn(userUuid);
                func.init().then(run => {
                    if (run.message !== Message.SUCCESS) throw new Error(run as any)
                    return ResClient(run.data, Message.SUCCESS, 201, res)
                }).catch(err => {
                    return ResClient([], err.message, 400, res)
                })
            } catch (error) {
                return ResClient([], error.message, 500, res)
            }
        })
    };

    public getCheckAll(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const func = new GetCheckAll();
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
    };

    public getCheckByDate(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const date = req.query.date as unknown as string;
                const func = new GetCheckByDate(date);
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
    };

    public getCheckByMonth(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const params = req.query;
                const func = new GetCheckByMonth();
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
    };

    public getCheckThreeMonth(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const params = req.query;
                const func = new GetCheckThreeMonth();
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
    };

    public getCheckByYear(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const year = req.query.year as unknown as number;
                const func = new GetCheckByYear(year);
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
    };
}

export default CheckInController;