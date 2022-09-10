import { useContext } from "react";
import CalcContext from "../store/calc-context";

import Button from "../ui/Button";

function Digit(props) {
   const calcCtx = useContext(CalcContext);

   const digitClick = () => calcCtx.digitKeyPress(props.value);

   return (
      <Button onClick={digitClick} className={`${props.wide ? "wide" : ""}`}>
         {props.children || props.value}
      </Button>
   );
}

export default Digit;
