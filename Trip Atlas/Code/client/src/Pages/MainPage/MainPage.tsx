import USCountyMap from "./Components/USCountyMap";
import SideBarContent from "./Components/SidebarContent";
import CountyWeatherData from "../../../../Models/county-weather";
import "./MainPage.css";
import { useState, useEffect } from "react"
import Sidebar from "react-sidebar";
import { slide as Menu } from 'react-burger-menu'
import { Button, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'


function MainPage() {
  //const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [countyData, setCountyData] = useState<CountyWeatherData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);

  useEffect(() => {
    getCountyWeather()
      .then((data) => {
        setCountyData(data);
        console.log(countyData);
      })
      .catch((error) => {
        console.error("Error fetching county data:", error);
      });
  }, []);

  useEffect(() => {
    console.log(`SELECTED MONTH IN MAIN PAGE SET TO ${selectedMonth}`);
  }, [selectedMonth])

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

  return (
    <div>
      <Menu
        width={"300px"}
      >
        <div>
          <SideBarContent
            setSelectedMonth={setSelectedMonth}
          />
        </div>
      </Menu>
      <div className="container">
        <USCountyMap countyData={countyData} selectedMonth={selectedMonth} />
      </div>
    </div>
  );
}

export default MainPage;