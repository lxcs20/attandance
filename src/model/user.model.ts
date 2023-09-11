import { BuildOptions, DataTypes, Model, ModelAttributes, Sequelize } from "sequelize";
import { IBaseModel, Role } from "./base.model";

export interface IUserModel extends IBaseModel {
    firstname: string;
    lastname: string;
    phonenumber: string;
    password: string;
    email: string;
    role: string;
    profile: string;
}

export interface UserModelAttribute extends IUserModel { }
export interface UserModel extends Model<UserModelAttribute>, UserModelAttribute { }
export type Userstatic = typeof Model & { new(object?: Object, option?: BuildOptions): UserModel }

const UserFactory = (name: string, con: Sequelize) => {
    const attribute: ModelAttributes<UserModel> = {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phonenumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: Role.USER
        },
        profile: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }

    return con.define(name, attribute, { tableName: name, timestamps: true, freezeTableName: true })
}

export default UserFactory;