import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    incomes: [],
    totalIncome:0,
    expenses:[],
    totalExpense:0,
  },
  reducers: {
    setUser: (users, action) => {
      users.currentUser = action.payload;
    },
    addIncomes: (users, action) => {
      users.incomes =[...users.incomes, action.payload];
        users.totalIncome += Number(action.payload.amount);
    },
    addExpense:(users, action)=>{
      users.expenses =[...users.expenses, action.payload];
        users.totalExpense=users.totalExpense+ Number(action.payload.amount);
    },

    deleteIncome:(user,action)=>{

    }
  },
});

export const { setUser,addIncomes,deleteIncome,addExpense } = userSlice.actions;

export const selectUsers = (state) => state.users;

export default userSlice.reducer;
