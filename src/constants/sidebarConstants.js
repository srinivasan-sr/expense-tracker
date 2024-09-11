import {
  BiSolidHomeCircle,
  BiSolidCategory,
  BiMenu,
  BiSolidReport,
} from "react-icons/bi";
import { GiExpense } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";

const SidebarConstants = [
  {
    icon: BiMenu,
    text: "",
    id: 0,
  },
  {
    icon: BiSolidHomeCircle,
    text: "Dashboard",
    id: 1,
    link: "/dashboard",
  },
  {
    icon: GiExpense,
    text: "Expenses",
    id: 2,
    link: "/expenses",
  },
  {
    icon: BiSolidCategory,
    text: "Categories",
    id: 3,
    link: "/categories",
  },
  {
    icon: BiSolidReport,
    text: "Reports",
    id: 4,
    link: "/reports",
  },
  {
    icon: AiFillSetting,
    text: "Settings",
    id: 5,
    link: "/settings",
  },
];
export { SidebarConstants };
