import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const getWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true`);
      const data = await response.json();
      console.log(data); 
      setWeather(data.current_weather); 
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 flex justify-center items-center">
      <div className="bg-white rounded-xl p-8 shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Weather Now</h1>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter City Name"
            value={city}
            onChange={handleCityChange}
          />
        </div>
        <button
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={getWeather}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {weather && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Current Weather</h2>
            <p className="mt-2">Temperature: {weather.temperature}°C</p>
            <p>Wind Speed: {weather.windspeed} km/h</p>
            <p>Weather Code: {weather.weathercode}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
