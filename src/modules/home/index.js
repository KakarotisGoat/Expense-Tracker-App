import React, { useEffect, useState } from "react";
import styled from "styled-components";
import OverViewComponent from "./OverviewComponent";
import TransactionsComponent from "./TransactionsComponent";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 360px) {
    padding: 15px;
    font-size: 14px;
  }
`;

const HomeComponent = (props) => {
    const [transactions, updateTransaction] = useState([]);
    const [expense, updateExpense] = useState(0);
    const [income, updateIncome] = useState(0);

    const calculateBalance = () => {
        let exp = 0;
        let inc = 0;
        transactions.map((payload) =>
            payload.type === "EXPENSE"
                ? (exp += payload.amount)
                : (inc += payload.amount)
        );
        updateExpense(exp);
        updateIncome(inc);
    };
    
    useEffect(() => calculateBalance(), [transactions]);

    const addTransaction = (payload) => {
        const transactionArray = [...transactions];
        transactionArray.push(payload);
        updateTransaction(transactionArray);
    };

    const removeTransaction = (transactionToRemove) => {
        // Here, you filter out the transaction that matches the one to be removed
        const updatedTransactions = transactions.filter(
            (transaction) => transaction.id !== transactionToRemove.id // Ensure comparison by unique identifier (like id)
        );
        updateTransaction(updatedTransactions);
    };

    return (
        <Container>
            <OverViewComponent
                expense={expense}
                income={income}
                addTransaction={addTransaction}
            />
            {transactions?.length ? (
                <TransactionsComponent
                    transactions={transactions}
                    onUpdateTransactions={removeTransaction} // Pass the correct handler
                />
            ) : (
                ""
            )}
        </Container>
    );
};

export default HomeComponent;
