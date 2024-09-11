import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  HTTP_REQUEST_TYPE,
  BASE_URL,
  EXPENSES,
} from "../../../constants/apiConstants";
import { pause } from "../../../utils/apiTimingHelper";

const expensesApi = createApi({
  reducerPath: "expenses",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    fetchFn: async (...args) => {
      pause(3000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchExpenses: builder.query({
        providesTags: (result, error, user) => {
          const tags = result.map((expense) => {
            return { type: "Expense", id: expense.id };
          });
          tags.push({ type: "UsersExpense", id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            method: HTTP_REQUEST_TYPE.GET,
            url: EXPENSES,
            params: {
              userId: user.id,
            },
          };
        },
      }),
      createExpense: builder.mutation({
        invalidatesTags: (result, error, expense) => {
          return [{ type: "UsersExpense", id: expense.userId }];
        },
        query: (expense) => {
          return {
            url: EXPENSES,
            method: HTTP_REQUEST_TYPE.POST,
            body: {
              title: expense.title,
              date: expense.date,
              categoryId: expense.categoryId,
              amount: expense.amount,
              userId: expense.userId,
            },
          };
        },
      }),
    };
  },
});

export const { useFetchExpensesQuery, useCreateExpenseMutation } = expensesApi;
export { expensesApi };
