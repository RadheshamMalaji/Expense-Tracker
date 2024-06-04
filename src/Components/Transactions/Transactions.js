import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import TotalHistory from "../History/TotalHistory";

const Transactions = () => {
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
         <TotalHistory /> 

      </InnerLayout>
    </IncomeStyled>
  );
};

const IncomeStyled = styled.div`
  h1 {
    margin-bottom: 2rem;
  }
`;

export default Transactions;
