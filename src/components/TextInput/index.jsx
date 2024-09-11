import PropTypes from "prop-types";
import { useState } from "react";

export default function TextInput({ type, placeholder, onChange, ...props }) {
  const [value, setValue] = useState("");
  const handleOnInputChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder || "Default"}
        className="border rounded dark:text-white dark:bg-gray-600 p-2"
        value={value}
        onChange={handleOnInputChange}
        {...props}
      />
    </div>
  );
}

TextInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  props: PropTypes.any,
};
