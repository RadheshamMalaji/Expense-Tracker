import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import IncomeItem from "../IncomeItem/IncomeItem";
import ExpenseForm from "./ExpenseForm";
import {useSelector} from "react-redux";

const Expenses = () => {
    const {totalExpense,expenses} = useSelector((state) => state?.users)
  return (
    <ExpensesStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-income">
          Total Expense: <span>₹{totalExpense}</span>
        </h2>

        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses.map((expense) => {
              const { _id, title, amount, date, category, description } =
                expense;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={"expense"}
                  category={category}
                  indicatorColor="var(--color-green)"
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpensesStyled>
  );
};

const ExpensesStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: var(--shadow-style);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Expenses;
