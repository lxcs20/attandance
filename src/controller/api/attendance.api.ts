import { AttandanceEntity, UserEntity } from "../../config/db";
import { Message, QT, Quarter, Validator } from "../../service/base.servics";
import { Op } from "sequelize";
import { IResponse } from "../base.controller";

export class AttendanceToday {
    private date: string;
    private response: IResponse;
    constructor(date: string){
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
                    message: Message.FAILE,
                    data: ''
                }

                const date = new Date(this.date)
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

                let attend = await UserEntity.findAll({
                    where: { isActive: true },
                    attributes: [
                        'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile'
                    ],
                    include: [
                        {
                            model: AttandanceEntity,
                            where: { 
                                isActive: true,
                                date: {
                                    [Op.between] : [startdate, enddate]
                                }
                            },
                            attributes: [
                                'check', 'part', 'date', 'createdAt', 'description'
                            ]
                        }
                    ],
                    // group: ['user.uuid', 'attandances.uuid']
                });

                if (!attend) {
                    return resolve(Message.FAILE)
                }

                this.response.message = Message.SUCCESS;
                this.response.data = attend;
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class RateOfAttend {
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
                    message: Message.FAILE,
                    data: ''
                }

                let attend = await UserEntity.findAll({
                    where: { isActive: true },
                    attributes: [
                        'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile'
                    ],
                    include: [
                        {
                            model: AttandanceEntity,
                            where: { isActive: true },
                            attributes: [
                                'check', 'part', 'date', 'createdAt', 'description'
                            ]
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                });

                if (!attend) {
                    return resolve(Message.FAILE)
                }

                this.response.message = Message.SUCCESS;
                this.response.data = attend;
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class RateOfAttendByMonth {
    private year: number;
    private month: number;
    private response: IResponse;

    public init(params: any): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const validate = this.ValidateParams(params);
                if (validate != Message.SUCCESS) throw new Error(validate);
                const run = await this.process();
                if (run != Message.SUCCESS) throw new Error(run);

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

                const date = new Date(this.year, this.month, 1);
                let startdate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), date.getMonth(), 0, 23, 59, 59, 999);
                let attend = await UserEntity.findAll({
                    where: {
                        isActive: true,
                    },
                    attributes: [
                        'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile'
                    ],
                    include: [
                        {
                            model: AttandanceEntity,
                            where: {
                                isActive: true,
                                date: {[Op.between]: [startdate, enddate]}
                            },
                            attributes: [
                                'check', 'part', 'date', 'createdAt', 'description'
                            ]
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                });
                if (!attend) {
                    return resolve(Message.FAILE)
                }

                this.response.message = Message.SUCCESS;
                this.response.data = attend;
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class RateOfAttendThreeMonth {
    private year: number;
    private quarter: number;
    private response: IResponse;

    public init(params: any): Promise<IResponse> {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const validate = this.ValidateParams(params);
                if (validate != Message.SUCCESS) throw new Error(validate);
                const run = await this.process();
                if (run != Message.SUCCESS) throw new Error(run);

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
        this.year = year;
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
                let attend = await UserEntity.findAll({
                    where: {
                        isActive: true,
                    },
                    attributes: [
                        'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile'
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
                            attributes: [
                                'check', 'part', 'date', 'createdAt', 'description'
                            ]
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                });
                if (!attend) {
                    return resolve(Message.FAILE)
                }

                this.response.message = Message.SUCCESS;
                this.response.data = attend;
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class RateOfAttendByYear {
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
                    message: Message.FAILE,
                    data: ''
                }

                const date = new Date(this.year, 0, 1);
                let startdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                let enddate = new Date(date.getFullYear(), 11, 0, 23, 59, 59, 999);
                let attend = await UserEntity.findAll({
                    where: {
                        isActive: true,
                    },
                    attributes: [
                        'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile'
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
                            attributes: [
                                'check', 'part', 'date', 'createdAt', 'description'
                            ]
                        }
                    ],
                    group: ['user.uuid', 'attandances.uuid']
                });
                if (!attend) {
                    return resolve(Message.FAILE)
                }

                this.response.message = Message.SUCCESS;
                this.response.data = attend;
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}