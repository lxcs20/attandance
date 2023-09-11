import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../config/key";
import { Message } from "./base.servics";

export interface IPlayToken {
    uuid: string;
    role: string;

}

export const Encrypt = (data: string): string => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export const Decrypt = (encrypted: string): string => {
    return CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
}

export const EncryptPassword = (password: string): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const enpass = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
            resolve(enpass)
        } catch (error) {
            resolve(error.message)
        }
    })
}

export const ComparePassword = (password: string, enpass: string): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            let isMatch = false;
            const decrypted = Decrypt(enpass);
            if (password === decrypted) {
                isMatch = true
            }
            resolve(isMatch)
        } catch (error) {
            resolve(error.message)
        }
    })
}

export const SignToken = (playloaddata: IPlayToken): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            let plaload = {
                id: Encrypt(playloaddata.uuid),
                type: Encrypt(playloaddata.role)
            }
            jwt.sign(plaload, SECRET_KEY, { expiresIn: '30d' }, (error, encode) => {
                if (error) return resolve(error.message)
                // console.log(`error jwt: `, error)
                resolve(encode)
            })
        } catch (error) {
            resolve(error.message)
        }
    })
}

export const VerifyToken = (token: string): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            let playload: any;
            let response = {
                data: null,
                message: Message.FAILE
            }
            jwt.verify(token, SECRET_KEY, (error, decoded) => {
                if (error) {
                    response.data = error.message
                    return resolve(response);
                }
                playload = decoded;
            });

            response.data = {
                uuid: Decrypt(playload.id),
                role: Decrypt(playload.type)
            }
            response.message = Message.SUCCESS;

            resolve(response);
        } catch (error) {
            resolve(error.message)
        }
    })
}