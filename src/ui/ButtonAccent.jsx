import Button from "./Button";

function ButtonAccent(props) {
   return (
      <Button className="accent" onClick={props.onClick}>
         {props.children}
      </Button>
   );
}

export default ButtonAccent;
