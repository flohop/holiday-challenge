"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.HotelResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Hotel_1 = require("../entities/Hotel");
const index_1 = require("../index");
const OfferResolver_1 = require("./OfferResolver");
const Offers_1 = require("../entities/Offers");
let HotelsInput = class HotelsInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], HotelsInput.prototype, "pageSize", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], HotelsInput.prototype, "pageNumber", void 0);
HotelsInput = __decorate([
    (0, type_graphql_1.InputType)()
], HotelsInput);
let HotelResolver = class HotelResolver {
    hotels(input) {
        return __awaiter(this, void 0, void 0, function* () {
            // Make sure the user does not try to get more hotels  than there are
            let startIndex = 1 + (input.pageNumber - 1) * input.pageSize;
            let endIndex = (startIndex + input.pageSize) - 1;
            const MAX_INDEX = 998;
            if (startIndex > MAX_INDEX) {
                return [];
            }
            const results = [];
            if (endIndex > MAX_INDEX) {
                endIndex = MAX_INDEX;
            }
            while (startIndex <= endIndex) {
                results.push(index_1.hotels_dict[startIndex.toString()]);
                startIndex += 1;
            }
            return results;
        });
    }
    count(hotel) {
        return __awaiter(this, void 0, void 0, function* () {
            return OfferResolver_1.OfferModel.count({ hotelid: hotel.hotelid });
        });
    }
    maxPriceOffer(hotelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const expensiveOffer = yield OfferResolver_1.OfferModel.find({ hotelid: hotelId })
                .hint({ price: -1 })
                .sort({ price: -1 })
                .limit(1);
            // @ts-ignore
            return expensiveOffer[0];
        });
    }
    hotel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotel = index_1.hotels_dict[id.toString()];
            if (hotel == null) {
                console.log("Something went wrong getting the hotel");
                throw new Error("Something went wrong getting the hotel");
            }
            return hotel;
        });
    }
    hotel_count_offers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return OfferResolver_1.OfferModel.count({ hotelid: id });
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Hotel_1.Hotel]),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HotelsInput]),
    __metadata("design:returntype", Promise)
], HotelResolver.prototype, "hotels", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => Number),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Hotel_1.Hotel]),
    __metadata("design:returntype", Promise)
], HotelResolver.prototype, "count", null);
__decorate([
    (0, type_graphql_1.Query)(() => Offers_1.Offer),
    __param(0, (0, type_graphql_1.Arg)("hotelId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HotelResolver.prototype, "maxPriceOffer", null);
__decorate([
    (0, type_graphql_1.Query)(() => Hotel_1.Hotel),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HotelResolver.prototype, "hotel", null);
__decorate([
    (0, type_graphql_1.Query)(() => Number),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HotelResolver.prototype, "hotel_count_offers", null);
HotelResolver = __decorate([
    (0, type_graphql_1.Resolver)(Hotel_1.Hotel)
], HotelResolver);
exports.HotelResolver = HotelResolver;
