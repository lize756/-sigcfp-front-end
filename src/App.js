import "./App.css";
import React from "react";
import MainCompany from "./config/routes/MainCompany";
//Redu
import { Provider} from "react-redux"
import store from "../src/components/store/index"

function App() {
  return (
    <Provider store={store}> {/**" All app store"*/}
      <div>
        <MainCompany />
      </div>
    </Provider>
  );
}

export default App;
