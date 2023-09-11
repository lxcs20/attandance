"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDistance = exports.Quarter = exports.ResClient = exports.Validator = exports.LeavePart = exports.QT = exports.Message = void 0;
const key_1 = require("../config/key");
var Message;
(function (Message) {
    Message["SUCCESS"] = "success";
    Message["FAILE"] = "faile";
    Message["NOTFOUND"] = "not found";
    Message["PASSINCORRECT"] = "password incorrect";
    Message["INVALID_TOKEN"] = "invalid paramiter: token";
    Message["UNAUTHORIZED"] = "unauthorized";
    Message["PHONENUMBERAREEXIT"] = "phone number are existe";
    Message["CHECKINSUCCESS"] = "you are checkin success";
})(Message || (exports.Message = Message = {}));
var QT;
(function (QT) {
    QT[QT["FIRST"] = 0] = "FIRST";
    QT[QT["SECOND"] = 3] = "SECOND";
    QT[QT["THIRD"] = 6] = "THIRD";
    QT[QT["FOURTH"] = 9] = "FOURTH";
})(QT || (exports.QT = QT = {}));
var LeavePart;
(function (LeavePart) {
    LeavePart["DAY"] = "day";
    LeavePart["MORNING"] = "morning";
    LeavePart["AFTERNOON"] = "afternoon";
})(LeavePart || (exports.LeavePart = LeavePart = {}));
const Validator = (data) => {
    const validate = Object.keys(data).filter((key) => !data[key]);
    if (validate.length > 0)
        return 'invalid paramiter: ' + validate.join(", ");
    return Message.SUCCESS;
};
exports.Validator = Validator;
const ResClient = (data, message, status, res) => {
    return res.json({ data, message, status });
};
exports.ResClient = ResClient;
const Quarter = (quarter) => {
    console.log(`base service: `, quarter);
    if (quarter == 1) {
        return 0;
    }
    else if (quarter == 2) {
        return 3;
    }
    else if (quarter == 3) {
        return 6;
    }
    else if (quarter == 4) {
        return 9;
    }
    else
        return 1;
};
exports.Quarter = Quarter;
const GetDistance = (lat, lng) => {
    try {
        // const theta = COM_LAT - lat;
        const theta = key_1.COM_LNG - lng;
        let distance = 60 * 1.1515 * (180 / Math.PI) * Math.acos(Math.sin(key_1.COM_LAT * (Math.PI / 180)) * Math.sin(lat * (Math.PI / 180)) +
            Math.cos(key_1.COM_LAT * (Math.PI / 180)) * Math.cos(lat * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180)));
        const dlat = (lat - key_1.COM_LAT) * (Math.PI / 180);
        const dlon = (lng - key_1.COM_LNG) * (Math.PI / 180);
        const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
            Math.cos(key_1.COM_LAT) * Math.cos(lat) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
        const c = 2 * Math.asin(Math.sqrt(a));
        const dist2 = key_1.R * c * 1000;
        //     let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
        //     Math.sin(lat * (Math.PI/180)) * Math.sin(lat1 * (Math.PI/180)) + 
        //     Math.cos(lat * (Math.PI/180)) * Math.cos(lat1 * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
        // );
        let dist1 = distance * 1.6093344 * 1000;
        console.log(`dist 1: `, dist1);
        console.log(`dist 2: `, dist2);
        if (dist1 > key_1.COM_DIST) {
            return Message.FAILE;
        }
        return Message.SUCCESS;
    }
    catch (error) {
        return Message.FAILE;
    }
    // try {
    //     const theta = COM_LNG - lng;
    //     let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
    //         Math.sin(COM_LAT * (Math.PI/180)) * Math.sin(lat * (Math.PI/180)) +
    //         Math.cos(COM_LAT * (Math.PI/180)) * Math.cos(lat * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
    //     )
    //     let distInM = distance * 1.6093344 * 1000
    //     console.log(distInM)
    //     if(distInM > COM_DIST){
    //         return Message.FAILE
    //     }
    //     return Message.SUCCESS
    // } catch (error) {
    //     return Message.FAILE
    // }
};
exports.GetDistance = GetDistance;
function getDistanceBetweenPoints(latitude1, longitude1, latitude2, longitude2, unit = 'miles') {
    let theta = longitude1 - longitude2;
    let distance = 60 * 1.1515 * (180 / Math.PI) * Math.acos(Math.sin(latitude1 * (Math.PI / 180)) * Math.sin(latitude2 * (Math.PI / 180)) +
        Math.cos(latitude1 * (Math.PI / 180)) * Math.cos(latitude2 * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180)));
    // if (unit == 'miles') {
    //     return Math.round(distance, 2);
    // } else if (unit == 'kilometers') {
    //     return Math.round(distance * 1.609344, 2);
    // }
}
