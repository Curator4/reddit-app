import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Canvas, AddGroup } from "./containers";
import "./App.css";

function App() {
  const display = useSelector((state) => state.addGroup.display);
  return (
    <div className="App">
      <Navbar />
      {display && <AddGroup />}
      <Canvas />
    </div>
  );
}

export default App;
