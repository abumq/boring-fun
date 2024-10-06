'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Battery, Wifi, SignalHigh } from "lucide-react"

export function IosCalculator() {
  const [display, setDisplay] = useState('0')
  const [operation, setOperation] = useState<null | string>(null)
  const [prevValue, setPrevValue] = useState<null | number>(null)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const handleNumberClick = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num)
      setShouldResetDisplay(false)
    } else {
      setDisplay((prev) => (prev === '0' ? num : prev + num))
    }
  }

  const handleOperationClick = (op: null | string) => {
    if (operation && !shouldResetDisplay) {
      handleEquals()
    }
    setOperation(op)
    setPrevValue(parseFloat(display))
    setShouldResetDisplay(true)
  }

  const handleEquals = () => {
    if (!operation || shouldResetDisplay || prevValue === null) return

    const current = parseFloat(display)
    let result = 0
    switch (operation) {
      case '+':
        result = prevValue + current
        break
      case '-':
        result = prevValue - current
        break
      case '×':
        result = prevValue * current
        break
      case '÷':
        result = prevValue / current
        break
      default:
        return
    }
    setDisplay(result.toString())
    setOperation(null)
    setPrevValue(null)
    setShouldResetDisplay(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setOperation(null)
    setPrevValue(null)
    setShouldResetDisplay(false)
  }

  const buttonClass = "w-[76px] h-[76px] rounded-full font-medium text-[34px] transition-all duration-200 ease-in-out transform hover:brightness-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  const numberButtonClass = `${buttonClass} bg-[#333333] text-white`
  const operationButtonClass = `${buttonClass} bg-[#ff9f0a] text-white`
  const functionButtonClass = `${buttonClass} bg-[#a5a5a5] text-black`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
      <div className="bg-black border-[14px] border-black rounded-[50px] overflow-hidden shadow-2xl w-[375px]">
        <div className="relative bg-black text-white h-[812px] w-[347px] rounded-[36px] overflow-hidden font-sans">
          {/* Top Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[148px] h-[28px] bg-black rounded-b-[14px] z-20"></div>
          
          {/* Status Bar */}
          <div className="relative z-10 px-6 py-2 flex justify-between items-center">
            <div className="text-sm font-medium">9:41</div>
            <div className="flex items-center space-x-2">
              <SignalHigh size={16} />
              <Wifi size={16} />
              <Battery size={24} />
            </div>
          </div>
          
          {/* Calculator Body */}
          <div className="p-4 pt-12">
            <div className="mb-6 p-4">
              <div className="text-right text-[80px] font-light text-white overflow-x-auto whitespace-nowrap">
                {display}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Button className={functionButtonClass} onClick={handleClear}>
                {prevValue ? 'C' : 'AC'}
              </Button>
              <Button className={functionButtonClass} onClick={() => setDisplay((prev) => (parseFloat(prev) * -1).toString())}>
                +/-
              </Button>
              <Button className={functionButtonClass} onClick={() => setDisplay((prev) => (parseFloat(prev) / 100).toString())}>
                %
              </Button>
              <Button className={operationButtonClass} onClick={() => handleOperationClick('÷')}>÷</Button>
              
              <Button className={numberButtonClass} onClick={() => handleNumberClick('7')}>7</Button>
              <Button className={numberButtonClass} onClick={() => handleNumberClick('8')}>8</Button>
              <Button className={numberButtonClass} onClick={() => handleNumberClick('9')}>9</Button>
              <Button className={operationButtonClass} onClick={() => handleOperationClick('×')}>×</Button>
              
              <Button className={numberButtonClass} onClick={() => handleNumberClick('4')}>4</Button>
              <Button className={numberButtonClass} onClick={() => handleNumberClick('5')}>5</Button>
              <Button className={numberButtonClass} onClick={() => handleNumberClick('6')}>6</Button>
              <Button className={operationButtonClass} onClick={() => handleOperationClick('-')}>-</Button>
              
              <Button className={numberButtonClass} onClick={() => handleNumberClick('1')}>1</Button>
              <Button className={numberButtonClass} onClick={() => handleNumberClick('2')}>2</Button>
              <Button className={numberButtonClass} onClick={() => handleNumberClick('3')}>3</Button>
              <Button className={operationButtonClass} onClick={() => handleOperationClick('+')}>+</Button>
              
              <Button className={`${numberButtonClass} col-span-2 w-[164px] flex justify-start pl-7`} onClick={() => handleNumberClick('0')}>0</Button>
              <Button className={numberButtonClass} onClick={() => handleNumberClick('.')}>.</Button>
              <Button className={operationButtonClass} onClick={handleEquals}>=</Button>
            </div>
          </div>
          
          {/* Bottom Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-1 bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}