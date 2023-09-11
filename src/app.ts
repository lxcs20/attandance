import express, {Application, Request, Response, Router} from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { GetDistance } from "./service/base.servics";

import Routes from "./router/index.router";
import { PORT } from "./config/key";
const app: Application = express();

const router: Router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

new Routes(router);
app.use("/attend/api", router);

app.get("/", (req: Request, res: Response) => {
    // throw new Error()
    res.json({
        server: 'hello',
        message: 'connected api!'
    })
})

app.get("/query/", (req: Request, res: Response) => {
    try {
        const {lat, lng} = req.query
        const distance = GetDistance(lat as unknown as number, lng as unknown as number);
        if(distance != 'success'){
            return  res.json({
                values: 'faile'
            })
        }
        res.json({
            values: req.query
        })
    } catch (error) {
        res.json(error.message)
    }
})



app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})
