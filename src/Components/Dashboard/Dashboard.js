import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useSelector} from "react-redux";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { Card, CardContent } from "@mui/material";

const Dashboard = () => {
const {totalIncome,incomes,totalExpense,expenses} = useSelector((state) => state?.users)

function totalBalance(){
    return totalIncome - totalExpense
}

  return (
    <DashboardSytled>
      <InnerLayout> 
        <div className="amount-con">
        <div className="mx-auto max-w-xs">
        <Card  className="mx-auto max-w-xs" sx={{ minWidth: 200 }}>
      <CardContent>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Total Income
            </p>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              ₹ {totalIncome}
            </p>
      </CardContent>
    </Card>
    </div>
    <div className="mx-auto max-w-xs">
    <Card  className="mx-auto max-w-xs" sx={{ minWidth: 200 }}>
      <CardContent>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Total Expense
            </p>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              ₹ {totalExpense}
            </p>
      </CardContent>
    </Card>
    </div>
    <div className="mx-auto max-w-xs">
    <Card   sx={{ minWidth: 200 }}>
      <CardContent>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Balance
            </p>
            <p
              className="text-3xl font-semibold"
              style={{
                color:
                totalExpense > totalIncome ? "red" : "var(--color-green)",
              }}
            >
              ₹ {totalBalance()}
            </p>
      </CardContent>
    </Card>
    </div>
        </div>

        <div className="stats-con">
          <div className="flex justify-between flex-row items-center mt-2">
            <PieChart
            colors={['green', 'red']}
            series={[{arcLabel:(item)=>`${item.value!=0?((100*item.value)/(totalIncome+totalExpense)).toFixed(2):0}%`,
                      data: [{ value: totalIncome??0, label:`TotalIncome` }, { value: totalExpense??0 ,label:"TotalExpense"}] }]}
            height={200} margin={{right: 5 }}
            sx={{
               [`& .${pieArcLabelClasses.root}`]: {
                 fill: 'white',
                 fontWeight: 'bold',
                 },
               }}
            />
          </div>
           <div className="history-con"> 
            <h2 className="income-title">
              Min <span>Income</span>Max
            </h2>
            <div className="income-item">
              <p>{incomes.length>0?Math.min(...incomes.map((item) => item.amount)):0}</p>
              <p>{incomes.length>0?Math.max(...incomes.map((item) => item.amount)):0}</p>
            </div>

            <h2 className="expense-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="expense-item">
              <p>{expenses.length>0?Math.min(...expenses.map((item) => Number(item.amount))):0}</p>
              <p>{expenses.length>0?Math.max(...expenses.map((item) => item.amount)):0}</p>
            </div>
          </div> 
        </div>
      </InnerLayout>
    </DashboardSytled>
  );
};

const DashboardSytled = styled.div`
  .amount-con {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0 1rem;
    margin: 2rem 0;
    .income,
    .expense {
      grid-column: span 2;
    }
    .income,
    .expense,
    .balance {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      box-shadow: var(--shadow-style);
      border-radius: 10px;
      padding: 5px 10px;
      h2 {
        font-size: 1.2rem;
      }
      p {
        font-size: 0.75rem;
        font-weight: 700;
      }
    }
    .balance {
      p {
        opacity: 0.6;
        font-size: 1rem;
      }
    }
  }
  .stats-con {
    gap: 2rem;
    display: flex;
    flex-direction: column;

    .chart-con {
      ₹{"" /* grid-column: 1 / 4; */}
      height: 400px;
      ₹{'' /* margin-bottom: 3rem; */}
    }
    .history-con {
      ₹{"" /* grid-column: 4 / -1; */}
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .income-title,
      .expense-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .income-item,
      .expense-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
