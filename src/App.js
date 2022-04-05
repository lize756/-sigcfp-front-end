import { Provider } from "react-redux";
import "./App.css";
import React from "react";
import MainCompany from "./config/routes/MainCompany";
import MainLocation from "./config/routes/MainLocation";

function App() {
  return (
    <div>
      <MainCompany />
      <MainLocation />
    </div>
  );
}

export default App;
