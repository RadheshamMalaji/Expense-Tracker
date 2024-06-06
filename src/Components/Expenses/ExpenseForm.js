import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addExpense } from "../../store/usersSlice";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Textarea } from "@mui/joy";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
const ExpenseForm = () => {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: moment(new Date()).format("DD/MM/YYYY"),
    category: "",
    description: "",
    type:"expense"
  });

  const { title, amount,
    category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense(inputState))
    setInputState({
      title: "",
      amount: "",
      date: moment(new Date()).format("DD/MM/YYYY"),
      category: "",
      description: "",
      type:"expense"
    });
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      <TextField required id="outlined-basic" label="Expense Title" variant="filled" value={title} name={"title"}
        onChange={handleInput("title")} />

      <TextField required type="number" label="Expense Amount" variant="filled" value={amount} name={"title"}
        onChange={handleInput("amount")} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
             required
             onChange={(newValue) => {
            setInputState({ ...inputState, date:moment(newValue?.$d).format("DD/MM/YYYY") });
          }}
        />
        </LocalizationProvider>

      <FormControl required variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Select Category</InputLabel>
        <Select
          required
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleInput("category")}
          label="Select Option"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"education"}>Education</MenuItem>
          <MenuItem value={"groceries"}>Groceries</MenuItem>
          <MenuItem value={"health"}>Health</MenuItem>
          <MenuItem value={"subscriptions"}>Subscriptions</MenuItem>
          <MenuItem value={"takeaways"}>Takeaways</MenuItem>
          <MenuItem value={"bank"}>Clothing</MenuItem>
          <MenuItem value={"travelling"}>Travelling</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
      </FormControl>
  

      <Textarea required name="Outlined" minRows={4} placeholder="Add A Reference" variant="outlined" value={description} onChange={handleInput("description")} />     

      <Button variant="outlined" type="submit" >Add Expense</Button>
    </ExpenseFormStyled>
  );
};

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  textarea{
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: var(--shadow-style);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  }
`;

export default ExpenseForm;
