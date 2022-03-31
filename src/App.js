import "./App.css";
import React from "react";
import MainCompany from "./config/routes/MainCompany";
//Redu
import { Provider } from "react-redux";
import { Store } from "../src/components/store/slices";

function App() {
  return (
    <Provider store={Store}> // All app store
      <div>
        <MainCompany />
      </div>
    </Provider>
  );
}

export default App;
