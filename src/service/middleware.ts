import { Request, Response, NextFunction } from "express";
import { Message, ResClient } from "./base.servics";
import { VerifyToken } from "./private";
import { Role } from "../model/base.model";
import { UserEntity } from "../config/db";


export const auth = (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const token: any = req.headers['token'];
            // console.log(`token: `, token)
            if (!token) return ResClient([], Message.INVALID_TOKEN, 400, res);

            let verify = await VerifyToken(token)
            if (verify.message != Message.SUCCESS) {
                return ResClient([], verify.data, 401, res);
            }
            const data = verify.data;

            let user = await UserEntity.findOne({
                where: {
                    uuid: data.uuid
                },
                attributes: ['uuid', 'firstname', 'lastname', 'role']
            })
            if(!user){
                return ResClient([], Message.NOTFOUND + 'user', 404, res)
            }
            user = JSON.parse(JSON.stringify(user));
            // console.log(`user middleware: `, user)
            const userdata = {
                uuid: user.uuid,
                role: user.role
            }
            res.locals['user'] = userdata;
            // console.log(`res user`,res.locals['user'].uuid)
            next();
        } catch (error) {
            ResClient([], error.message, 500, res)
        }
    })
}

export const admin = (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const user = res.locals['user'].role;
            if (user !== Role.ADMIN) {
                return ResClient([], Message.UNAUTHORIZED, 401, res)
            }
            next();
        } catch (error) {
            resolve(error.message)
        }
    })
}
