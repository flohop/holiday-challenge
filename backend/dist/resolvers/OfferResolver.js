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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferResolver = exports.OfferModel = void 0;
const type_graphql_1 = require("type-graphql");
const Offers_1 = require("../entities/Offers");
const Hotel_1 = require("../entities/Hotel");
const mongoose = __importStar(require("mongoose"));
const index_1 = require("../index");
exports.OfferModel = mongoose.model('offers', Offers_1.OfferSchema);
let OfferHotelInput = class OfferHotelInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OfferHotelInput.prototype, "hotelid", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OfferHotelInput.prototype, "pageSize", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OfferHotelInput.prototype, "pageNumber", void 0);
OfferHotelInput = __decorate([
    (0, type_graphql_1.InputType)()
], OfferHotelInput);
let OfferInput = class OfferInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], OfferInput.prototype, "departureAirports", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], OfferInput.prototype, "hotelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OfferInput.prototype, "earliestDepartureDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OfferInput.prototype, "latestReturnDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OfferInput.prototype, "countAdults", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OfferInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OfferInput.prototype, "countChildren", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OfferInput.prototype, "duration", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OfferInput.prototype, "pageSize", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OfferInput.prototype, "pageNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OfferInput.prototype, "oceanView", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], OfferInput.prototype, "mealType", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], OfferInput.prototype, "roomType", void 0);
OfferInput = __decorate([
    (0, type_graphql_1.InputType)()
], OfferInput);
let OfferResolver = class OfferResolver {
    minPriceOffer(hotelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cheapestOffer = yield exports.OfferModel.find({ hotelid: hotelId }).sort({ price: 1 }).lean().limit(1);
            // @ts-ignore
            return cheapestOffer[0];
        });
    }
    offers_by_hotel_by_filter(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.OfferModel.aggregate([
                // $match stage using covered index fields
                {
                    $match: {
                        hotelid: input.hotelId,
                        outbounddeparturedatetime: { $gte: input.earliestDepartureDate },
                        outbounddepartureairport: { $in: input.departureAirports },
                        countadults: input.countAdults,
                        countchildren: input.countChildren,
                        price: { $lte: input.price },
                        inboundarrivaldatetime: { $lte: input.latestReturnDate },
                        mealtype: input.mealType,
                        oceanview: input.oceanView,
                        roomtype: input.roomType
                    }
                },
                {
                    $match: {
                        $expr: {
                            $eq: [
                                {
                                    $floor: {
                                        $divide: [
                                            {
                                                $subtract: [
                                                    { "$dateFromString": { "dateString": "$inboundarrivaldatetime" } },
                                                    { "$dateFromString": { "dateString": "$outbounddeparturedatetime" } }
                                                ]
                                            },
                                            86400000
                                        ]
                                    },
                                },
                                input.duration
                            ]
                        }
                    }
                },
                {
                    $skip: (input.pageNumber - 1) * input.pageSize
                },
                {
                    $limit: input.pageSize
                }
            ]).exec();
            // @ts-ignore
            return result;
        });
    }
    offers_by_filter(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.OfferModel.aggregate([
                // $match stage using covered index fields
                {
                    $match: {
                        outbounddeparturedatetime: { $gte: input.earliestDepartureDate },
                        outbounddepartureairport: { $in: input.departureAirports },
                        countadults: input.countAdults,
                        countchildren: input.countChildren,
                        price: { $lte: input.price },
                        inboundarrivaldatetime: { $lte: input.latestReturnDate },
                        mealtype: input.mealType,
                        oceanview: input.oceanView,
                        roomtype: input.roomType
                    }
                },
                // $project stage
                {
                    $project: {
                        _id: 1,
                        price: 1,
                        hotelid: 1,
                        countadults: 1,
                        countchildren: 1,
                        outbounddeparturedatetime: 1,
                        outbounddepartureairport: 1,
                        outboundarrivaldatetime: 1,
                        outboundarrivalairport: 1,
                        inbounddeparturedatetime: 1,
                        inbounddepartureairport: 1,
                        inboundarrivaldatetime: 1,
                        inboundarrivalairport: 1,
                        mealtype: 1,
                        oceanview: 1,
                        roomtype: 1,
                        "durationInDays": {
                            "$floor": {
                                "$divide": [
                                    {
                                        "$subtract": [
                                            { "$dateFromString": { "dateString": "$inboundarrivaldatetime" } },
                                            { "$dateFromString": { "dateString": "$outbounddeparturedatetime" } }
                                        ]
                                    },
                                    86400000
                                ]
                            }
                        },
                    }
                },
                {
                    $match: {
                        durationInDays: input.duration
                    }
                },
                {
                    $group: {
                        _id: '$hotelid',
                        documents: { $push: '$$ROOT' }
                    }
                },
                {
                    // this is needed to sort items in $sessions array
                    $unwind: '$documents',
                },
                {
                    $sort: {
                        // specify $sessions sort params here
                        'documents.price': 1,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        documents: {
                            $first: '$documents',
                        }
                    },
                },
                // Pagination
                {
                    $skip: (input.pageNumber - 1) * input.pageSize
                },
                {
                    $limit: input.pageSize
                }
            ]).exec();
            const documentsArray = result.map(obj => obj.documents);
            // @ts-ignore
            return documentsArray;
        });
    }
    hotel(offer) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotel = index_1.hotels_dict[offer.hotelid.toString()];
            if (hotel == null) {
                console.log("Something went wrong getting the hotel");
                throw new Error("Something went wrong getting the hotel");
            }
            return hotel;
        });
    }
    isSaved(offer) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.savedOffers.includes(offer._id.toString());
        });
    }
    offers_by_hotel(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield exports.OfferModel.aggregate([
                // $match stage using covered index fields
                {
                    $match: {
                        // Query conditions
                        hotelid: input.hotelid
                    }
                },
                // $project stage
                {
                    $project: {
                        _id: 1,
                        price: 1,
                        hotelid: 1,
                        countadults: 1,
                        countchildren: 1,
                        outbounddeparturedatetime: 1,
                        outbounddepartureairport: 1,
                        outboundarrivaldatetime: 1,
                        outboundarrivalairport: 1,
                        inbounddeparturedatetime: 1,
                        inbounddepartureairport: 1,
                        inboundarrivaldatetime: 1,
                        inboundarrivalairport: 1,
                        mealtype: 1,
                        oceanview: 1,
                        roomtype: 1,
                        "durationInDays": {
                            "$floor": {
                                "$divide": [
                                    {
                                        "$subtract": [
                                            { "$dateFromString": { "dateString": "$inboundarrivaldatetime" } },
                                            { "$dateFromString": { "dateString": "$outbounddeparturedatetime" } }
                                        ]
                                    },
                                    86400000
                                ]
                            }
                        },
                    }
                },
                // Pagination
                {
                    $skip: (input.pageNumber - 1) * input.pageSize
                },
                {
                    $limit: input.pageSize
                }
            ]).exec();
            // @ts-ignore
            return result;
        });
    }
    toggle_saved_offer(offer_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!index_1.savedOffers.includes(offer_id)) {
                index_1.savedOffers.push(offer_id);
                return true;
            }
            else {
                const index = index_1.savedOffers.indexOf(offer_id, 0);
                if (index > -1) {
                    index_1.savedOffers.splice(index, 1);
                }
                return false;
            }
        });
    }
    saved_offers() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.OfferModel.find({
                _id: { $in: index_1.savedOffers }
            }).lean();
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => Offers_1.Offer),
    __param(0, (0, type_graphql_1.Arg)("hotelId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "minPriceOffer", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Offers_1.Offer]),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OfferInput]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "offers_by_hotel_by_filter", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Offers_1.Offer]),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OfferInput]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "offers_by_filter", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => Hotel_1.Hotel),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Offers_1.Offer]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "hotel", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => Boolean),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Offers_1.Offer]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "isSaved", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Offers_1.Offer]),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OfferHotelInput]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "offers_by_hotel", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("offer_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "toggle_saved_offer", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Offers_1.Offer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "saved_offers", null);
OfferResolver = __decorate([
    (0, type_graphql_1.Resolver)(Offers_1.Offer)
], OfferResolver);
exports.OfferResolver = OfferResolver;
