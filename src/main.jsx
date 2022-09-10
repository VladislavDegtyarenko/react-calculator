import React from "react";
import ReactDOM from "react-dom/client";
import { CalcContextProvider } from "./store/calc-context";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <CalcContextProvider>
         <App />
      </CalcContextProvider>
   </React.StrictMode>
);
