import { useState } from "react";
import QuickAddExpense from "../../components/QuickAddExpense";
import LastDaysExpense from "../../components/LastDaysExpense";
import StackedBarChart from "../../components/Charts/StackedBarChart";
import PieChart from "../../components/Charts/PieChart";
import { useFetchExpensesQuery } from "../../store";
import { getExpenseForDays } from "../../utils/expenseFilterHelper";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
function DashboardPage() {
  const user = { id: 1 };
  const numberOfDays = 7;
  const { data, error, isLoading } = useFetchExpensesQuery(user);
  const [showGroupedData, setShowGroupedData] = useState(false);
  const handleToggle = () => {
    setShowGroupedData(!showGroupedData);
  };

  let expenseData;

  let content;

  if (isLoading) {
    content = "Loading...";
  } else if (error) {
    content = "Error occurred";
  } else {
    expenseData = getExpenseForDays(data, numberOfDays);
    content = (
      <>
        <div className="w-1/2">
          <LastDaysExpense
            expenseData={expenseData}
            numberOfDays={numberOfDays}
          />
        </div>
        <div className="w-1/2">
          <div className="flex items-center float-right justify-between w-1/3">
            <div>Bar Chart</div>
            <div>
              {showGroupedData ? (
                <FaToggleOn
                  className="text-2xl text-blue-400 cursor-pointer"
                  onClick={handleToggle}
                />
              ) : (
                <FaToggleOff
                  className="text-2xl text-gray-400 cursor-pointer"
                  onClick={handleToggle}
                />
              )}
            </div>
            <div>Pie Chart</div>
          </div>
          <br />
          {!showGroupedData ? (
            <div>
              <StackedBarChart
                expenseData={expenseData}
                numberOfDays={numberOfDays}
              />
            </div>
          ) : (
            <div className="h-5/6">
              <PieChart expenseData={expenseData} numberOfDays={numberOfDays} />
            </div>
          )}
        </div>
      </>
    );
  }
  return (
    <div className="h-screen">
      <QuickAddExpense />
      <hr className="w-full m-1" />
      <div className="flex">{content}</div>
    </div>
  );
}
export default DashboardPage;
