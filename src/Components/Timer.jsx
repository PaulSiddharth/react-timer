import { useEffect, useState } from "react";

function Timer({ initialCount = 0, isRunningGlobal, resetGlobal }) {
  const [localCounter, setLocalCounter] = useState(initialCount);
  const [isRunningLocal, setIsRunningLocal] = useState(isRunningGlobal); // Local start/stop

  // Reset when "Reset All" is clicked
  useEffect(() => {
    if (resetGlobal) {
      setLocalCounter(initialCount);
      setIsRunningLocal(false); // Stop after reset
    }
  }, [resetGlobal, initialCount]);

  // Sync local running state with global state
  useEffect(() => {
    setIsRunningLocal(isRunningGlobal);
  }, [isRunningGlobal]);

  // Timer logic
  useEffect(() => {
    if (!isRunningLocal) return;

    const interval = setInterval(() => {
      setLocalCounter((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunningLocal]);

  // Local start/stop
  const toggleLocalTimer = () => {
    setIsRunningLocal((prev) => !prev);
  };

  // Local reset
  const resetLocalTimer = () => {
    setLocalCounter(initialCount);
    // setIsRunningLocal(false);
  };

  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <h2>{localCounter}</h2>
      <button onClick={toggleLocalTimer}>{isRunningLocal ? "Stop" : "Start"}</button>
      <button onClick={resetLocalTimer}>Reset</button>
    </div>
  );
}

export default Timer;
