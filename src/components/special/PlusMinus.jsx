import { useContext } from "react";
import CalcContext from "../../store/calc-context";

import ButtonLight from "../../ui/ButtonLight";

function PlusMinus() {
   const { plusMinus } = useContext(CalcContext);

   return <ButtonLight onClick={plusMinus}>&plusmn;</ButtonLight>;
}

export default PlusMinus;
