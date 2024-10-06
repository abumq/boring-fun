import { NextRequest, NextResponse } from 'next/server';

const getWindDirection = (degree: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions[Math.round(degree / 45) % 8]
}

export async function GET(req: NextRequest) {
  // Extract cities from the query parameters
  const { searchParams } = new URL(req.url);
  const cities = searchParams.getAll('cities[]');
  
  // Use your environment variable for the API key
  const API_KEY = process.env.WEATHER_API_KEY;

  // Fetch data for all cities
  const data = await Promise.all(
    cities.map(async (city) => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const result = await response.json();
      if (!result.main) {
        return null;
      }
      return {
        city: result.name,
        temp: Math.round(result.main.temp),
        condition: result.weather[0].main,
        windSpeed: Math.round(result.wind.speed),
        windDirection: getWindDirection(result.wind.deg),
      };
    })
  );

  // Return the fetched weather data
  return NextResponse.json(data);
}
