// src/components/WeatherDisplay.js
import React from "react";
import "../App.css";
const WeatherDisplay = ({
  weatherData,
  forecastData,
  unit,
  setUnit,
}) => {
  if (!weatherData)
    return (
      <div className="weatherDisplaySearch">
        Search for a city to display weather data.
      </div>
    );

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const getWeatherIcon = (description) => {
    switch (true) {
      case description.includes("clear"):
        return "☀️"; // Clear sky
      case description.includes("cloud"):
        return "☁️"; // Cloudy
      case description.includes("rain"):
        return "🌧️"; // Rainy
      case description.includes("drizzle"):
        return "🌦️"; // Drizzle
      case description.includes("thunderstorm"):
        return "⛈️"; // Thunderstorm
      case description.includes("snow"):
        return "❄️"; // Snow
      case description.includes("mist"):
      case description.includes("fog"):
        return "🌫️"; // Mist or fog
      default:
        return "🌈"; // Default icon
    }
  };

  const weatherIcon = getWeatherIcon(weatherData.weather[0].description.toLowerCase());


  return (
    <div className="weather-display">
      <div className="current-weather" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ textShadow: '2px 2px 5px rgba(255, 255, 255, 0.7)', color: 'black' }}>
          {weatherData.name}
        </h2>
        <div style={{ justifyContent: "space-between",flexDirection:'row',display:'flex',width:'25%',alignContent:'center',alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.3)', }}> 
        <p
          style={{
            textShadow: '2px 2px 5px rgba(255, 255, 255, 0.7)', color: 'black',
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {weatherData.weather[0].description} {weatherIcon}
        </p>
        {/* <p style={{ textShadow: '2px 2px 5px rgba(255, 255, 255, 0.7)', color: 'black', color: '#ffffffff', fontWeight: "bold", fontSize: "18px" }}>
            {weatherIcon}
          </p> */}
        <p
          style={{
            textShadow: '2px 2px 5px rgba(255, 255, 255, 0.7)', color: 'black',
            // color:'#ffffffff',
            fontSize: "18px",
          }}
        >
          {weatherData.main.temp} °{unit === "metric" ? "C" : "F"}
        </p>
        </div>
        <button
          onClick={toggleUnit}
          style={{
            marginLeft: "20px",
            height: "38px",
            width: "110px",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            fontWeight: "bold",
            fontSize: "16px",
            color: "#ffffff",
            backgroundColor: "#5cdcd2 ",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            marginTop: "10px",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#429e97")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#5cdcd2")}
        >
          Toggle to °{unit === "metric" ? "F" : "C"}
        </button>
      </div>
      <div className="forecast">
        <h3 style={{  textShadow: '2px 2px 5px rgba(255, 255, 255, 0.7)', color: 'black', }}>
          5-Day Forecast
        </h3>
        <div className="forecast-cards">
          {forecastData.map((day, index) => (
            <div key={index} className="forecast-card">
              <div style={{ height:'20px' }}>
                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
              </div>
              <div style={{ height:'40px',justifyContent:'center',alignItems:'center',display:'flex',marginTop:'20px'}}>
                <p>{day.weather[0].description}</p>
                <p style={{  textShadow: '2px 2px 5px rgba(255, 255, 255, 0.7)', color: 'black',  fontWeight: "bold", fontSize: "18px",marginLeft:'5px' }}>
            {weatherIcon}
          </p>
              </div>
              <div style={{ justifyContent:'center',alignItems:'center',display:'flex'}}>
                <p>{day.main.temp} °{unit === "metric" ? "C" : "F"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
