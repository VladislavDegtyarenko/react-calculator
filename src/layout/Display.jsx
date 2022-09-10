import { useContext, useEffect, useState, useRef } from "react";
import CalcContext from "../store/calc-context";

import "./Display.css";

function Display() {
   const calcCtx = useContext(CalcContext);
   const [scale, setScale] = useState(1);
   const [modalVisible, setModalVisible] = useState(false);

   const containerRef = useRef();
   const numberRef = useRef();

   const number = calcCtx.calc?.displayNumber;

   useEffect(() => {
      const containerWidth = containerRef.current.offsetWidth;
      const numberWidth = numberRef.current.offsetWidth;

      if (numberWidth > containerWidth) {
         let scale = ((1 / (numberWidth / containerWidth)) * 0.98).toFixed(5);

         setScale(scale);
      } else {
         setScale(1);
      }
   }, [calcCtx, scale]);

   const formatNumber = (number) => {
      const locale = navigator.language || "en-US";

      let formattedNumber = parseFloat(number)
         .toLocaleString(locale, {
            useGrouping: true,
            maximumFractionDigits: 9,
            notation: number > Math.pow(10, 12) ? "engineering" : "standard",
         })
         .toLowerCase();

      if (number[number.length - 1] === ".") formattedNumber += ".";

      return formattedNumber;
   };

   const copyToClipboard = () => {
      if (navigator?.clipboard) {
         navigator.clipboard.writeText(formatNumber(number));

         setModalVisible(true);

         setTimeout(() => setModalVisible(false), 1500);
      }
   };

   return (
      <div className="display" onClick={copyToClipboard} ref={containerRef} tabIndex="1">
         <span style={{ transform: `scale(${scale})` }} ref={numberRef}>
            {formatNumber(number)}
         </span>
         {modalVisible && <div className="display__modal">Copied</div>}
      </div>
   );
}

export default Display;
