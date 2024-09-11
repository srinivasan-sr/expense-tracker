import { useState } from "react";
import PropTypes from "prop-types";

function SearchBox({ onChange }) {
  const [searchBoxText, setSearchBoxText] = useState("");
  const handleSearchBoxTextChange = (event) => {
    setSearchBoxText(event.target.value);
    onChange(event.target.value);
  };
  const handleTextBoxFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="p-3 border-t-2 border-r-2 border-l-2 rounded-t dark:bg-slate-800">
      <form onSubmit={handleTextBoxFormSubmit}>
        <input
          type="search"
          placeholder="Type to search..."
          className="border-neutral-200 p-1 w-40 placeholder:italic dark:bg-slate-700 dark:text-stone-300"
          value={searchBoxText}
          onChange={handleSearchBoxTextChange}
        />
      </form>
    </div>
  );
}
SearchBox.propTypes = {
  onChange: PropTypes.func,
};
export default SearchBox;
