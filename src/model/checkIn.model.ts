import { BuildOptions, DataTypes, Model, ModelAttributes, Sequelize, and } from "sequelize";
import { IBaseModel } from "./base.model";

export interface ICheckInModel extends IBaseModel {
    userUuid: string;
}

export interface CheckInModelAttribute extends ICheckInModel { }
export interface CheckInModel extends Model<CheckInModelAttribute>, CheckInModelAttribute { }
export type CheckInStatic = typeof Model & { new(object?: object, option?: BuildOptions): CheckInModel }

const CheckInFactory = (name: string, con: Sequelize) => {
    const attribute: ModelAttributes<CheckInModel> = {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }

    return con.define(name, attribute, { tableName: name, freezeTableName: true, timestamps: true })
}

export default CheckInFactory;