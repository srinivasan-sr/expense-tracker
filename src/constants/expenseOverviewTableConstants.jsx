import { CATEGORIES } from "./catgegoryConstants";
import {
  GetLocaleDateString,
  GetNumberInLocale,
} from "../utils/dateNumberHelper";

const headers = [
  {
    name: "Title",
    id: "title",
    render: (item) => item.title,
    sortValue: (item) => item.title,
  },
  {
    name: "Amount",
    id: "amount",
    render: (item) => (
      <div>
        <span className="text-stone-600 dark:text-white">₹</span>
        {GetNumberInLocale(item.amount)}
      </div>
    ),
    sortValue: (item) => parseFloat(item.amount),
  },
  {
    name: "Date",
    id: "date",
    render: (item) => <div>{GetLocaleDateString(item.date)}</div>,
    sortValue: (item) => item.date,
  },
  {
    name: "Category",
    id: "category",
    render: (item) => (
      <div className="flex">
        <div
          style={{
            backgroundColor: CATEGORIES[item.categoryId].color,
            width: "20px",
            height: "20px",
            marginRight: "3px",
            borderRadius: "50%",
          }}
        ></div>
        <div>{CATEGORIES[item.categoryId].label}</div>
      </div>
    ),
    sortValue: (item) => CATEGORIES[item.categoryId].label,
  },
];

const keyFn = (item) => item.id;
export { headers, keyFn };
