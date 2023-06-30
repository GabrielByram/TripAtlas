import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import CountyWeatherData from "../../../../../Models/county-weather";
import usCountiesGeoJSON from "../Maps/us-counties";
import "./USCountiesMap.css"

// Function to determine the fill color based on temperature
const getColorByTemperature = (
temperature: number,
colorScale: { min: number; max: number; colors: string[] }
) => {
    const { min, max, colors } = colorScale;
    const normalizedTemperature = (temperature - min) / (max - min);

    // Interpolate between the colors based on the normalized temperature
    const colorIndex = Math.floor(normalizedTemperature * (colors.length - 1));
    const colorPercentage = normalizedTemperature * (colors.length - 1) - colorIndex;
    const color1 = colors[colorIndex];
    const color2 = colors[colorIndex + 1];
    //console.log(`color 1: ${color1}; color2: ${color2}`)

    // Blend the colors based on the colorPercentage
    const blendedColor = blendColors(color1, color2, colorPercentage);
    return blendedColor;
};

// Function to blend two colors based on a percentage
const blendColors = (color1: string, color2: string, percentage: number) => {
    const color1Hex = color1.replace("#", "");
    const color2Hex = color2.replace("#", "");

    const r1 = parseInt(color1Hex.substring(0, 2), 16);
    const g1 = parseInt(color1Hex.substring(2, 4), 16);
    const b1 = parseInt(color1Hex.substring(4, 6), 16);

    const r2 = parseInt(color2Hex.substring(0, 2), 16);
    const g2 = parseInt(color2Hex.substring(2, 4), 16);
    const b2 = parseInt(color2Hex.substring(4, 6), 16);

    const blendedR = Math.round(r1 + percentage * (r2 - r1));
    const blendedG = Math.round(g1 + percentage * (g2 - g1));
    const blendedB = Math.round(b1 + percentage * (b2 - b1));

    const blendedColorHex = `#${toHex(blendedR)}${toHex(blendedG)}${toHex(blendedB)}`;
    return blendedColorHex;
};

// Function to convert a decimal value to a two-digit hexadecimal string
const toHex = (value: number) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
};

// Define the color scale based on temperature values
const temperatureColorScale = {
    min: 10,
    max: 106,
    colors: ["#1c03fc", "#fc0303"],
};

interface IProps {
    countyData: CountyWeatherData[];
    selectedMonth: number;
}

const USCountyMap = (props : IProps) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(1);

  useEffect(() => {
    setSelectedMonth(props.selectedMonth);
  })

  return (
    <ComposableMap
      projection="geoAlbersUsa"
      className="centered.svg"
    >
      <Geographies geography={usCountiesGeoJSON}>
        {({ geographies }) =>
          geographies.map((geo) => {
            //console.log(countyData);
            //console.log(geo);
            const { NAME, STATE } = geo.properties;
            //console.log(NAME);
            //console.log(STATE);
            const county = props.countyData.find(
              (c) => c.County === NAME && c.State == STATE && c.Month === selectedMonth
            );
            // console.log(`CountyData Name: ${county?.County}; GeoJSON Name: ${NAME};
            //  CountyData State Code: ${county?.State}; GeoJSON State Code: ${STATE}
            //  County month: ${county?.Month}; selected Month: ${selectedMonth}`);
            const temperature = county ? county.AvgDailyMaxAirTempF : null;
            //console.log(temperature);

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={
                  temperature
                    ? getColorByTemperature(temperature, temperatureColorScale)
                    : "#CCCCCC"
                }
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default USCountyMap;