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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferSchema = exports.Offer = exports.SimpleOffer = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Hotel_1 = require("./Hotel");
let SimpleOffer = class SimpleOffer {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], SimpleOffer.prototype, "hotelid", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Hotel_1.Hotel),
    __metadata("design:type", Hotel_1.Hotel)
], SimpleOffer.prototype, "hotel", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], SimpleOffer.prototype, "outbounddeparturedatetime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typegoose_1.prop)({ required: false }),
    __metadata("design:type", Number)
], SimpleOffer.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: false }),
    __metadata("design:type", String)
], SimpleOffer.prototype, "inboundarrivaldatetime", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: false }),
    __metadata("design:type", String)
], SimpleOffer.prototype, "outbounddepartureairport", void 0);
SimpleOffer = __decorate([
    (0, type_graphql_1.ObjectType)({ simpleResolvers: true }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: "offers" } })
], SimpleOffer);
exports.SimpleOffer = SimpleOffer;
let Offer = class Offer {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID)
    // @ts-ignore
    ,
    __metadata("design:type", mongodb_1.ObjectId)
], Offer.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typegoose_1.prop)({ required: true })
    // @ts-ignore
    ,
    __metadata("design:type", Number)
], Offer.prototype, "hotelid", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Hotel_1.Hotel),
    __metadata("design:type", Hotel_1.Hotel)
], Offer.prototype, "hotel", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: true })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Offer.prototype, "outbounddeparturedatetime", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: true })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Offer.prototype, "inbounddeparturedatetime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", Number)
], Offer.prototype, "countadults", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", Number)
], Offer.prototype, "countchildren", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", Number)
], Offer.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Offer.prototype, "inbounddepartureairport", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Offer.prototype, "inboundarrivalairport", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Offer.prototype, "inboundarrivaldatetime", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Offer.prototype, "outbounddepartureairport", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Offer.prototype, "outboundarrivalairport", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Offer.prototype, "outboundarrivaldatetime", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Offer.prototype, "mealtype", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Offer.prototype, "oceanview", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Offer.prototype, "roomtype", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typegoose_1.prop)({ required: false })
    // @ts-ignore
    ,
    __metadata("design:type", Number)
], Offer.prototype, "duration", void 0);
Offer = __decorate([
    (0, type_graphql_1.ObjectType)({ simpleResolvers: true }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: "offers" } })
], Offer);
exports.Offer = Offer;
exports.OfferSchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    hotelid: Number,
    outbounddeparturedatetime: String,
    inbounddeparturedatetime: String,
    countadults: Number,
    countchildren: Number,
    price: Number,
    inbounddepartureairport: String,
    inboundarrivalairport: String,
    inboundarrivaldatetime: String,
    outbounddepartureairport: String,
    outboundarrivalairport: String,
    outboundarrivaldatetime: String,
    mealtype: String,
    oceanview: String,
    roomtype: String,
    duration: Number
});
