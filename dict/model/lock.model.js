"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
;
;
const LockFactory = (name, con) => {
    const attribute = {
        uuid: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        passcodeId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        fingerprintId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        faceId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
        }
    };
    return con.define(name, attribute, { tableName: name, freezeTableName: true, timestamps: true });
};
exports.default = LockFactory;
