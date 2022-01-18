import "./App.css";
import "antd/dist/antd.css";
import { css } from "@emotion/css";
import { Button, Input, Modal, Select, DatePicker } from "antd";
import { TransactionRow } from "./Components/TransactionRow";
import { useState } from "react";

const mockData = [
  {
    id: "1",
    type: "expense",
    category: "Shopping",
    amount: -300,
    date: "1 Jan 2021",
  },
  {
    id: "2",
    type: "income",
    category: "Salary",
    amount: 25000,
    date: "1 Jan 2021",
  },
];

function App() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [transactions, setTransactions] = useState(mockData);
  const [category, setCategory] = useState("Shopping");
  const [date, setDate] = useState();
  const [amount, setAmount] = useState(0);
  const [search, setSearch] = useState("");

  const onDeleteItem = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  const filteredTransaction = transactions.filter((tx) =>
    tx.category.includes(search)
  );
  return (
    <div
      className={css`
        background-color: aliceblue;
        height: 100vh;
        width: 100vw;
        padding-top: 32px;
      `}
    >
      <div
        className={css`
          width: 80%;
          margin: auto;
          max-width: 500px;
        `}
      >
        <div
          className={css`
            display: flex;
          `}
        >
          <Input
            placeholder="Search by text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button onClick={() => setCreateModalVisible(true)}>Create</Button>
        </div>
        {filteredTransaction.map((tx) => (
          <TransactionRow tx={tx} onDeleteItem={onDeleteItem} />
        ))}
      </div>
      <Modal
        title="Basic Modal"
        visible={createModalVisible}
        onOk={() => {
          const incomeCategory = ["Salary"];
          const type = incomeCategory.includes(category) ? "income" : "expense";
          const newTx = {
            id: transactions.length,
            type,
            category,
            date,
            amount,
          };
          console.log(newTx);
          setTransactions([...transactions, newTx]);
          setCreateModalVisible(false);
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            height: 150px;
            justify-content: space-between;
          `}
        >
          <Select
            placeholder="Type"
            onChange={(e) => {
              setCategory(e);
            }}
          >
            <Select.Option value="Shopping">Shopping</Select.Option>
            <Select.Option value="Salary">Salary</Select.Option>
          </Select>
          <DatePicker
            onChange={(e) => {
              setDate(e.format("DD MMM YYYY"));
            }}
          />
          <Input
            placeholder="Amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
      </Modal>
    </div>
  );
}

export default App;
