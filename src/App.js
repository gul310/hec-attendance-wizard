import { useState } from "react";
import AttendanceCalculator from "./components/AttendanceCalculator";
import "./index.css";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className={theme}>
      <AttendanceCalculator
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}

export default App;
