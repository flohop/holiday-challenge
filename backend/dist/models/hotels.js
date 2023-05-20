"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelTC = exports.Hotel = exports.HotelSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.HotelSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
}, { collection: "hotels" });
exports.Hotel = mongoose_1.default.model('Hote', exports.HotelSchema);
exports.HotelTC = (0, graphql_compose_mongoose_1.composeWithMongoose)(exports.Hotel);
