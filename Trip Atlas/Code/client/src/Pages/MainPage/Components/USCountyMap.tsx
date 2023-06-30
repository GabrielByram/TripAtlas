import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import CountyWeatherData from "../../../../../Models/county-weather";
import usCountiesGeoJSON from "../Maps/us-counties";
import "./USCountiesMap.css";

// Define the color scale based on temperature values
const temperatureColorScale = {
  min: 10,
  max: 107,
  colors: ["#1c03fc", "#fc0303"],
};

interface IProps {
  countyData: CountyWeatherData[];
  selectedMonth: number;
}

const USCountyMap = (props: IProps) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [countyDataMap, setCountyDataMap] = useState<Record<string, Record<number, CountyWeatherData>>>({});
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [selectedTemperature, setSelectedTemperature] = useState<number | string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setSelectedMonth(props.selectedMonth);
    preprocessCountyData(props.countyData);
  }, [props.selectedMonth, props.countyData]);

  const preprocessCountyData = (countyData: CountyWeatherData[]) => {
    const dataMap: Record<string, Record<number, CountyWeatherData>> = {};
    countyData.forEach((county) => {
      const key = `${county.County}, ${county.State}`;
      if (!dataMap[key]) {
        dataMap[key] = {};
      }
      dataMap[key][county.Month] = county;
    });
    setCountyDataMap(dataMap);
  };

  const getColorByTemperature = (temperature: number) => {
    const { min, max, colors } = temperatureColorScale;
    const normalizedTemperature = (temperature - min) / (max - min);
    const colorIndex = Math.floor(normalizedTemperature * (colors.length - 1));
    const colorPercentage = normalizedTemperature * (colors.length - 1) - colorIndex;
    const color1 = colors[colorIndex];
    const color2 = colors[colorIndex + 1];
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
  
  const handleClick = (geo: any, event: any) => {
    const { NAME, STATE } = geo.properties;
    const county = countyDataMap[`${NAME}, ${STATE}`]?.[selectedMonth];
    const temperature = county ? county.AvgDailyMaxAirTempF : null;
  
    setSelectedCounty(`${NAME}, ${STATE}`);
    setSelectedTemperature(temperature !== null ? temperature.toFixed(1) : 'N/A');
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div>
        <div className="container">
            <ComposableMap projection="geoAlbersUsa" className="centered.svg">
                 <Geographies geography={usCountiesGeoJSON}>
                    {({ geographies }) =>
                    geographies.map((geo) => {
                        let { NAME, STATE } = geo.properties;
                        STATE = parseInt(STATE);
                        const county = countyDataMap[`${NAME}, ${STATE}`]?.[selectedMonth];
                        const temperature = county ? county.AvgDailyMaxAirTempF : null;

                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={
                                selectedCounty === `${NAME}, ${STATE}`
                                    ? 'lightblue' // Apply a different color when selected
                                    : temperature
                                    ? getColorByTemperature(temperature)
                                    : '#CCCCCC'
                                }
                                onClick={(event) => handleClick(geo, event)} // Add the click event handler
                            />
                        );
                    })
                }
            </Geographies>
        </ComposableMap>
    </div>
    
    {selectedCounty && (
        <div
          className="selected-info"
          style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
        >
          <h6 style={{marginBottom:"0.1rem"}}>
            County: {
                selectedCounty.substring(0, selectedCounty.indexOf(",")) // Chop off state codes from county names
            }
            <br />
            Avg Temperature: {selectedTemperature}°F
          </h6>
        </div>
      )}
    </div>
  );
};

export default USCountyMap;