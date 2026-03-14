const districtCoordinates = require("../data/districtCoordinates.json");

/**
 * Get latitude and longitude for a given state and district.
 */
function getCoordinates(state, district) {
  const stateData = districtCoordinates[state];
  if (!stateData) {
    throw new Error(`State "${state}" not found in coordinates database.`);
  }

  const coords = stateData[district];
  if (!coords) {
    throw new Error(
      `District "${district}" not found in state "${state}". Available: ${Object.keys(stateData).join(", ")}`
    );
  }

  return coords;
}

/**
 * Fetch weather data from the Open-Meteo API for given coordinates.
 * Returns: { temperature, precipitation, humidity }
 */
async function fetchWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation,relativehumidity_2m`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Open-Meteo API responded with status ${response.status}`);
  }

  const data = await response.json();

  // Extract current temperature
  const temperature = data.current_weather?.temperature ?? null;

  // Calculate average precipitation from the hourly data (next 24 hours)
  const precipitationHourly = data.hourly?.precipitation || [];
  const next24h = precipitationHourly.slice(0, 24);
  const totalPrecipitation = next24h.reduce((sum, val) => sum + (val || 0), 0);

  // Calculate average humidity from the hourly data (next 24 hours)
  const humidityHourly = data.hourly?.relativehumidity_2m || [];
  const next24hHumidity = humidityHourly.slice(0, 24);
  const avgHumidity =
    next24hHumidity.length > 0
      ? Math.round(
          next24hHumidity.reduce((sum, val) => sum + (val || 0), 0) /
            next24hHumidity.length
        )
      : null;

  return {
    temperature: temperature,
    precipitation: Math.round(totalPrecipitation * 10) / 10,
    humidity: avgHumidity,
    windSpeed: data.current_weather?.windspeed ?? null,
    weatherCode: data.current_weather?.weathercode ?? null,
  };
}

/**
 * Get weather data for a specific district.
 * Combines coordinate lookup + API fetch.
 */
async function getWeatherForDistrict(state, district) {
  const { lat, lon } = getCoordinates(state, district);
  const weather = await fetchWeather(lat, lon);

  return {
    ...weather,
    location: { state, district, latitude: lat, longitude: lon },
  };
}

module.exports = {
  getCoordinates,
  fetchWeather,
  getWeatherForDistrict,
};
