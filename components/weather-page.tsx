"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from "lucide-react"

interface WeatherData {
  city: string
  temp: number
  condition: string
  windSpeed: number
  windDirection: string
}

export function WeatherPage() {

  const directionArrows = new Map([
    ['N', '↑'],    // North
    ['NE', '↗'],   // North-East
    ['E', '→'],    // East
    ['SE', '↘'],   // South-East
    ['S', '↓'],    // South
    ['SW', '↙'],   // South-West
    ['W', '←'],    // West
    ['NW', '↖']    // North-West
  ]);

  const [cities, setCities] = useState<string[]>([])
  const [newCity, setNewCity] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])

  useEffect(() => {

    const fetchWeatherData = async () => {
      const queryParams = cities.map((city) => `cities[]=${encodeURIComponent(city)}`).join('&');
    
      const response = await fetch(`/api/weather?${queryParams}`);
      const data = await response.json();
    
      setWeatherData(data.filter(Boolean));
    };

    if (cities.length > 0) {
      fetchWeatherData()
    }
  }, [cities])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="h-12 w-12 text-yellow-400" />
      case 'clouds':
        return <Cloud className="h-12 w-12 text-gray-400" />
      case 'rain':
        return <CloudRain className="h-12 w-12 text-blue-400" />
      case 'snow':
        return <CloudSnow className="h-12 w-12 text-blue-200" />
      default:
        return <Cloud className="h-12 w-12 text-gray-400" />
    }
  }

  const handleAddCity = () => {
    if (newCity && cities.length < 2) {
      setCities([...cities, newCity])
      setNewCity("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddCity();
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Weather</h1>
        <div className="flex mb-4">
          <Input
            type="text"
            placeholder="Enter city name"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mr-2"
          />
          <Button onClick={handleAddCity} disabled={cities.length >= 2}>
            Add City
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weatherData.map((data) => (
            <Card key={data.city} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardTitle>{data.city}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">{data.temp}°C</div>
                  {getWeatherIcon(data.condition)}
                </div>
                <div className="mt-4">
                  <p className="text-lg">{data.condition}</p>
                  <div className="flex items-center mt-2">
                    <Wind className="h-5 w-5 mr-2" />
                    <span>
                      {data.windSpeed} m/s {directionArrows.get(data.windDirection) ?? 'U'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}