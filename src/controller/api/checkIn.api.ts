import { Op } from "sequelize";
import { AttandanceEntity, UserEntity } from "../../config/db";
import { Message, Quarter, Validator } from "../../service/base.servics";
import sequelize from "sequelize";

import { IResponse } from "../base.controller";

export class CheckIn {
    private userUuid: string;
    private response: IResponse;

    constructor(userUuid: string) {
        this.userUuid = userUuid;
    }

    public init(): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const run = await this.process();
                // console.log(run)
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

                const date = new Date();
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
                // console.log(`${startdate}, ${enddate}`)
                const checkEx = await AttandanceEntity.findOne({
                    where: {
                        userUuid: this.userUuid,
                        createdAt: {
                            [Op.between]: [startdate, enddate]
                        }
                    }
                })
                if (checkEx) {
                    return resolve(Message.CHECKINSUCCESS)
                }

                const checkin = await AttandanceEntity.create({
                    userUuid: this.userUuid, check: true, date: date
                });
                if (!checkin) {
                    return resolve(Message.FAILE)
                }

                this.response.message = Message.SUCCESS;
                this.response.data = []
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetCheckAll {
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

                let checkin = await UserEntity.findAll({
                    where: { isActive: true },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: AttandanceEntity,
                            where: { isActive: true, check: true },
                            attributes: ['check', 'date','createdAt'],
                        }
                    ]
                });
                if (!checkin) {
                    return resolve(Message.FAILE)
                }
                checkin = JSON.parse(JSON.stringify(checkin));

                this.response.message = Message.SUCCESS;
                this.response.data = checkin
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetCheckByDate {
    private date: string;
    private response: IResponse;

    constructor(date: string) {
        this.date = date;
    }

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

                const date = new Date(this.date)
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

                let checkin = await UserEntity.findAll({
                    where: {
                        isActive: true,
                    },
                    attributes: ['firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: AttandanceEntity,
                            where: {
                                date: {
                                    [Op.between]: [startdate, enddate]
                                }
                            },
                            attributes: ['check', 'date', 'createdAt']
                        }
                    ]
                })
                if (!checkin) return resolve(Message.NOTFOUND);
                // checkin = JSON.parse(JSON.stringify(checkin));

                this.response.data = checkin
                this.response.message = Message.SUCCESS
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetCheckByMonth {
    private year: string;
    private month: string;
    private response: IResponse;

    public init(params: any): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const validate = this.validateParams(params);
                if (validate !== Message.SUCCESS) throw new Error(validate);
                const run = await this.process();
                if (run != Message.SUCCESS) throw new Error(run);

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private validateParams(params: any): string {
        const { year, month } = params;
        const validate = Validator({ year, month });
        if (validate !== Message.SUCCESS) {
            return validate
        }
        this.year = year;
        this.month = month;
        return Message.SUCCESS
    }

    private process(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                const date = new Date(`${this.year}-${this.month}-01`)
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

                let checkin = await UserEntity.findAll({
                    where: {
                        isActive: true
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile',
                        [sequelize.fn(("COUNT"), sequelize.col('user.uuid')), "count"]
                    ],
                    include: [
                        {
                            model: AttandanceEntity,
                            where: {
                                isActive: true,
                                date: {
                                    [Op.between]: [startdate, enddate]
                                }
                            },
                            attributes: ['check', 'date', 'createdAt']
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                })
                if (!checkin) return resolve(Message.NOTFOUND);
                // checkin = JSON.parse(JSON.stringify(checkin));

                this.response.data = checkin
                this.response.message = Message.SUCCESS
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetCheckThreeMonth {
    private year: number;
    private month: number;
    private response: IResponse;

    public init(params: any): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const validate = this.validateParams(params);
                if (validate !== Message.SUCCESS) throw new Error(validate);
                const run = await this.process();
                if (run != Message.SUCCESS) throw new Error(run);

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private validateParams(params: any): string {
        const { year, quarter } = params;
        const validate = Validator({ year, quarter });
        if (validate !== Message.SUCCESS) {
            return validate
        }
        let qt = Quarter(quarter as unknown as number);
        if (qt === 1) return 'invalid quarter'
        this.year = year as unknown as number;
        this.month = qt;
        return Message.SUCCESS
    }

    private process(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                const date = new Date(this.year, this.month, 1)
                let startdate = new Date(this.year, this.month, 1, 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth() + 3, 0, 23, 59, 59, 999);
                console.log(`${startdate}, ${enddate}`)
                let checkin = await UserEntity.findAll({
                    where: {
                        isActive: true
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: AttandanceEntity,
                            where: {
                                isActive: true,
                                date: {
                                    [Op.between]: [startdate, enddate]
                                }
                            },
                            attributes: ['check', 'date', 'createdAt']
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                })
                if (!checkin) return resolve(Message.NOTFOUND);
                // checkin = JSON.parse(JSON.stringify(checkin));

                this.response.data = checkin
                this.response.message = Message.SUCCESS
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetCheckByYear {
    private year: number;
    private response: IResponse;

    constructor(year: number) {
        this.year = year;
    }

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

                const date = new Date(this.year, 0, 1)
                let startdate = new Date(this.year, 0, 1, 0, 0, 0, 0);
                let enddate = new Date(this.year, 11, 0, 23, 59, 59, 999);

                console.log(`st: ${startdate}, en: ${enddate}`)
                let checkin = await UserEntity.findAll({
                    where: {

                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'profile'],
                    include: [
                        {
                            model: AttandanceEntity,
                            where: {
                                isActive: true,
                                date: {
                                    [Op.between]: [startdate, enddate]
                                }
                            },
                            attributes: ['check', 'date', 'createdAt']
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                })
                if (!checkin) return resolve(Message.NOTFOUND);
                // checkin = JSON.parse(JSON.stringify(checkin));

                this.response.data = checkin
                this.response.message = Message.SUCCESS
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}