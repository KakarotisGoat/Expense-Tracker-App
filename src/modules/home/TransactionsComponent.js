import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
  }
    @media (max-width: 360px) {
    padding: 10px;
    font-size: 14px;
  }
    & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
    width: 100%; /* Make input take full width */
  }
`;

const Cell = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
  @media (max-width: 600px) {
    flex-direction: column; /* Stack items vertically on small screens */
    align-items: flex-start; /* Align items to the start */
  }
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  padding: 6px 10px;
  border: none;
  cursor: pointer;
  font-size: normal;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }

  &:focus {
    outline: none;
  }
    @media (max-width: 600px) {
    padding: 5px; /* Adjust padding for smaller screens */
    font-size: 10px; /* Reduce font size */
  }
`;

const TransactionCell = ({ payload, onRemove }) => {
  return (
    <Cell isExpense={payload?.type === "EXPENSE"}>
      <span>{payload?.desc}</span>
      <span>₹{payload?.amount}</span>
      <RemoveButton onClick={() => onRemove(payload)}>Remove</RemoveButton>
    </Cell>
  );
};

const TransactionsComponent = (props) => {
  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(props.transactions);

  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updateTxn(txn);
  };

  useEffect(() => {
    filterData(searchText);
  }, [props.transactions]);

  return (
    <Container>
      Transactions
      <input
        placeholder="Search"
        onChange={(e) => {
          updateSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      {filteredTransaction?.map((payload) => (
        <TransactionCell
          key={payload.id}
          payload={payload}
          onRemove={props.onUpdateTransactions}
        />
      ))}
    </Container>
  );
};

export default TransactionsComponent;
