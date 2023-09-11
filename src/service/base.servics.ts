import { Response } from "express";
import { COM_DIST, COM_LAT, COM_LNG, R } from "../config/key";

export enum Message {
    SUCCESS = 'success',
    FAILE = 'faile',
    NOTFOUND = 'not found',
    PASSINCORRECT = 'password incorrect',
    INVALID_TOKEN = 'invalid paramiter: token',
    UNAUTHORIZED = 'unauthorized',
    PHONENUMBERAREEXIT = 'phone number are existe',
    CHECKINSUCCESS = 'you are checkin success',
}

export enum QT {
    FIRST = 0,
    SECOND = 3,
    THIRD = 6,
    FOURTH = 9
}

export enum LeavePart {
    DAY = 'day',
    MORNING = 'morning',
    AFTERNOON = 'afternoon'
}

export const Validator = (data: object): string => {
    const validate = Object.keys(data).filter((key) => !data[key]);
    if (validate.length > 0) return 'invalid paramiter: ' + validate.join(", ")
    return Message.SUCCESS
}

export const ResClient = (data: any, message: string, status: number, res: Response) => {
    return res.json({ data, message, status })
}

export const Quarter = (quarter: number): number => {
    console.log(`base service: `, quarter)
    if(quarter == 1){
        return 0
    }else if (quarter == 2){
        return 3
    }else if(quarter == 3){
        return 6
    }else if(quarter == 4){
        return 9
    }else return 1
}

export const GetDistance = (lat: number, lng: number): string => {
    try {
        // const theta = COM_LAT - lat;
        const theta = COM_LNG - lng;
        let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
            Math.sin(COM_LAT * (Math.PI/180)) * Math.sin(lat * (Math.PI/180)) +
            Math.cos(COM_LAT * (Math.PI/180)) * Math.cos(lat * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
        )

        const dlat = (lat - COM_LAT) * (Math.PI / 180);
        const dlon = (lng - COM_LNG) * (Math.PI / 180);
        const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
                Math.cos(COM_LAT) * Math.cos(lat) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
        const c = 2 * Math.asin(Math.sqrt(a));
        const dist2 = R * c * 1000;

    //     let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
    //     Math.sin(lat * (Math.PI/180)) * Math.sin(lat1 * (Math.PI/180)) + 
    //     Math.cos(lat * (Math.PI/180)) * Math.cos(lat1 * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
    // );
        let dist1= distance * 1.6093344 * 1000
        console.log(`dist 1: `, dist1)

        console.log(`dist 2: `, dist2)

        if(dist1 > COM_DIST){
            return Message.FAILE
        }
        return Message.SUCCESS
    } catch (error) {
        return Message.FAILE
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
}

function getDistanceBetweenPoints(latitude1, longitude1, latitude2, longitude2, unit = 'miles') {
    let theta = longitude1 - longitude2;
    let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
        Math.sin(latitude1 * (Math.PI/180)) * Math.sin(latitude2 * (Math.PI/180)) + 
        Math.cos(latitude1 * (Math.PI/180)) * Math.cos(latitude2 * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
    );
    // if (unit == 'miles') {
    //     return Math.round(distance, 2);
    // } else if (unit == 'kilometers') {
    //     return Math.round(distance * 1.609344, 2);
    // }
}
