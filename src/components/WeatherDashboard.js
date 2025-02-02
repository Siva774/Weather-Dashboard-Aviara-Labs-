import React, { useState, useEffect, useCallback } from 'react';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';
import axios from 'axios';
import '../App.css';

const WeatherDashboard = ({setBackgroundImage,backgroundImage}) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [favorites, setFavorites] = useState([
    "city"
  ]);
  const [unit, setUnit] = useState('metric'); // Celsius by default
  // const [backgroundImage, setBackgroundImage] = useState('');

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  console.log('unnit---->',favorites);
  
  // Fetch current weather and forecast data
  const fetchWeather = async (city,unit) => {
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`);
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data.list.slice(0, 5)); // 5-day forecast
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

 

  // City Image 
  const getCityImage = async (city) => {
    console.log('called',city);
    
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: city, client_id: UNSPLASH_ACCESS_KEY, orientation: 'landscape' },
      });
      const randomIndex = Math.floor(Math.random() * response.data.results.length);

      const cityImage = response.data.results[randomIndex];
      // console.log('cityImage URL:', cityImage.urls.full);
      return cityImage ? cityImage.urls.full : null;
    } catch (error) {
      console.error("Error fetching city image:", error);
      return null;
    }
  };

  // Fetch image when the city changes
  useEffect(() => {
    if (city) {
      getCityImage(city).then((imageUrl) => {
        setBackgroundImage(imageUrl);
      });
    }
    if(unit){
      fetchWeather(city,unit);
    }
  }, [city,unit]); 


  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); 
    }
  };

  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter(favCity => favCity !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); 
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div  style={{ position: 'relative', zIndex: 1, }}>
      <h1 style={{ textShadow: '2px 2px 5px rgba(255, 255, 255, 0.7)', color: 'black' }}>
  Weather Dashboard
</h1>

      <Search setCity={setCity} fetchWeather={fetchWeather} />
      <WeatherDisplay weatherData={weatherData} forecastData={forecastData} unit={unit} setUnit={setUnit} imageUrl={backgroundImage} />
      <Favorites favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite} fetchWeather={fetchWeather} getCityImage={getCityImage} city={city}setCity={setCity} />
    </div>
  );
};

export default WeatherDashboard;
