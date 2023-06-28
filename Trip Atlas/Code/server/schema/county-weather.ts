import mongoose from "mongoose";

export const CountyWeatherSchema = new mongoose.Schema({
    state: String,
    county: String,
    month: Number,
    avgDailyMaxAirTemp: Number,
    avgDailyMinAirTemp: Number,
});