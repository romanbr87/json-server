"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const nocache_1 = __importDefault(require("nocache"));
const routes_1 = __importDefault(require("./routes/routes"));
const server_1 = require("./server");
const options = {
    allowedHeaders: [
        'Content-Type',
    ],
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
    origin: "*",
    preflightContinue: false,
};
/*app.use(function(req: Request, res: Response){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header' , 'authorization');
    next ();
});*/
server_1.app.use((0, cors_1.default)(options));
server_1.app.use(express_1.default.json({ limit: '50mb' }));
server_1.app.use(express_1.default.urlencoded({ limit: '50mb', extended: false }));
server_1.app.use((0, nocache_1.default)());
server_1.app.use((0, morgan_1.default)('dev'));
server_1.app.use('/', routes_1.default);
//# sourceMappingURL=index.js.map