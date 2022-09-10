import { useContext, useEffect, useState, useRef } from "react";
import CalcContext from "./store/calc-context";

// Components
import Calc from "./Calc";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

// Styles
import "./App.css";

function App() {
   const [scale, setScale] = useState(1);
   const { keyboardHandler } = useContext(CalcContext);
   const appRef = useRef();

   useEffect(() => {
      window.onkeydown = keyboardHandler;
      window.onresize = debounceResize;

      fitAppSizeToContainer();
   }, []);

   const fitAppSizeToContainer = () => {
      const appWidth = appRef.current.offsetWidth,
         appHeight = appRef.current.offsetHeight,
         viewportWidth = document.body.offsetWidth,
         viewportHeight = document.body.offsetHeight;

      /* prettier-ignore */
      let scale = Math.min(
         viewportWidth / appWidth,
         viewportHeight / appHeight
      ).toFixed(2);

      setScale(scale);
   };

   const debounce = (func, timeout = 500) => {
      let timer;
      return () => {
         clearTimeout(timer);
         timer = setTimeout(() => {
            func();
         }, timeout);
      };
   };

   const debounceResize = debounce(() => fitAppSizeToContainer(), 100);

   return (
      <div className="App" style={{ transform: `scale(${scale})` }} ref={appRef}>
         <Header />
         <Calc />
         <Footer />
      </div>
   );
}

export default App;
