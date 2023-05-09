"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MailService {
    constructor() {
        this.createConnection();
    }
    // INSTANCE CREATE FOR MAIL
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }
    // CREATE A CONNECTION FOR LIVE
    createConnection() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }
    // SEND MAIL
    sendMail(options, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.transporter) {
                    yield this.createConnection();
                }
                options.to = 'drushimgalil@gmail.com';
                const info = yield this.getTransporter().sendMail(options);
                yield this.verifyConnection(info);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    // VERIFY CONNECTION
    verifyConnection(info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transporter.verify();
                console.log('Email sent: ' + info.response);
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    // CREATE TRANSPORTER
    getTransporter() {
        return this.transporter;
    }
}
exports.default = MailService.getInstance();
//# sourceMappingURL=MailService.js.map