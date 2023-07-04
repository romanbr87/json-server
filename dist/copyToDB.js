"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_model_1 = __importDefault(require("./models/categories.model"));
function writeCatToDB(jsonDB) {
    console.log("12222222222222222222222222222222");
    const DB = [...jsonDB.job];
    var newData = DB.map((data) => {
        delete data.links;
        data.description = data.desc;
        delete data.desc;
        console.log(data);
        return {
            insertOne: { document: data },
        };
    });
    console.log(newData);
    categories_model_1.default
        .bulkWrite(newData)
        .then((res) => {
        console.log(res);
        console.log("12");
    })
        .catch(err => console.error(err));
}
exports.default = writeCatToDB;
//# sourceMappingURL=copyToDB.js.map