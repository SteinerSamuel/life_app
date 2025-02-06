"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";

export default function Timer() {
  const [workDuration, setWorkDuration] = useState<number | string>(0);
  const [breakDuration, setBreakDuration] = useState<number | string>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [pomoCounter, setPomoCounter] = useState<number>(0);
  const [doroCounter, setDoroCounter] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPomo, setIsPomo] = useState<boolean>(false);
  const [isDoro, setIsDoro] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof workDuration === "number" && workDuration > 0) {
      setTimeLeft(workDuration * 60);
      setIsActive(false);
      setIsPaused(false);
      console.log(workDuration); 
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }

    if (!isPomo && !isDoro){
      setIsPomo(true);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setIsPomo(false);
    setIsDoro(false);
    setPomoCounter(0);
    setDoroCounter(0);
    setTimeLeft(typeof workDuration === "number" ? workDuration * 60 : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  
  useEffect(() => {
    if (isActive && !isPaused) {
      
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            console.log(isPomo);
            console.log(isDoro);
            
            // setIsActive(false);
            // setIsPaused(true);
            
            if (isPomo) {
              setIsPomo(() => false);
              setIsDoro(() => true);
              setPomoCounter(pomoCounter + 1);
              setTimeLeft(breakDuration * 60);
              return
            } else {
              setIsPomo(() => true);
              setIsDoro(() => false);
              setDoroCounter(doroCounter + 1);
              setTimeLeft(workDuration * 60);
              return
            }
          }
          return prevTime - 1;
        });
      }, 1000);
      return
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);
  
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time/ 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  
  const handleWorkDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWorkDuration(Number(e.target.value) || "");
  };

  const handleBreakDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setBreakDuration(Number(e.target.value) || "");
  };
  
  return (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2> {isDoro ? "" : "Pomo" }{isPomo ? "": "Doro"} </h2> 
        <div className="flex items-center mb-6">
        <input 
            className="bg-transparent border border-slate-200 rounded-md px-2 py-2 transition duration-300 ease [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-12" 
            id="duration"
            type="number"
            placeholder="0"
            value={workDuration}
            onChange={handleWorkDurationChange}
            disabled={isPomo || isDoro}
          />
          <input
            className="bg-transparent border border-slate-200 rounded-md px-2 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-12 mx-2"
            id="duration"
            type="number"
            placeholder="0"
            value={breakDuration}
            onChange={handleBreakDurationChange}
            disabled={isPomo || isDoro}
        />
          <button 
            onClick={handleSetDuration}
            className="text-gray-800 dark:text-gray-200 border border-slate-200 px-3 py-2 rounded-md mx-1"
          >
          Set
          </button>
        </div>
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleStart}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            {isPaused ? "Resume" : "Start"}
          </button>
          <button
            onClick={handlePause}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Pause
          </button>
          <button
            onClick={handleReset}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Reset
          </button>
        </div>
      You've done {pomoCounter} work periods and {doroCounter} break periods
      </div>
  </div>
  )
}
