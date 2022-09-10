import "./Button.css";

function Button(props) {
   const handleClick = (e) => {
      e.target.blur(); // prevent key press from focusing the last clicked btn
      props.onClick();
   };

   const btnClass = props.className ? `btn ${props.className}` : "btn";

   return (
      <button className={btnClass} onClick={handleClick} tabIndex="-1">
         {props.children || props.value}
      </button>
   );
}

export default Button;
