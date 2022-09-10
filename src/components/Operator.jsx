import { useContext } from "react";
import CalcContext from "../store/calc-context";
import Button from "../ui/Button";

function Operator(props) {
   const { action } = props;

   const calcCtx = useContext(CalcContext);

   const operatorClickHandler = () => {
      if (action === "calculate") {
         calcCtx.calcKeyPress();
      } else {
         calcCtx.operatorKeyPress(action);
      }
   };

   const isPressed = calcCtx.calc.operatorType === action && calcCtx.calc.lastPressedKeyType === "operator";

   return (
      <Button className={"accent" + (isPressed ? " active" : "")} onClick={operatorClickHandler}>
         {props.children}
      </Button>
   );
}

export default Operator;
