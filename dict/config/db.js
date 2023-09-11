"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttandanceEntity = exports.UserEntity = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const attandance_model_1 = __importDefault(require("../model/attandance.model"));
const key_1 = require("./key");
const sequelize_1 = __importDefault(require("sequelize"));
// const db_Connection: Sequelize = new Sequelize(DB_URI)
const db_Connection = new sequelize_1.default
    .Sequelize(key_1.DB_NAME, key_1.DB_USERNAME, key_1.DB_PASSWORD, {
    port: key_1.DB_PORT,
    host: key_1.DB_HOST,
    dialect: 'postgres'
});
db_Connection.sync({ alter: true });
exports.UserEntity = (0, user_model_1.default)('user', db_Connection);
// export let LeaveEntity = LeaveFactory('leave', db_Connection);
// export let CheckInEntity = CheckInFactory('checkIn', db_Connection);
exports.AttandanceEntity = (0, attandance_model_1.default)('attandance', db_Connection);
exports.UserEntity.hasMany(exports.AttandanceEntity);
exports.AttandanceEntity.belongsTo(exports.UserEntity);
// UserEntity.hasMany(LeaveEntity);
// UserEntity.hasMany(CheckInEntity);
// LeaveEntity.belongsTo(UserEntity);
// CheckInEntity.belongsTo(UserEntity);
