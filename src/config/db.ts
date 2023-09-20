import CheckInFactory from "../model/checkIn.model";
import LeaveFactory from "../model/leave.model";
import UserFactory from "../model/user.model";
import AttandanceFactory from "../model/attandance.model";
import LockFactory from "../model/lock.model";
import { DB_URI, DB_NAME, DB_HOST, DB_PORT, DB_PASSWORD, DB_USERNAME } from "./key";
import sequelize, { Sequelize } from "sequelize";


const db_Connection: Sequelize = new Sequelize(DB_URI)
// const db_Connection: Sequelize = new sequelize
// .Sequelize(
//     DB_NAME,
//     DB_USERNAME,
//     DB_PASSWORD,
//     {
//         port: DB_PORT,
//         host: DB_HOST,
//         dialect: 'postgres'
//     }
// )

db_Connection.sync({alter: true});

export let UserEntity = UserFactory('user', db_Connection);
// export let LeaveEntity = LeaveFactory('leave', db_Connection);
// export let CheckInEntity = CheckInFactory('checkIn', db_Connection);
export let AttandanceEntity = AttandanceFactory('attandance', db_Connection);
export let LockEntity = LockFactory('lock', db_Connection);


UserEntity.hasMany(AttandanceEntity);
UserEntity.hasOne(LockEntity);

AttandanceEntity.belongsTo(UserEntity);

LockEntity.belongsTo(UserEntity);





// UserEntity.hasMany(LeaveEntity);
// UserEntity.hasMany(CheckInEntity);

// LeaveEntity.belongsTo(UserEntity);
// CheckInEntity.belongsTo(UserEntity);