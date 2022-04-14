import "./App.css";
import React from "react";
import MainCompany from "./config/routes/MainCompany";
import MainLocation from "./config/routes/MainLocation";
//Redu
import { Provider} from "react-redux"
import store from "../src/components/store/index"

function App() {
  return (
    <Provider store={store}> {/**" All app store"*/}
      <div>
        <MainCompany />
        <MainLocation/>
      </div>
    </Provider>
  );
}

export default App;
