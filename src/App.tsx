import { useState } from "react";
import Demo from "../dist/react-auto-scroll-list.es";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Demo />
    </div>
  );
}

export default App;
