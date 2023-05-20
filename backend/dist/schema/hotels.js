"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelQuery = void 0;
const hotels_1 = require("../models/hotels");
exports.HotelQuery = {
    hotelById: hotels_1.HotelTC.getResolver('findById'),
    hotelByIds: hotels_1.HotelTC.getResolver('findByIds'),
    hotelOne: hotels_1.HotelTC.getResolver('findOne'),
    hotelMany: hotels_1.HotelTC.getResolver("findMany"),
    hotelCount: hotels_1.HotelTC.getResolver("count"),
    hotelConnection: hotels_1.HotelTC.getResolver('connection'),
    hotelPagination: hotels_1.HotelTC.getResolver('pagination')
};
