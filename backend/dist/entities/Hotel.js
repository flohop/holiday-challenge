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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailedHotel = exports.Hotel = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
let Hotel = class Hotel extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.ObjectIdColumn)()
    // @ts-ignore
    ,
    __metadata("design:type", mongodb_1.ObjectId)
], Hotel.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)()
    // @ts-ignore
    ,
    __metadata("design:type", Number)
], Hotel.prototype, "hotelid", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Hotel.prototype, "hotelname", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)()
    // @ts-ignore
    ,
    __metadata("design:type", Number)
], Hotel.prototype, "hotelstars", void 0);
Hotel = __decorate([
    (0, type_graphql_1.ObjectType)({ simpleResolvers: true }),
    (0, typeorm_1.Entity)("hotels")
], Hotel);
exports.Hotel = Hotel;
let DetailedHotel = class DetailedHotel extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.ObjectIdColumn)()
    // @ts-ignore
    ,
    __metadata("design:type", mongodb_1.ObjectId)
], DetailedHotel.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)()
    // @ts-ignore
    ,
    __metadata("design:type", Number)
], DetailedHotel.prototype, "hotelid", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], DetailedHotel.prototype, "hotelname", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)()
    // @ts-ignore
    ,
    __metadata("design:type", Number)
], DetailedHotel.prototype, "hotelstars", void 0);
DetailedHotel = __decorate([
    (0, type_graphql_1.ObjectType)({ simpleResolvers: true }),
    (0, typeorm_1.Entity)("hotels")
], DetailedHotel);
exports.DetailedHotel = DetailedHotel;
