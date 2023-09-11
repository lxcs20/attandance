"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
;
const AttandanceFactory = (name, con) => {
    const attribute = {
        uuid: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true
        },
        check: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
        part: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: null
        },
        date: {
            type: sequelize_1.DataTypes.DATEONLY,
            defaultValue: null
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: null
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        }
    };
    return con.define(name, attribute, { tableName: name, freezeTableName: true, timestamps: true });
};
exports.default = AttandanceFactory;
