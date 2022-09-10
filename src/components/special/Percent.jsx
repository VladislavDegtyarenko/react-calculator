import { useContext } from "react";
import CalcContext from "../../store/calc-context";

import ButtonLight from "../../ui/ButtonLight";

function Percent() {
   const { getPercent } = useContext(CalcContext);

   return <ButtonLight onClick={getPercent}>%</ButtonLight>;
}

export default Percent;
