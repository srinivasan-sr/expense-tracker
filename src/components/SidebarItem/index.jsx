import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function SidebarItem({ item, isSidebarLarge }) {
  const showItemText = (
    <div className="text-base self-baseline items-center pt-2">
      {item?.text}
    </div>
  );

  const linkIconText = <item.icon title={!isSidebarLarge && item.text} />;

  const linkItem = (
    <Link to={item?.link} className="flex">
      <div className="mr-1 text-blue-600 dark:text-gray-300">
        {linkIconText}
      </div>
      {isSidebarLarge && showItemText}
    </Link>
  );

  const plainIcon = !item?.link && (
    <div className="mr-1 text-blue-600 dark:text-gray-300">{linkIconText}</div>
  );

  return (
    <div key={item.id} className="flex mb-6">
      {item?.link ? linkItem : plainIcon}
    </div>
  );
}
SidebarItem.propTypes = {
  item: PropTypes.object,
  isSidebarLarge: PropTypes.bool,
};
