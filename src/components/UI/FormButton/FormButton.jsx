import React from "react";
import PropTypes from "prop-types";

import "./form-button.css";

const FormButton = ({ className, name, type, onClick, text }) => {
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

FormButton.defaultProps = {
  className: "",
  name: "",
  type: "button",
  text: "",
  onClick: () => {},
};

FormButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default FormButton;
