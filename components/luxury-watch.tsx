'use client'

import { useState, useEffect } from 'react'
import { svgBrandName } from '@/lib/brand-name'

export const LuxuryWatch = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <svg width="400" height="400" viewBox="0 0 400 400">

        {/* Strap */}
        <rect x="150" y="0" width="100" height="500" fill="#222" />
        {[...Array(6)].map((_, i) => (
          <rect key={`strap-${i}`} x="150" y={i * 60 + 70} width="100" height="20" fill="#1a1a1a" />
        ))}

        {/* Watch case */}
        <circle cx="200" cy="200" r="199" fill="#333" />
        <circle cx="200" cy="200" r="195" fill="#111" />
        
        {/* Carbon fiber texture */}
        <defs>
          <pattern id="carbon" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="#111" />
            <path d="M0 0L4 4M4 0L0 4" stroke="#1a1a1a" strokeWidth="0.5" />
          </pattern>
        </defs>
        <circle cx="200" cy="200" r="190" fill="url(#carbon)" />
        
        {/* Tachymeter scale */}
        <circle cx="200" cy="200" r="188" fill="none" stroke="#333" strokeWidth="4" />
        {[...Array(24)].map((_, i) => {
          const angle = (i * 15 - 90) * Math.PI / 180
          const x1 = 200 + 188 * Math.cos(angle)
          const y1 = 200 + 188 * Math.sin(angle)
          const x2 = 200 + 184 * Math.cos(angle)
          const y2 = 200 + 184 * Math.sin(angle)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="2" />
        })}
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = ((i * 30) - 90) * Math.PI / 180
          const x = 200 + 165 * Math.cos(angle)
          const y = 200 + 165 * Math.sin(angle)
          return <rect key={i} x={x-2} y={y-7} width="4" height="14" fill="#fff" transform={`rotate(${i * 30}, ${x}, ${y})`} />
        })}
        
        {/* Minute markers */}
        {[...Array(60)].map((_, i) => {
          if (i % 5 !== 0) {
            const angle = ((i * 6) - 90) * Math.PI / 180
            const x1 = 200 + 165 * Math.cos(angle)
            const y1 = 200 + 165 * Math.sin(angle)
            const x2 = 200 + 170 * Math.cos(angle)
            const y2 = 200 + 170 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="1" />
          }
          return null
        })}
        
        {/* Subdials */}
        <circle cx="200" cy="260" r="30" fill="#222" stroke="#333" />
        <circle cx="140" cy="200" r="30" fill="#222" stroke="#333" />
        <circle cx="260" cy="200" r="30" fill="#222" stroke="#333" />
        
        {/* Subdial markers */}
        {[0, 1, 2].map((dialIndex) => {
          const cx = dialIndex === 0 ? 200 : dialIndex === 1 ? 140 : 260
          const cy = dialIndex === 0 ? 260 : 200
          return [...Array(12)].map((_, i) => {
            const angle = ((i * 30) - 90) * Math.PI / 180
            const x1 = cx + 25 * Math.cos(angle)
            const y1 = cy + 25 * Math.sin(angle)
            const x2 = cx + 30 * Math.cos(angle)
            const y2 = cy + 30 * Math.sin(angle)
            return <line key={`${dialIndex}-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="1" />
          })
        })}
        
        {/* Hands */}
        <line
          x1="200"
          y1="200"
          x2={200 + 100 * Math.cos(((time.getHours() % 12 + time.getMinutes() / 60) * 30 - 90) * Math.PI / 180)}
          y2={200 + 100 * Math.sin(((time.getHours() % 12 + time.getMinutes() / 60) * 30 - 90) * Math.PI / 180)}
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="200"
          y1="200"
          x2={200 + 140 * Math.cos((time.getMinutes() * 6 - 90) * Math.PI / 180)}
          y2={200 + 140 * Math.sin((time.getMinutes() * 6 - 90) * Math.PI / 180)}
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="200"
          y1="200"
          x2={200 + 150 * Math.cos((time.getSeconds() * 6 - 90) * Math.PI / 180)}
          y2={200 + 150 * Math.sin((time.getSeconds() * 6 - 90) * Math.PI / 180)}
          stroke="#ffff00"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Center cap */}
        <circle cx="200" cy="200" r="6" fill="#fff" />
        {svgBrandName(200)}
      </svg>
    </div>
  )
}
