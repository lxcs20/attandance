import sequelize, { Op } from "sequelize";
import { AttandanceEntity, UserEntity } from "../../config/db";
import { Validator, Message, LeavePart, Quarter } from "../../service/base.servics";
import { IResponse } from "../base.controller";

export class LeaveRequest {
    private userUuid: string;
    private description: string;
    private dateLeave: Date;
    private part: string;
    private response: IResponse;

    constructor(userUuid: string) {
        this.userUuid = userUuid;
    }

    public init(params: any): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const validate = this.ValidateParams(params);
                if (validate !== Message.SUCCESS) throw new Error(validate);
                const run = await this.process();
                if (run != Message.SUCCESS) {
                    throw new Error(run);
                }

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private ValidateParams(params: any): string {
        const { description, dateLeave, part } = params;
        const validate = Validator({ description, dateLeave });
        if (validate != Message.SUCCESS) return validate
        this.description = description;
        this.dateLeave = dateLeave;
        this.part = part;
        return Message.SUCCESS
    }

    private process(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    message: Message.FAILE,
                    data: ''
                }

                const data = {
                    userUuid: this.userUuid,
                    check: false,
                    part: this.part,
                    date: this.dateLeave,
                    description: this.description
                }

                let leaveReq = await AttandanceEntity.create(data);
                if (!leaveReq) {
                    return resolve(Message.FAILE)
                }
                // leaveReq = JSON.parse(JSON.stringify(leaveReq));

                this.response.message = Message.SUCCESS;
                this.response.data = leaveReq;
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class LeaveByAdmin {
    private userUuid: string;
    private description: string;
    private dateLeave: Date;
    private part: string;
    private response: IResponse

    public init(params: any): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const validate = this.ValidateParams(params);
                if (validate !== Message.SUCCESS) throw new Error(validate);
                const run = await this.process();
                if (run != Message.SUCCESS) {
                    throw new Error(run);
                }

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private ValidateParams(params: any): string {
        const { userid, description, dateLeave, part } = params;
        const validate = Validator({ description, dateLeave });
        if (validate != Message.SUCCESS) return validate
        this.userUuid = userid;
        this.description = description;
        this.dateLeave = dateLeave;
        this.part = part;
        return Message.SUCCESS
    }

    private process(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    message: Message.FAILE,
                    data: ''
                }

                const data = {
                    userUuid: this.userUuid,
                    check: false,
                    part: this.part,
                    date: this.dateLeave,
                    description: this.description
                }

                let leaveReq = await AttandanceEntity.create(data);
                if (!leaveReq) {
                    return resolve(Message.FAILE)
                }
                // leaveReq = JSON.parse(JSON.stringify(leaveReq));

                this.response.message = Message.SUCCESS;
                this.response.data = leaveReq;
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetLeaveAll {
    private response: IResponse

    public init(): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const run = await this.process();
                if (run != Message.SUCCESS) {
                    throw new Error(run);
                }
                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private process(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    message: Message.FAILE,
                    data: ''
                }

                let leaveReq = await UserEntity.findAll({
                    where: { isActive: true },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: AttandanceEntity,
                            where: { check: false, isActive: true },
                            attributes: ['check', 'date', 'description', 'part', 'createdAt'],
                        }
                    ]
                });
                if (!leaveReq) {
                    return resolve(Message.FAILE)
                }
                // leaveReq = JSON.parse(JSON.stringify(leaveReq));

