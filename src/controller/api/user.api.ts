import { Role } from './../../model/base.model';
import { Message, Validator } from "../../service/base.servics";
import { UserEntity } from "../../config/db";
import { ComparePassword, EncryptPassword, SignToken } from "../../service/private";
import { IResponse } from '../base.controller';
import { where } from 'sequelize';


export class Register {

    private firstname: string;
    private lastname: string;
    private phonenumber: string;
    private password: string;
    private email: string;
    private profile: string;
    private response: any;

    constructor() { }

    public init(params: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const validate = this.validateParams(params);
                if (validate != Message.SUCCESS) throw new Error(validate);

                const run = await this.register();
                if (run != Message.SUCCESS) throw new Error(run);

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private validateParams(params: any): string {
        const { firstname, lastname, phonenumber, password, email, profile } = params;
        const validate = Validator({ firstname, lastname, phonenumber, password, email })
        if (validate != Message.SUCCESS) return 'invalid paramiter: ' + validate

        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.password = password;
        this.email = email;
        this.profile = profile || ''
        return Message.SUCCESS
    }

    private register(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                const chckExit = await UserEntity.findOne({
                    where: {
                        phonenumber: this.phonenumber
                    }
                })
                if (chckExit) return resolve(Message.PHONENUMBERAREEXIT)

                let data = {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    phonenumber: this.phonenumber,
                    password: null,
                    email: this.email,
                    profile: this.profile
                }
                data.password = await EncryptPassword(this.password);
                let register = await UserEntity.create(data);
                if (!register) return resolve(Message.FAILE)

                this.response.data = []
                this.response.message = Message.SUCCESS
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class Login {

    private phonenumber: string;
    private password: string;
    private response: any;

    public init(params: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const validate = this.validateParams(params);
                if (validate != Message.SUCCESS) throw new Error(validate);

                const run = await this.login();
                if (run != Message.SUCCESS) throw new Error(run);

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private validateParams(params: any): string {
        const { phonenumber, password } = params;
        const validate = Validator({ phonenumber, password });
        if (validate != Message.SUCCESS) return 'invalid paramiter: ' + validate

        this.phonenumber = phonenumber;
        this.password = password;
        return Message.SUCCESS
    }

    private login(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                let user = await UserEntity.findOne({
                    where: {
                        phonenumber: this.phonenumber
                    }
                })
                if (!user) return resolve(Message.NOTFOUND)
                user = JSON.parse(JSON.stringify(user));

                const isMatch = await ComparePassword(this.password, user.password);
                if (!isMatch) return resolve(Message.PASSINCORRECT);
                const playloaddata = {
                    uuid: user.uuid,
                    role: user.role
                }
                const token = await SignToken(playloaddata);
                const userData = {
                    uuid: user.uuid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phonenumber: user.phonenumber,
                    email: user.email,
                    role: user.role,
                    profile: user.profile

                }
                this.response.message = Message.SUCCESS;
                this.response.data = { token, user: userData }

                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class Update {

    private userId: string;
    private firstname: string;
    private lastname: string;
    private profile: string;
    private response: any;

    constructor(userId: string) {
        this.userId = userId;
    }

    public init(params: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const validate = this.validateParams(params);
                if (validate != Message.SUCCESS) throw new Error(validate);

                const run = await this.update();
                if (run != Message.SUCCESS) throw new Error(run);

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private validateParams(params: any): string {
        const { firstname, lastname, profile } = params;
        const validate = Validator({ firstname, lastname })
        if (validate != Message.SUCCESS) return 'invalid paramiter: ' + validate

        this.firstname = firstname;
        this.lastname = lastname;
        this.profile = profile || ''
        return Message.SUCCESS
    }

    private update(): Promise<any> {  ///   <------------------------------- data response ?
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                let data = {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    profile: this.profile
                }
                let update = await UserEntity.update(
                    data,
                    { where: { uuid: this.userId } }
                )
                if (!update) return resolve(Message.FAILE);
                let user = await UserEntity.findOne({
                    where: {
                        uuid: this.userId
                    },
                    attributes: ['uuid', 'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile']
                })
                user = JSON.parse(JSON.stringify(user));

                this.response.data = user
                this.response.message = Message.SUCCESS
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class ChangePassword {

    private userId: string;
    private oldPassword: string;
    private newPassword: string;
    private response: any;

    constructor(userId: string) {
        this.userId = userId;
    }

    public init(params: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const validate = this.validateParams(params);
                if (validate != Message.SUCCESS) throw new Error(validate);

                const run = await this.changePassword();
                if (run != Message.SUCCESS) throw new Error(run);

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private validateParams(params: any): string {
        const { newPassword, oldPassword } = params;
        const validate = Validator({ newPassword, oldPassword })
        if (validate != Message.SUCCESS) return 'invalid paramiter: ' + validate

        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        return Message.SUCCESS
    }

    private changePassword(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                let user = await UserEntity.findOne({
                    where: { uuid: this.userId }
                })
                if (!user) return resolve(Message.NOTFOUND + ' user');
                const isMatch = await ComparePassword(this.oldPassword, user.password);
                if (!isMatch) return resolve(Message.PASSINCORRECT);
                const newPassword = await EncryptPassword(this.newPassword);
                const upPass = await UserEntity.update(
                    { password: newPassword },
                    { where: { uuid: this.userId } }
                )
                if (!upPass) return resolve(Message.FAILE)

                this.response.data = {}
                this.response.message = Message.SUCCESS
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class ForgotPassword {

    private phonenumber: string;
    private newPassword: string;
    private response: any;

    constructor() { }

    public init(params: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const validate = this.validateParams(params);
                if (validate != Message.SUCCESS) throw new Error(validate);

                const run = await this.forgotPassword();
                if (run != Message.SUCCESS) throw new Error(run);

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private validateParams(params: any): string {
        const { newPassword, phonenumber } = params;
        const validate = Validator({ newPassword, phonenumber })
        if (validate != Message.SUCCESS) return 'invalid paramiter: ' + validate

        this.phonenumber = phonenumber;
        this.newPassword = newPassword;
        return Message.SUCCESS
    }

    private forgotPassword(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                let user = await UserEntity.findOne({
                    where: { phonenumber: this.phonenumber }
                })
                if (!user) return resolve(Message.NOTFOUND + ' user');
                const newPassword = await EncryptPassword(this.newPassword);
                const upPass = await UserEntity.update(
                    { password: newPassword },
                    { where: { phonenumber: this.phonenumber } }
                )
                if (!upPass) return resolve(Message.FAILE)

                this.response.data = {}
                this.response.message = Message.SUCCESS
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class Delete {

    private userId: string;
    private response: any;

    constructor(userId: string) {
        this.userId = userId;
    }

    public init(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                const run = await this.delete();
                if (run != Message.SUCCESS) throw new Error(run);

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private delete(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                let del = await UserEntity.update(
                    { isActive: false },
                    { where: { uuid: this.userId } }
                )
                if (!del) return resolve(Message.NOTFOUND + ' user');

                this.response.data = {}
                this.response.message = Message.SUCCESS
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetAll {

    private response: any;

    constructor() { }

    public init(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                const run = await this.getAll();
                if (run != Message.SUCCESS) throw new Error(run);

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private getAll(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                let users = await UserEntity.findAll(
                    {
                        where: {
                            isActive: true
                        }
                    }
                )
                if (!users) return resolve(Message.NOTFOUND + ' user');
                users = JSON.parse(JSON.stringify(users));

                this.response.data = users
                this.response.message = Message.SUCCESS
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class GetOne {

    private userId: string;
    private response: any;

    constructor(userId: string) {
        this.userId = userId;
    }

    public init(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                const run = await this.getOne();
                if (run != Message.SUCCESS) throw new Error(run);

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private getOne(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                let users = await UserEntity.findAll(
                    {
                        where: {
                            uuid: this.userId
                        },
                        attributes: ['uuid', 'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile']
                    }
                )
                if (!users) return resolve(Message.NOTFOUND + ' user');
                users = JSON.parse(JSON.stringify(users));

                this.response.data = users
                this.response.message = Message.SUCCESS
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class MyAccount {

    private userId: string;
    private response: any;

    constructor(userId: string) {
        this.userId = userId;
    }

    public init(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                const run = await this.myAcount();
                if (run != Message.SUCCESS) throw new Error(run);

                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private myAcount(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    data: null,
                    message: Message.FAILE
                }

                let user = await UserEntity.findOne(
                    {
                        where: {
                            uuid: this.userId
                        },
                        attributes: ['uuid', 'firstname', 'lastname', 'phonenumber', 'email', 'role', 'profile']
                    }
                )
                if (!user) return resolve(Message.NOTFOUND + ' user');
                user = JSON.parse(JSON.stringify(user));

                this.response.data = user
                this.response.message = Message.SUCCESS
                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}

export class UpdateProfile {
    private userId: string;
    private image: string;
    private response: IResponse;
    constructor(userId: string) {
        this.userId = userId;
    }

    public init(params: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const validate = this.ValidateParams(params);
                if(validate != Message.SUCCESS) throw new Error(validate);
                const run = await this.porcess();
                if(run != Message.SUCCESS) throw new Error(run);
                resolve(this.response)
            } catch (error) {
                resolve(error.message)
            }
        })
    }

    private ValidateParams(params: any): string {
        const { image } = params;
        const validate = Validator({ image });
        if (validate != Message.SUCCESS) return validate
        this.image = image;
        return Message.SUCCESS
    }

    private porcess(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.response = {
                    message: Message.FAILE,
                    data: ''
                }

                const img = await UserEntity.update(
                    { profile: this.image },
                    { where: { uuid: this.userId } }
                )
                if (!img) return resolve(Message.FAILE)

                this.response.message = Message.SUCCESS;
                this.response.data = []

                resolve(Message.SUCCESS)
            } catch (error) {
                resolve(error.message)
            }
        })
    }
}