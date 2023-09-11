import { BuildOptions, DataTypes, Model, ModelAttributes, Sequelize } from "sequelize";
import { IBaseModel } from "./base.model";

interface ILeaveMorning extends IBaseModel {
    leaveDate: Date;
    description: string;
}

export interface LeaveMorningAttribute extends ILeaveMorning{}
export interface LeaveMorningModel extends Model<LeaveMorningAttribute>, LeaveMorningAttribute{}
export type LeaveMorningStatic = typeof Model & {new (object?: object, option?: BuildOptions): LeaveMorningModel}

const LeaveMorningFactory = (name: string, con: Sequelize) => {
    const attribute: ModelAttributes<LeaveMorningModel> = {
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
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }

    return con.define(name, attribute, { tableName: name, freezeTableName: true, timestamps: true })
}

export default LeaveMorningFactory;
