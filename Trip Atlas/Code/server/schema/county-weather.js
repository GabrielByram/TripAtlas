"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const countyWeatherSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    AvgDailyMaxAirTempF: Number,
    AvgDailyMinAirTempF: Number,
    County: String,
    Month: Number,
    State: Number,
});
exports.default = countyWeatherSchema;
