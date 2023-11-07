import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "./input-field.css";

const InputField = ({
  className,
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  touched,
  errors
}) => {
  // Local state to toggle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  }, []);

  return (
    <div className={`field-container ${className}`}>
      <label className="field-label" htmlFor={name}>
        {label}
      </label>

      <div className="input-wrapper">
        <input
          className={`field ${className}`}
          type={isPasswordVisible ? type : "text"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={placeholder}
        />

        {type === "password" && (
          <button
            type="button"
            className="icon-btn"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon
              className="eye-icon"
              icon={isPasswordVisible ? faEyeSlash : faEye}
            />
          </button>
        )}
      </div>

      <div className="error-msg">
        {touched?.[name] && errors?.[name] ? errors[name] : null}
      </div>
    </div>
  );
};

InputField.defaultProps = {
  className: '',
  label: '',
  type: 'text',
  name: '',
  value: '',
  onChange: () => { },
  placeholder: '',
  touched: {},
  errors: {},
};

InputField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  touched: PropTypes.shape({
    [PropTypes.string]: PropTypes.bool,
  }),
  errors: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }),
};

export default InputField;
