import "./index.css";
import className from "classnames";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";
import { GoSync } from "react-icons/go";

import * as Constants from "./constants";
function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  loading,
  ...props
}) {
  const classes = twMerge(
    className(props.className, "flex items-center px-3 py-1.5 border w-full", {
      "border-blue-500 bg-blue-500 text-white": primary,
      "border-gray-900 bg-gray-900 text-white": secondary,
      "border-green-500 bg-green-500 text-white": success,
      "border-yellow-400 bg-yellow-400 text-white": warning,
      "border-red-500 bg-red-500 text-white": danger,
      "rounded-full": rounded,
      "bg-white": outline,
      "text-blue-500": outline && primary,
      "text-gray-900": outline && secondary,
      "text-green-500": outline && success,
      "text-yellow-400": outline && warning,
      "text-red-500": outline && danger,
    })
  );
  return (
    <button {...props} disabled={loading} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);
    if (count > 1) {
      throw new Error(Constants.oneOfError);
    }
  },
  primary: PropTypes.any,
  secondary: PropTypes.any,
  success: PropTypes.any,
  warning: PropTypes.any,
  danger: PropTypes.any,
  outline: PropTypes.any,
  rounded: PropTypes.any,
  props: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.any,
  loading: PropTypes.any,
};
export default Button;
