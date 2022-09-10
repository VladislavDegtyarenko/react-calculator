import Clear from "../components/special/Clear";
import PlusMinus from "../components/special/PlusMinus";
import Percent from "../components/special/Percent";

import Operator from "../components/Operator";
import Digit from "../components/Digit";
import "./Controls.css";

function Controls() {
   return (
      <div className="controls">
         <Clear />
         <PlusMinus />
         <Percent />
         <Operator action="divide">&divide;</Operator>

         <Digit value={7} />
         <Digit value={8} />
         <Digit value={9} />
         <Operator action="multiply">&times;</Operator>

         <Digit value={4} />
         <Digit value={5} />
         <Digit value={6} />
         <Operator action="subtract">&minus;</Operator>

         <Digit value={1} />
         <Digit value={2} />
         <Digit value={3} />
         <Operator action="add">&#43;</Operator>

         <Digit value={0} wide>
            0
         </Digit>
         <Digit value={"."}>,</Digit>
         <Operator action="calculate">=</Operator>
      </div>
   );
}

export default Controls;
