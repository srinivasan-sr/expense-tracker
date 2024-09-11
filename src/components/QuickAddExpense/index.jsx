import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import Button from "../Button";
import Dropdown from "../Dropdown";
import TextInput from "../TextInput";
import { useCreateExpenseMutation } from "../../store";
import { CATEGORIES } from "../../constants/catgegoryConstants";

export default function QuickAddExpense() {
  const [createExpense, createExpenseResult] = useCreateExpenseMutation();
  const [titleValue, setTitleValue] = useState("");
  const [amountValue, setAmountValue] = useState(0.0);
  const [categoryValue, setCategoryValue] = useState({});

  const [dateValue, setValue] = useState({
    startDate: new Date(),
  });

  const handleExpenseDateChange = (newValue) => {
    setValue(newValue);
  };
  const dropdownItemsList = Object.values(CATEGORIES);
  const handleTitleInputChange = (value) => {
    setTitleValue(value);
  };
  const handleAmountInputChange = (value) => {
    setAmountValue(value);
  };
  const handleCategoryOptionChange = (item) => {
    setCategoryValue(item);
  };

  const handleCreateExpense = (event) => {
    event.preventDefault();
    createExpense({
      title: titleValue,
      date: dateValue.startDate,
      amount: amountValue,
      categoryId: categoryValue.id,
      userId: 1,
    });
  };

  return (
    <div className="flex justify-between w-full items-center mt-2 dark:bg-gray-600 dark:text-white ml-1 mr-1">
      <div>
        <TextInput
          placeholder="Title"
          type="text"
          onChange={handleTitleInputChange}
        />
      </div>
      <div>
        <TextInput
          placeholder="Amount"
          type="number"
          onChange={handleAmountInputChange}
        />
      </div>
      <div>
        <Datepicker
          asSingle={true}
          useRange={false}
          showShortcuts={true}
          displayFormat={"DD-MM-YYYY"}
          maxDate={new Date().toDateString()}
          value={dateValue}
          onChange={handleExpenseDateChange}
          inputClassName="dark:bg-gray-600"
        />
      </div>
      <div>
        <Dropdown
          items={dropdownItemsList}
          onChange={handleCategoryOptionChange}
        />
      </div>
      <div>
        <Button
          primary
          className="p-4"
          onClick={handleCreateExpense}
          loading={createExpenseResult.isLoading}
        >
          + Add Expense
        </Button>
      </div>
    </div>
  );
}
