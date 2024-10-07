import { NextRequest, NextResponse } from 'next/server';

const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

const getWindDirection = (degree: number) => directions[Math.round(degree / 45) % 8]

export async function GET(req: NextRequest) {
  // Extract cities from the query parameters
  const { searchParams } = new URL(req.url);
  const cities = searchParams.getAll('cities[]');
  
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

  // Set cache control headers for 20 minutes (1200 seconds)
  const response = NextResponse.json(data);
  response.headers.set('Cache-Control', 's-maxage=1200, stale-while-revalidate=600');
  
  return response;
}
