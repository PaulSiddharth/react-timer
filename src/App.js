import './App.css';
import Timer from './Components/Timer';
import { useState } from 'react';

function App() {

  const [timers, setTimers] = useState([{ id: 1 }]); // Initialize with one timer
  const [isRunningGlobal, setIsRunningGlobal] = useState(true); // Global start/stop
  const [resetGlobal, setResetGlobal] = useState(false); // Global reset trigger

   // Start/Stop all timers globally
   const toggleTimers = () => {
    setIsRunningGlobal((prev) => !prev);
  };

  // Reset all timers globally
  const resetTimers = () => {
    setResetGlobal(true);
    setTimeout(() => setResetGlobal(false), 10); // Reset back after triggering
    setIsRunningGlobal(false);

  };

  // Function to add a new timer
  const addTimer = () => {
    setTimers((prevTimers) => [...prevTimers, { id: prevTimers.length + 1 }]);
  };


  return (
    <div className="App">
        <h1> Timer project</h1>
        <button onClick={toggleTimers}>{isRunningGlobal ? "Stop All" : "Start All"}</button>
      <button onClick={addTimer}>Add</button>
      <button onClick={resetTimers}>Reset All</button>

        {timers.map((timer) => (
          <Timer key={timer.id} initialCount={0} isRunningGlobal={isRunningGlobal} resetGlobal={resetGlobal} />
        ))}
    </div>
  );
}

export default App;
