import dotenv from "dotenv";
dotenv.config();

const DB_URI: string = process.env.DB_URI as string

const DB_HOST: string = process.env.DB_HOST
const DB_NAME: string = process.env.DB_NAME
const DB_PORT: number = process.env.DB_PORT as unknown as number
const DB_PASSWORD: string = process.env.DB_PASSWORD
const DB_USERNAME: string = process.env.DB_USERNAME

const SECRET_KEY: string = process.env.SECRET_KEY

const PORT: number = process.env.PORT as unknown as number

const COM_LAT: number = process.env.COM_LAT as unknown as number
const COM_LNG: number = process.env.COM_LNG as unknown as number
const COM_DIST: number = process.env.COM_DIST as unknown as number
const R: number = process.env.R as unknown as number

const LOCKAPI: string = process.env.LOCKAPI
const LOCK_CLIENTID: string = process.env.CLIENTID
const LOCKID: string = process.env.LOCKID


export {
    PORT,
    DB_URI,
    DB_PORT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USERNAME,
    SECRET_KEY,
    COM_LAT,
    COM_LNG,
    COM_DIST,
    R,

    LOCKAPI,
    LOCK_CLIENTID,
    LOCKID,
}