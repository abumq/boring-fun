"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type City = {
  name: string
  timezone: string
}

const cities: City[] = [
  { name: "Makkah", timezone: "Asia/Riyadh" },
  { name: "New York", timezone: "America/New_York" },
  { name: "London", timezone: "Europe/London" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Sydney", timezone: "Australia/Sydney" },
  { name: "Paris", timezone: "Europe/Paris" },
]

function CityClockCard({ city, onRemove, use24Hour, showSeconds }: {
  city: City,
  onRemove: () => void,
  use24Hour: boolean,
  showSeconds: boolean,
}) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = time.toLocaleTimeString("en-US", {
    timeZone: city.timezone,
    hour12: !use24Hour,
    hour: "numeric",
    minute: "numeric",
    second: showSeconds ? "numeric" : undefined,
  })

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{city.name}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <X className="h-4 w-4" />
          <span className="sr-only">Remove {city.name}</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedTime}</div>
      </CardContent>
    </Card>
  )
}

export function ClockPage() {
  const [selectedCities, setSelectedCities] = useState<City[]>([cities[0]])
  const [use24Hour, setUse24Hour] = useState(false)
  const [showSeconds, setShowSeconds] = useState(false)

  const addCity = (cityName: string) => {
    if (selectedCities.length < 3) {
      const cityToAdd = cities.find((city) => city.name === cityName)
      if (cityToAdd && !selectedCities.some((city) => city.name === cityName)) {
        setSelectedCities([...selectedCities, cityToAdd])
      }
    }
  }

  const removeCity = (cityToRemove: City) => {
    setSelectedCities(selectedCities.filter((city) => city !== cityToRemove))
  }

  return (
    <div className="mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold">World Clock</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {selectedCities.map((city) => (
          <CityClockCard
            key={city.name}
            city={city}
            onRemove={() => removeCity(city)}
            use24Hour={use24Hour}
            showSeconds={showSeconds}
          />
        ))}
      </div>
      {selectedCities.length < 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Add City</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={addCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {cities
                  .filter((city) => !selectedCities.some((selectedCity) => selectedCity.name === city.name))
                  .map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Customization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="24-hour" checked={use24Hour} onCheckedChange={setUse24Hour} />
            <Label htmlFor="24-hour">Use 24-hour format</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="show-seconds" checked={showSeconds} onCheckedChange={setShowSeconds} />
            <Label htmlFor="show-seconds">Show seconds</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}