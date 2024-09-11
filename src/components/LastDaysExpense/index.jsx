import PropTypes from "prop-types";

import { headers, keyFn } from "../../constants/expenseOverviewTableConstants";
import SortableTable from "../SortableTable";

function LastDaysExpense({ expenseData, numberOfDays }) {
  let tableData;
  let tableBody;

  tableBody = expenseData.map((item) => {
    return {
      title: item.title,
      amount: item.amount,
      date: item.date,
      categoryId: item.categoryId,
    };
  });

  tableData = (
    <SortableTable headers={headers} body={tableBody} keyFn={keyFn} />
  );
  return (
    <div className="p-2">
      <div>Last {numberOfDays} days</div>
      <div>{tableData}</div>
    </div>
  );
}

LastDaysExpense.propTypes = {
  numberOfDays: PropTypes.number,
  expenseData: PropTypes.array,
};

export default LastDaysExpense;
