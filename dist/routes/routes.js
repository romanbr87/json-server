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
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const MailService_1 = __importDefault(require("../controller/MailService"));
const router = express_1.default.Router();
const rawdata = fs.readFileSync('./src/db.json');
const jsonDB = JSON.parse(rawdata.toString(), (key, value) => value);
const verifyData = (data, res, next) => {
    (!data) ? next() : res.json(data);
};
router.use(function (req, res, next) {
    if (req.method == 'POST' && req.body.key !== process.env.API_KEY)
        res.status(404).json(null);
    else
        next();
});
router.get('/*', function (req, res, next) {
    res.status(404).json({ status: 404, message: "הדף לא קיים" });
});
router.post('/mail', function (req, res, next) {
    const mailDetails = (req.body);
    var { email, subject, body, name, tel } = mailDetails;
    if (name.trim() == '')
        name = undefined;
    if (tel.trim() == '')
        tel = undefined;
    const mail = `Message from ${name} tel: ${tel}\n ${body.trim()}`;
    MailService_1.default.sendMail({ from: email, subject: subject, text: mail }, req, res);
});
router.post('/report', function (req, res, next) {
    const { report, name } = req.body; // Cast req.body to the expected type
    const mail = `Report for ${name}\n${report}`;
    MailService_1.default.sendMail({ from: "romanbr@walla.com", subject: 'report', text: mail }, req, res);
});
router.post('/neworg', function (req, res, next) {
    const { data } = req.body; // Cast req.body to the expected type 
    //const email = `${JSON.stringify(data, null, 2)}\n`;
    //MailService.sendMail({ from: 'romanbr@walla.com', subject: 'new organization', text: email }, req, res);*/
    res.send(data);
});
router.post('/search', (req, res) => {
    const { location, searchText } = req.body;
    let processedSearchText = searchText.toLowerCase();
    const searchData = jsonDB.job.reduce((a1, c1) => {
        const categoryLinks = c1.links.reduce((a2, c2) => {
            const subArr = c2.links.filter((e) => {
                return e.site_name.toLowerCase().includes(processedSearchText) &&
                    (location === '' || e.location === location);
            });
            if (subArr.length > 0) {
                return [...a2, { cat: c2.cat, links: subArr }];
            }
            else {
                return a2;
            }
        }, []);
        return [...a1, ...categoryLinks];
    }, []);
    return res.json({ links: searchData });
});
router.post('/catNames', function (req, res, next) {
    res.json(jsonDB.job.map((e) => e.name));
});
router.post('/totalNum', function (req, res, next) {
    const totalNum = jsonDB.job.reduce((acc, element) => acc + element.links.reduce((acc1, element1) => acc1 + element1.links.length, 0), 0);
    res.send(totalNum);
});
router.post('/', function (req, res, next) {
    const data = jsonDB.job.reduce((acc, element) => {
        const totalCatNum = element.links.reduce((acc1, element1) => acc1 + element1.links.length, 0);
        acc.total += totalCatNum;
        acc.cat.push({ name: element.name, totNum: totalCatNum });
        return acc;
    }, { total: 0, cat: [] });
    res.json(data);
});
router.post('/:id/catName', function (req, res, next) {
    verifyData(jsonDB.job[req.params.id].links.map((e) => e.cat), res, next);
});
router.post('/:id/catTotalNum', function (req, res, next) {
    verifyData(jsonDB.job[req.params.id].links.reduce((acc1, element1) => acc1 + element1.links.length, 0), res, next);
});
router.post('/:id', function (req, res, next) {
    verifyData(jsonDB.job[req.params.id], res, next);
});
router.post('/:id1/:id2/subCatTotalNum', function (req, res, next) {
    verifyData(jsonDB.job[req.params.id1].links[req.params.id2].links.length, res, next);
});
router.post('/:id1/:id2', function (req, res, next) {
    verifyData(jsonDB.job[req.params.id1].links[req.params.id2], res, next);
});
router.post('/:id1/:id2/:id3', function (req, res, next) {
    verifyData(jsonDB.job[req.params.id1].links[req.params.id2].links[req.params.id3], res, next);
});
router.post('/*', function (req, res, next) {
    res.status(404).json({ status: 404, message: "הדף לא קיים" });
});
exports.default = router;
//# sourceMappingURL=routes.js.map