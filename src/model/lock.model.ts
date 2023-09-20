import { BuildOptions, DataTypes, Model, ModelAttributes, Sequelize, } from "sequelize";
import { IBaseModel } from "./base.model";

interface ILockModel extends IBaseModel {
    userUuid: string;
    passcodeId: string;
    fingerprintId: string;
    faceId: string;
};

export interface LockModelAttibute extends ILockModel { };
export interface LockModel extends Model<LockModelAttibute>, LockModelAttibute { };
export type LockStatic = typeof Model & { new(object?: object, option?: BuildOptions) };

const LockFactory = (name: string, con: Sequelize) => {
    const attribute: ModelAttributes<LockModel> = {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        passcodeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fingerprintId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        faceId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }

    return con.define(name, attribute, { tableName: name, freezeTableName: true, timestamps: true })
}

export default LockFactory;