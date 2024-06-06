import React from "react";
import { useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { addIncomes } from "../../store/usersSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Textarea } from "@mui/joy";
import moment from "moment";
import dayjs from "dayjs";
const Form = () => {
  const [error,setError]=useState()
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    _id:uuidv4(),
    title: "",
    amount: "",
    date:moment(new Date()).format("DD/MM/YYYY"),
    category: "",
    description: "",
  });

  const { title, amount, description,category } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIncomes({...inputState}));
    setInputState({
      _id:uuidv4(),
      title: "",
      amount: "",
      date:moment(new Date()).format("DD/MM/YYYY") ,
      category: "",
      description: "",
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <TextField required label="Salary Title" variant="filled" value={title} name={"title"}
        onChange={handleInput("title")} />

      <TextField type="number" required label="Salary Amount" variant="filled" value={amount} name={"amount"}
        onChange={handleInput("amount")} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
           required
           value={dayjs(inputState.date)}
           onChange={(newValue) => {
            setInputState({ ...inputState, date:moment(newValue.$d).format("DD/MM/YYYY")});
          }}
        />
        </DemoContainer>
        </LocalizationProvider>
     
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Select Category</InputLabel>
        <Select
        required
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Select Category"
          name="category"
          value={category}
          onChange={handleInput("category")}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"salary"}>Salary</MenuItem>
          <MenuItem value={"freelancing"}>freelancing</MenuItem>
          <MenuItem value={"investments"}>investments</MenuItem>
          <MenuItem value={"stocks"}>Stocks</MenuItem>
          <MenuItem value={"bitcoin"}>Bitcoin</MenuItem>
          <MenuItem value={"bank"}>Bank Transfer</MenuItem>
          <MenuItem value={"youtube"}>Youtube</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
      </FormControl>
    
      <Textarea required name="description" minRows={4} placeholder="Add A Reference" variant="outlined" value={description} onChange={handleInput("description")} />     
      <Button variant="outlined" type="submit" >Add Income</Button>
    </FormStyled>
  );
};

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  textarea,
  select {
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
  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }
  
`;

export default Form;
