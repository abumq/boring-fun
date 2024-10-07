"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const CLOCK_RADIUS = 180
const HAND_WIDTHS = { hour: 4, minute: 3, second: 2 }
const HAND_LENGTHS = { hour: 60, minute: 90, second: 120 }
const TACHOMETER_MARKS = [
  500, 400, 350, 300, 250, 200, 180, 160, 140, 130, 120, 110, 100, 90, 80, 70, 60, 55, 50, 45, 40, 35, 30,
]

export function AnalogStopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds
      .toString()
      .padStart(2, "0")}`
  }

  const handleStartStop = () => setIsRunning(!isRunning)

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  const handleLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, time])
    }
  }

  const renderClockFace = () => {
    const ticks = []
    for (let i = 0; i < 240; i++) {
      const angle = (i / 240) * 360
      const isMajorTick = i % 20 === 0
      const tickLength = isMajorTick ? 15 : 7
      ticks.push(
        <line
          key={i}
          x1={CLOCK_RADIUS + (CLOCK_RADIUS - tickLength) * Math.cos((angle * Math.PI) / 180)}
          y1={CLOCK_RADIUS + (CLOCK_RADIUS - tickLength) * Math.sin((angle * Math.PI) / 180)}
          x2={CLOCK_RADIUS + CLOCK_RADIUS * Math.cos((angle * Math.PI) / 180)}
          y2={CLOCK_RADIUS + CLOCK_RADIUS * Math.sin((angle * Math.PI) / 180)}
          stroke={isMajorTick ? "#FFFF00" : "#888888"}
          strokeWidth={isMajorTick ? 2 : 1}
        />
      )
    }
    return ticks
  }

  const renderHand = (type: "hour" | "minute" | "second") => {
    const ms = time % 60000
    const seconds = ms / 1000
    const minutes = seconds / 60
    const hours = minutes / 60

    const rotation =
      type === "hour"
        ? hours * 360
        : type === "minute"
        ? minutes * 360
        : type === "second"
        ? seconds * 360
        : 0

    return (
      <line
        x1={CLOCK_RADIUS}
        y1={CLOCK_RADIUS}
        x2={CLOCK_RADIUS + HAND_LENGTHS[type] * Math.sin((rotation * Math.PI) / 180)}
        y2={CLOCK_RADIUS - HAND_LENGTHS[type] * Math.cos((rotation * Math.PI) / 180)}
        stroke="#fff"
        strokeWidth={HAND_WIDTHS[type]}
        strokeLinecap="round"
      />
    )
  }

  const renderTachometer = () => {
    return TACHOMETER_MARKS.map((speed, index) => {
      const angle = (index / TACHOMETER_MARKS.length) * 360
      const x = CLOCK_RADIUS + (CLOCK_RADIUS - 30) * Math.cos((angle * Math.PI) / 180)
      const y = CLOCK_RADIUS + (CLOCK_RADIUS - 30) * Math.sin((angle * Math.PI) / 180)
      return (
        <text
          key={speed}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="#fff"
          fontWeight="bold"
        >
          {speed}
        </text>
      )
    })
  }

  return (
    <div className="flex flex-col items-center space-y-4 rounded-lg">
      <svg width={CLOCK_RADIUS * 2 + 40} height={CLOCK_RADIUS * 2 + 40} className="text-yellow-400">
        <circle cx={CLOCK_RADIUS} cy={CLOCK_RADIUS} r={CLOCK_RADIUS} fill="black" stroke="#333333" strokeWidth="4" />
        {renderClockFace()}
        {renderTachometer()}
        {/* Brand name */}
        <image href="/useless-tools.png" x="165" y="70" width="30" height="30" />
        <text x="185" y="120" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold" fontFamily="cursive">Useless</text>
        <text x="185" y="140" textAnchor="middle" fill="#ffff00" fontSize="12" fontFamily="monospace">Tools</text>
        {renderHand("hour")}
        {renderHand("minute")}
        {renderHand("second")}
        <circle cx={CLOCK_RADIUS} cy={CLOCK_RADIUS} r={4} fill="#FFFF00" />
      </svg>
      <div className="text-2xl font-bold text-black">{formatTime(time)}</div>
      <div className="flex space-x-2">
        <Button onClick={handleStartStop} className="bg-yellow-400 text-black hover:bg-yellow-500">
          {isRunning ? "Stop" : "Start"}
        </Button>
        <Button onClick={handleReset} className="bg-gray-600 text-white hover:bg-gray-700">
          Reset
        </Button>
        <Button onClick={handleLap} disabled={!isRunning} className="bg-gray-600 text-white hover:bg-gray-700">
          Lap
        </Button>
      </div>
      {laps.length > 0 && <ScrollArea className="h-[200px] w-[300px] rounded-md border border-gray-700">
        <div className="p-4">
          <h3 className="mb-4 text-lg font-semibold text-black">Laps</h3>
          {laps.map((lapTime, index) => (
            <div key={index} className="mb-2 text-black">
              Lap {index + 1}: {formatTime(lapTime)}
            </div>
          ))}
        </div>
      </ScrollArea>}
    </div>
  )
}