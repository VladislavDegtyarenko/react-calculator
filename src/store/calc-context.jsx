import { useState, createContext } from "react";

const initState = {
   displayNumber: "0",
   savedNumber: null,
   operatorType: null,
   lastPressedKeyType: null,
};

const CalcContext = createContext(initState);

export function CalcContextProvider(props) {
   const [calc, setCalc] = useState(initState);
   const [isScientificMode, setIsScientificMode] = useState(true);

   const allClear = () => {
      setCalc(initState);
   };

   const clearEntry = () => {
      setCalc((prevCalc) => ({
         ...prevCalc,
         displayNumber: "0",
      }));
   };

   const digitKeyPress = (value) => {
      setCalc((prevCalc) => {
         /* if (prevCalc.displayNumber.length > 12) return prevCalc; */

         let newDisplayNum = prevCalc.displayNumber;
         let newSavedNum;

         const keyIsDigit = !isNaN(value);
         const keyIsComma = value === ".";
         const commaIsNotSet = newDisplayNum.indexOf(".") === -1;

         if (prevCalc.lastPressedKeyType === "operator") {
            newSavedNum = newDisplayNum;
            newDisplayNum = "0";
         }

         if (prevCalc.lastPressedKeyType === "calcKey") {
            newDisplayNum = "0";
         }

         if (keyIsDigit) {
            newDisplayNum = newDisplayNum === "0" ? `${value}` : `${newDisplayNum}${value}`;
         }

         if (keyIsComma) {
            newDisplayNum = commaIsNotSet ? newDisplayNum + value : newDisplayNum;
         }

         return {
            ...prevCalc,
            displayNumber: newDisplayNum,
            savedNumber: newSavedNum || prevCalc.savedNumber,
            lastPressedKeyType: "digit",
         };
      });
   };

   const operatorKeyPress = (action) => {
      calculate();

      setCalc((prevCalc) => ({
         ...prevCalc,
         lastPressedKeyType: "operator",
         operatorType: action,
      }));
   };

   const calcKeyPress = () => {
      setCalc((prevCalc) => ({
         ...prevCalc,
         lastPressedKeyType: "calcKey",
      }));

      calculate();
   };

   const backspaceKeyPress = () => {
      setCalc((prevCalc) => {
         const { displayNumber } = prevCalc;

         if (displayNumber === "0") return prevCalc;

         const newDisplayNum = displayNumber.length > 1 ? displayNumber.substring(0, displayNumber.length - 1) : "0";

         return {
            ...prevCalc,
            displayNumber: newDisplayNum,
         };
      });
   };

   const calculate = () => {
      setCalc((prevCalc) => {
         let { displayNumber, savedNumber, operatorType } = prevCalc;

         if (!savedNumber) return prevCalc;

         let result;

         if (operatorType === "add") result = parseFloat(savedNumber) + parseFloat(displayNumber);
         if (operatorType === "subtract") result = parseFloat(savedNumber) - parseFloat(displayNumber);
         if (operatorType === "multiply") result = parseFloat(savedNumber) * parseFloat(displayNumber);
         if (operatorType === "divide") result = parseFloat(savedNumber) / parseFloat(displayNumber);

         if (Math.abs(result) === Infinity) {
            return {
               ...prevCalc,
               savedNumber: null,
               displayNumber: "Error",
            };
         }

         const maxDigits = Math.pow(10, 6);
         const roundedResult = Math.round(result * maxDigits) / maxDigits;

         return {
            ...prevCalc,
            operatorType: null,
            savedNumber: null,
            displayNumber: roundedResult,
         };
      });
   };

   const plusMinus = () => {
      setCalc((prevCalc) => {
         const prevNum = prevCalc.displayNumber;
         const newNum = prevNum[0] === "-" ? prevNum.substring(1) : "-" + prevNum;

         return {
            ...prevCalc,
            displayNumber: newNum,
         };
      });
   };

   const getPercent = () => {
      setCalc((prevCalc) => {
         const prevNum = prevCalc.displayNumber;
         const newNum = prevNum / 100;

         return {
            ...prevCalc,
            displayNumber: newNum.toString(),
         };
      });
   };

   const keyboardHandler = (e) => {
      const isDigits = !isNaN(e.key) || e.key === ".";
      const addKey = e.key === "+",
         subtractKey = e.key === "-",
         multiplyKey = e.key === "*",
         divideKey = e.key === "/";
      const enterKey = e.key === "Enter";
      const escKey = e.key === "Escape";
      const backspaceKey = e.key === "Backspace";

      if (isDigits) digitKeyPress(e.key);
      if (addKey) operatorKeyPress("add");
      if (subtractKey) operatorKeyPress("subtract");
      if (multiplyKey) operatorKeyPress("multiply");
      if (divideKey) operatorKeyPress("divide");
      if (enterKey) calculate();
      if (escKey) calc.displayNumber === "0" ? clearEntry() : allClear();
      if (backspaceKey) backspaceKeyPress();
   };

   const context = {
      calc,
      digitKeyPress,
      allClear,
      clearEntry,
      plusMinus,
      getPercent,
      operatorKeyPress,
      calcKeyPress,
      keyboardHandler,
      isScientificMode,
   };

   return <CalcContext.Provider value={context}>{props.children}</CalcContext.Provider>;
}

export default CalcContext;
