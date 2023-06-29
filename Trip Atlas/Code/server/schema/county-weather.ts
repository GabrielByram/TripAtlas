import { Schema } from "mongoose";
import CountyWeatherData from "../../Models/county-weather";

import mongoose from 'mongoose';

const countyWeatherSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  AvgDailyMaxAirTempF: Number,
  AvgDailyMinAirTempF: Number,
  County: String,
  Month: Number,
  State: Number,
});

export default countyWeatherSchema;