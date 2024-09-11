import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  getUniqueDateLabels,
  getExpensesStackedBarChart,
} from "../../../utils/expenseFilterHelper";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StackedBarChart({ expenseData, numberOfDays }) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: `Last ${numberOfDays} days expenses`,
      },
    },
    responsive: true,
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const labels = getUniqueDateLabels(numberOfDays);
  const data1 = getExpensesStackedBarChart(expenseData, numberOfDays);
  const data = {
    labels: labels,
    datasets: data1,
  };
  return <Bar options={options} data={data} />;
}
StackedBarChart.propTypes = {
  expenseData: PropTypes.array,
  numberOfDays: PropTypes.number,
};
export default StackedBarChart;
