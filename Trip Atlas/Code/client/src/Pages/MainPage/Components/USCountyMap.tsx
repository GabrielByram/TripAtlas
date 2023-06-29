import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import CountyWeatherData from "../../../../../Models/county-weather";
import usCountiesGeoJSON from "../Maps/us-counties";

const USCountyMap = () => {
  const [countyData, setCountyData] = useState<CountyWeatherData[]>([]);

  useEffect(() => {
    getCountyWeather()
      .then((data) => {
        setCountyData(data);
      })
      .catch((error) => {
        console.error("Error fetching county data:", error);
      });
  }, []);

  const getCountyWeather = async () => {
    try {
      console.log("GETTING COUNTY WEATHER");
      const response = await fetch("http://localhost:3000/county-weather");
      const data = await response.json();
      return data as CountyWeatherData[];
    } catch (error) {
      throw new Error("Failed to fetch county weather data");
    }
  };

  // Function to determine the fill color based on temperature
  const getColorByTemperature = (
    temperature: number,
    colorScale: { min: number; max: number; colors: string[] }
  ) => {
    const { min, max, colors } = colorScale;
    const normalizedTemperature = (temperature - min) / (max - min);
    const colorIndex = Math.round(normalizedTemperature * (colors.length - 1));
    return colors[colorIndex];
  };

  // Define the color scale based on temperature values
  const temperatureColorScale = {
    min: 30,
    max: 100,
    colors: ["#FDE725", "#440154"],
  };

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={usCountiesGeoJSON}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const { NAME, STUSPS } = geo.properties;
            const county = countyData.find(
              (c) => c.county === NAME && c.state === STUSPS
            );
            const temperature = county ? county.avgDailyMaxAirTemp : null;

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