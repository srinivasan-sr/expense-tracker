import { getShortDate } from "./dateNumberHelper";
import { CATEGORIES } from "../constants/catgegoryConstants";

function getMinimumDate(numberOfDays) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - numberOfDays + 1);
  minDate.setUTCHours(0, 0, 0, 0);
  return minDate;
}
function getTodaysDate() {
  return new Date();
}
function getExpenseForDays(data, numberOfDays) {
  const minDate = getMinimumDate(numberOfDays);
  const todayDate = getTodaysDate();
  return data.filter((item) => {
    let expenseDate = new Date(item.date);
    if (expenseDate >= minDate && expenseDate <= todayDate) {
      return item;
    }
  });
}
function getUniqueDateLabels(numberOfDays) {
  let startDate = getMinimumDate(numberOfDays);
  let currentDate = startDate;
  let dateLabelArray = [];
  // Create map with short date as key and values as zero.
  for (let i = 0; i < numberOfDays; i++) {
    currentDate = new Date(currentDate);
    dateLabelArray.push(getShortDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return [...dateLabelArray];
}

function getExpensesByCategoryId(expenseData, categoryId) {
  return expenseData.filter((item) => item.categoryId === categoryId);
}
function getExpenseArray(expenseData, categoryId, numberOfDays) {
  const filteredExpenses = getExpensesByCategoryId(expenseData, categoryId);
  // generate dates map for the numberOfDays from today's date
  let startDate = getMinimumDate(numberOfDays);
  let expenseMap = {};
  let currentDate = startDate;
  // Create map with short date as key and values as zero.
  for (let i = 0; i < numberOfDays; i++) {
    currentDate = new Date(currentDate);
    expenseMap[getShortDate(currentDate)] = 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  filteredExpenses.map((expense) => {
    currentDate = new Date(expense.date);
    expenseMap[getShortDate(currentDate)] = parseInt(expense.amount);
  });
  return Object.values(expenseMap);
}

function getExpensesStackedBarChart(expenseData, numberOfDays) {
  let categorySet = Object.values(CATEGORIES).map((category) => {
    return {
      id: category.id,
      label: category.label,
      backgroundColor: category.color,
      data: getExpenseArray(expenseData, category.id, numberOfDays),
    };
  });
  return categorySet;
}
function getExpenseDataPerPieSegment(expenseData, numberOfDays) {
  const initialValue = 0;
  const data = Object.values(CATEGORIES).map((category) => {
    return getExpenseForDays(
      getExpensesByCategoryId(expenseData, category.id),
      numberOfDays
    ).reduce(
      (accumulator, currentValue) =>
        accumulator + parseFloat(currentValue.amount),
      initialValue
    );
  });
  return data;
}

function getExpensesPieChart(expenseData, numberOfDays) {
  const pieSegmentDecorations = Object.values(CATEGORIES).map((category) => {
    return { label: category.label, bgColor: category.color };
  });
  const pieLabels = pieSegmentDecorations.map((item) => item.label);
  const pieDataSet = [
    {
      label: "Total expense: ",
      data: getExpenseDataPerPieSegment(expenseData, numberOfDays),
      backgroundColor: pieSegmentDecorations.map((item) => item.bgColor),
      borderWidth: 1,
    },
  ];
  return {
    labels: pieLabels,
    datasets: pieDataSet,
  };
}

export {
  getExpenseForDays,
  getUniqueDateLabels,
  getExpensesStackedBarChart,
  getExpensesPieChart,
};
