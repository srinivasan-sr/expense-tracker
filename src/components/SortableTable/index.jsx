import PropTypes from "prop-types";
import Table from "../Table";
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";

import useSort from "../../hooks/use-sort";

function SortableTable(props) {
  const { headers, body } = props;
  const { sortedData, sortByColumn, sortOrder, sortBy } = useSort(
    headers,
    body
  );

  const getIcons = (columnId, sortBy, sortOrder) => {
    const iconToShowMap = {
      asc: <TiArrowSortedUp />,
      desc: <TiArrowSortedDown />,
      null: <TiArrowUnsorted />,
    };

    if (columnId !== sortBy) {
      return <TiArrowUnsorted />;
    }
    if (columnId === sortBy) {
      return iconToShowMap[sortOrder];
    }
  };

  const sortableHeaders = headers.map((column) => {
    if (!column.sortValue) {
      return column;
    } else {
      return {
        ...column,
        header: () => (
          <th
            className="cursor-pointer hover:bg-gray-100 item"
            onClick={() => sortByColumn(column.id)}
          >
            <div className="flex items-center justify-center">
              {column.name}
              {getIcons(column.id, sortBy, sortOrder)}
            </div>
          </th>
        ),
      };
    }
  });

  return <Table {...props} headers={sortableHeaders} body={sortedData} />;
}
SortableTable.propTypes = {
  headers: PropTypes.array,
  body: PropTypes.array,
};
export default SortableTable;
