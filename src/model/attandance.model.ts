import { BuildOptions, DataTypes, Model, ModelAttributes, Sequelize } from "sequelize";
import { IBaseModel } from "./base.model";


interface IAttandance extends IBaseModel {
    userUuid: string;
    check: boolean;
    part: string;
    date: Date;
    description: string;
}

export interface IAttandanceAttribute extends IAttandance { };
export interface IAttandanceModel extends Model<IAttandanceAttribute>, IAttandanceAttribute { };
export type AttandanceStatic = typeof Model & { new(object?: Object, option?: BuildOptions): IAttandanceModel }

const AttandanceFactory = (name: string, con: Sequelize) => {
    const attribute: ModelAttributes<IAttandanceModel> = {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        check: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        part: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: null
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }

    return con.define(name, attribute, { tableName: name, freezeTableName: true, timestamps: true })
}
export default AttandanceFactory;