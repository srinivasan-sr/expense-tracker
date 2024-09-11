import PropTypes from "prop-types";
import { Chart as ChartJS, Legend, Tooltip, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getExpensesPieChart } from "../../../utils/expenseFilterHelper";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ expenseData, numberOfDays }) {
  const data = getExpensesPieChart(expenseData, numberOfDays);
  return <Pie data={data} />;
}
PieChart.propTypes = {
  expenseData: PropTypes.object,
  numberOfDays: PropTypes.number,
};
export default PieChart;
