"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const base_servics_1 = require("./service/base.servics");
const index_router_1 = __importDefault(require("./router/index.router"));
const key_1 = require("./config/key");
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
new index_router_1.default(router);
app.use("/attend/api", router);
app.get("/", (req, res) => {
    // throw new Error()
    res.json({
        server: 'hello',
        message: 'connected api!'
    });
});
app.get("/query/", (req, res) => {
    try {
        const { lat, lng } = req.query;
        const distance = (0, base_servics_1.GetDistance)(lat, lng);
        if (distance != 'success') {
            return res.json({
                values: 'faile'
            });
        }
        res.json({
            values: req.query
        });
    }
    catch (error) {
        res.json(error.message);
    }
});
app.listen(key_1.PORT, () => {
    console.log(`server running on port: ${key_1.PORT}`);
});
