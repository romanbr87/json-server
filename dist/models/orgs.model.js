"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
const orgSchema = new mongoose_1.default.Schema({});
orgSchema.plugin(mongoose_unique_validator_1.default, 'Error, expected {PATH} to be unique.');
orgSchema.plugin(mongoose_autopopulate_1.default);
const orgsModel = mongoose_1.default.model('orgs', orgSchema);
exports.default = orgsModel;
//# sourceMappingURL=orgs.model.js.map