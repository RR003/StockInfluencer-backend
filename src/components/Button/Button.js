import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline", "btn--test"];

const SIZES = ["btn--medium", "btn--large"];

const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
  //Checks if buttonStyle is Styles, if not Styles[0]
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

  // Checks if buttonSize is in Sizes, if not SIZES[0]
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to="/sin-up" className="btn-mobile">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {/*
          whatever you put inside the button, it will render it
          Ex. <Button>Get Started</Button> -> Get Started is the children
        */}
        {children}
      </button>
    </Link>
  );
};

export default Button;
