import Button from "./Button";

function ButtonLight(props) {
   return (
      <Button className="light" onClick={props.onClick}>
         {props.children}
      </Button>
   );
}

export default ButtonLight;
