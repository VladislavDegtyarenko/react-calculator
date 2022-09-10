import { useContext } from "react";
import CalcContext from "../../store/calc-context";

import ButtonLight from "../../ui/ButtonLight";

function Clear() {
   const { allClear, clearEntry, calc } = useContext(CalcContext);

   if (calc.displayNumber === "0") {
      return <ButtonLight onClick={allClear}>AC</ButtonLight>;
   }

   return <ButtonLight onClick={clearEntry}>C</ButtonLight>;
}

export default Clear;
