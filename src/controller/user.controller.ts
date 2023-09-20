import { ResClient, Message } from "../service/base.servics";
import { ChangePassword, Delete, ForgotPassword, GetAll, GetOne, Login, MyAccount, Register, Update } from "./api/user.api";
import { IUserController } from "./base.controller";
import { Request, Response } from "express";

class UserController implements IUserController {

    constructor() { }

    public register(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const params = req.body;
                const func = new Register();
                func.init(params).then(run => {
                    // console.log(`run register: `, run)
                    if (run.message != Message.SUCCESS) throw new Error(run);
                    return ResClient(run.data, Message.SUCCESS, 201, res);
                }).catch(error => {
                    return ResClient([], error.message, 400, res);
                })
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    public login(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const params = req.body;
                const func = new Login();
                func.init(params).then(run => {
                    if (!run) throw new Error(run);
                    if (run.message != Message.SUCCESS) throw new Error(run);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(error => {
                    return ResClient([], error.message, 400, res);
                })
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    public update(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const params = req.body;
                const userId = res.locals['user'].uuid;
                const func = new Update(userId);
                func.init(params).then(run => {
                    if (!run) throw new Error(run);
                    if (run.message != Message.SUCCESS) throw new Error(run);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(error => {
                    return ResClient([], error.message, 400, res);
                })
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    public changePassword(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const params = req.body;
                const userId = res.locals['user'].uuid;
                const func = new ChangePassword(userId);
                func.init(params).then(run => {
                    if (!run) throw new Error(run);
                    if (run.message != Message.SUCCESS) throw new Error(run);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(error => {
                    return ResClient([], error.message, 400, res);
                })
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    public forgotPassword(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const params = req.body;
                const func = new ForgotPassword();
                func.init(params).then(run => {
                    if (!run) throw new Error(run);
                    if (run.message != Message.SUCCESS) throw new Error(run);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(error => {
                    return ResClient([], error.message, 400, res);
                })
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    public delete(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const userId = req.params.userid;
                const func = new Delete(userId);
                func.init().then(run => {
                    if (!run) throw new Error(run);
                    if (run.message != Message.SUCCESS) throw new Error(run);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(error => {
                    return ResClient([], error.message, 400, res);
                })
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    public getAll(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const func = new GetAll();
                func.init().then(run => {
                    if (!run) throw new Error(run);
                    if (run.message != Message.SUCCESS) throw new Error(run);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(error => {
                    return ResClient([], error.message, 400, res);
                })
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    public getOne(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const userId = req.params.userid;
                const func = new GetOne(userId);
                func.init().then(run => {
                    if (!run) throw new Error(run);
                    if (run.message != Message.SUCCESS) throw new Error(run);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(error => {
                    return ResClient([], error.message, 400, res);
                })
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    public myAccount(req: Request, res: Response): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const userId = res.locals['user'].uuid;
                const func = new MyAccount(userId);
                func.init().then(run => {
                    if (!run) throw new Error(run);
                    if (run.message != Message.SUCCESS) throw new Error(run);
                    return ResClient(run.data, Message.SUCCESS, 200, res);
                }).catch(error => {
                    return ResClient([], error.message, 400, res);
                })
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export default UserController;