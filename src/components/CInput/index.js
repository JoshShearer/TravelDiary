
import React, { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for CInput
import CInputRoot from "./InputRoot";

const CInput = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <CInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

// Setting default values for the props of CInput
CInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the CInput
CInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default CInput;
