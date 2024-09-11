import "./index.css";
import { Fragment } from "react";
import PropTypes from "prop-types";

function Table({ headers, body, keyFn }) {
  const tableHeaders = headers.map((item) => {
    if (item.header) {
      return <Fragment key={item.id}>{item.header()}</Fragment>;
    }
    return (
      <th className="p-5" key={item.id}>
        {item.name}
      </th>
    );
  });

  const tableBody = body.map((rowData) => {
    const renderedCells = headers.map((column) => (
      <td className="p-2" key={column.id}>
        {column.render(rowData)}
      </td>
    ));
    return (
      <tr key={keyFn(rowData)} className="border-b">
        {renderedCells}
      </tr>
    );
  });

  return (
    <div>
      <table className="table-auto border-spacing-2">
        <thead>
          <tr className="border-b-2">{tableHeaders}</tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
}
Table.propTypes = {
  headers: PropTypes.array,
  body: PropTypes.array,
  keyFn: PropTypes.func,
};
export default Table;
