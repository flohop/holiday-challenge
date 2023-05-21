"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URI = "mongodb://mongo:27017";
mongoose_1.default.Promise = global.Promise;
const connection = mongoose_1.default.connect(URI, {});
connection
    .then(db => db)
    .catch(err => {
    console.log(err);
});
exports.default = connection;
