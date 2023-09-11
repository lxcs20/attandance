import { BuildOptions, DataTypes, Deferrable, Model, ModelAttributes, Sequelize } from "sequelize";
import { IBaseModel } from "./base.model";
import { LeavePart } from "../service/base.servics";


interface ILeaveModel extends IBaseModel {
    leaveDate: Date;
    description: string;
    part: string;
    userUuid: string;
}

export interface LeaveModelAttribute extends ILeaveModel { }
export interface LeaveModel extends Model<LeaveModelAttribute>, LeaveModelAttribute { }
export type LeaveStatic = typeof Model & { new(object?: object, option?: BuildOptions) }

const LeaveFactory = (name: string, con: Sequelize) => {
    const attribute: ModelAttributes<LeaveModel> = {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        leaveDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        part: {
            type: DataTypes.STRING,
            defaultValue: LeavePart.DAY,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }

    return con.define(name, attribute, { tableName: name, freezeTableName: true, timestamps: true })
}

export default LeaveFactory;