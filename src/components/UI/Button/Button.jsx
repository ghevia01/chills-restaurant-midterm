import React from "react";
import PropTypes from "prop-types";

import "./button.css";

const Button = ({ className, name, type, onClick, text }) => {
  return (
    <button
      className={`button ${className}`}
      name={name}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  className: "",
  name: "",
  type: "button",
  text: "",
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