                this.response.message = Message.SUCCESS;
                this.response.data = leaveReq;
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetLeaveByDate {
    private date: Date;
    private response: IResponse;

    constructor(date: any) {
        this.date = date;
    }
    public init(): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const run = await this.process();
                if (run !== Message.SUCCESS) throw new Error(run);
                console.log(this.response)
                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private process(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    message: Message.FAILE,
                    data: ''
                }
                const date = new Date(`${this.date}`);
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

                let leave = await UserEntity.findAll(
                    {
                        where: {
                            isActive: true,
                        },
                        attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                        include: [
                            {
                                model: AttandanceEntity,
                                where: {
                                    check: false, isActive: true,
                                    date: {
                                        [Op.between]: [startdate, enddate]
                                    }
                                },
                                attributes: ['check', 'date', 'description', 'part', 'createdAt'],
                            }
                        ]
                    }
                )
                if (!leave) return resolve(Message.FAILE)
                // leave = JSON.parse(JSON.stringify(leave));
                this.response.message = Message.SUCCESS;
                this.response.data = leave;

                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetLeaveByMonth {
    private year: number;
    private month: number;
    private response: IResponse;

    public init(params: any): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const validate = this.ValidateParams(params);
                if (validate !== Message.SUCCESS) throw new Error(validate);
                const run = await this.process();
                if (run !== Message.SUCCESS) throw new Error(run);

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private ValidateParams(params: any): string {
        const { year, month } = params;
        const validate = Validator({ year, month });
        if (validate !== Message.SUCCESS) return validate
        this.year = year;
        this.month = month;
        return Message.SUCCESS
    }

    private process(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    message: Message.FAILE,
                    data: ''
                }
                const date = new Date(`${this.year}-${this.month}-01`)
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

                let leave = await UserEntity.findAll(
                    {
                        where: {
                            isActive: true,
                        },
                        attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                        include: [
                            {
                                model: AttandanceEntity,
                                where: {
                                    check: false, isActive: true,
                                    date: {
                                        [Op.between]: [startdate, enddate]
                                    }
                                },
                                attributes: ['check', 'date', 'description', 'part', 'createdAt'],
                            }
                        ]
                    }
                )
                // leave = JSON.parse(JSON.stringify(leave));
                this.response.message = Message.SUCCESS;
                this.response.data = leave;

                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetLeaveThreeMonth {
    private year: number;
    private quarter: number;
    private response: IResponse;

    public init(params: any): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const validate = this.ValidateParams(params);
                if (validate !== Message.SUCCESS) throw new Error(validate);
                const run = await this.process();
                if (run !== Message.SUCCESS) throw new Error(run);
                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private ValidateParams(params: any): string {
        const { year, quarter } = params;
        const validate = Validator({ year, quarter });
        if (validate !== Message.SUCCESS) return validate
        let qt = Quarter(quarter as unknown as number);
        if (qt === 1) return 'invalid quarter'
        this.year = year as unknown as number;
        this.quarter = qt;
        return Message.SUCCESS
    }

    private process(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    message: Message.FAILE,
                    data: ''
                }
                const date = new Date(this.year, this.quarter, 1);
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth() + 3, 0, 23, 59, 59, 999);

                let leave = await UserEntity.findAll(
                    {
                        where: {
                            isActive: true,
                        },
                        attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                        include: [
                            {
                                model: AttandanceEntity,
                                where: {
                                    check: false, isActive: true,
                                    date: {
                                        [Op.between]: [startdate, enddate]
                                    }
                                },
                                attributes: ['check', 'date', 'description', 'part', 'createdAt'],
                            }
                        ]
                    }
                )
                if (!leave) return resolve(Message.FAILE);
                // leave = JSON.parse(JSON.stringify(leave));
                this.response.message = Message.SUCCESS;
                this.response.data = leave;

                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetLeaveByYear {
    private year: number;
    private response: IResponse;

    constructor(year: number) {
        this.year = year;
    }

    public init(): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const run = await this.process();
                if (!run) throw new Error(run);
                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private process(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                let startdate = new Date(this.year, 0, 1, 0, 0, 0, 0);
                let enddate = new Date(startdate.getFullYear(), 11, 0, 23, 59, 59, 999);
                let leaveYear = await UserEntity.findAll(
                    {
                        where: {
                            isActive: true,
                        },
                        attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                        include: [
                            {
                                model: AttandanceEntity,
                                where: {
                                    check: false, isActive: true,
                                    date: {
                                        [Op.between]: [startdate, enddate]
                                    }
                                },
                                attributes: ['check', 'date', 'description', 'part', 'createdAt'],
                            }
                        ]
                    }
                )
                if (!leaveYear) return resolve(Message.FAILE);
                // leaveYear = JSON.parse(JSON.stringify(leaveYear));

                this.response.message = Message.SUCCESS;
                this.response.data = leaveYear

                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetAllLeaveReq {
    private response: IResponse;

    public init(): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const run = await this.process();
                if (run != Message.SUCCESS) throw new Error(run);
                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }


    private process(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                let startdate = new Date();
                let leaveReq = await AttandanceEntity.findAll(
                    {
                        where: {
                            isActive: true,
                            check: false,
                            date: {
                                [Op.gte]: startdate
                            }
                        },
                        attributes: ['date', 'description', 'part', 'check', 'createdAt'],
                        include: [
                            {
                                model: UserEntity,
                                where: { isActive: true },
                                attributes: ['uuid', 'firstname', 'lastname', 'profile']
                            }
                        ],
                    }
                )
                if (!leaveReq) return resolve(Message.FAILE);
                // leaveYear = JSON.parse(JSON.stringify(leaveYear));
                this.response.message = Message.SUCCESS;
                this.response.data = leaveReq

                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}