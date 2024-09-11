import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import SearchBox from "./searchbox";

function Dropdown({ items, openByDefault, onChange, ...props }) {
  const divEl = useRef();

  const [itemsList, setItemsList] = useState(items || []);
  const [isDropdownVisible, setIsDropdownVisible] = useState(
    openByDefault || false
  );
  const [selectedItemTitle, setSelectedItemTitle] = useState("Select");
  const [searchBoxData, setSearchBoxData] = useState("");

  var list = itemsList.map((item) => {
    return (
      <div
        className="p-3 cursor-pointer rounded hover:bg-slate-200 border-slate-300 dark:hover:bg-slate-800 flex"
        key={item.id}
        id={item.id}
        onClick={() => handleSelectedOption(item)}
      >
        {item?.color && (
          <span
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: `${item?.color}`,
              borderRadius: "50%",
              marginRight: "3px",
            }}
          ></span>
        )}
        {item.label}
      </div>
    );
  });

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.body.addEventListener("click", handler, true);

    // remove the event listener as part of cleanup.
    return () => {
      document.body.removeEventListener("click", handler);
    };
  }, []);

  useEffect(() => {
    const searchBoxTextLowercase = searchBoxData.toLocaleLowerCase();
    if (searchBoxData?.length) {
      list = items.filter((item) => {
        let matchCount = item.label
          .toLocaleLowerCase()
          .indexOf(searchBoxTextLowercase);
        if (matchCount > -1) {
          return item;
        }
      });
      setItemsList(list);
    } else {
      setItemsList(items);
    }
  }, [searchBoxData]);

  useEffect(() => {
    if (!isDropdownVisible) {
      setItemsList(items);
    }
  }, [isDropdownVisible, items]);
  const onSearchBoxTextChange = (value) => {
    setSearchBoxData(value);
  };
  const handleDropdownDisplay = () => {
    setIsDropdownVisible((currentlyOpen) => !currentlyOpen);
  };
  const handleSelectedOption = (item) => {
    handleDropdownDisplay();
    setSelectedItemTitle(item.label);
    onChange(item);
  };

  return (
    <div className="w-48 relative" ref={divEl} {...props}>
      <div
        className="flex justify-between p-3 cursor-pointer border"
        onClick={handleDropdownDisplay}
      >
        <div>{selectedItemTitle}</div>
        <div>{isDropdownVisible ? <FaAngleUp /> : <FaAngleDown />}</div>
      </div>
      {isDropdownVisible && (
        <div className="absolute z-50">
          <SearchBox onChange={onSearchBoxTextChange} />
          <div className="top-full border-r-2 border-l-2 border-b-2 rounded-b bg-white w-48 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-800">
            {list.length ? (
              list
            ) : (
              <div className="text-neutral-400 p-3">No results</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
Dropdown.propTypes = {
  openByDefault: PropTypes.bool,
  onChange: PropTypes.func,
  items: PropTypes.array,
};
export default Dropdown;
