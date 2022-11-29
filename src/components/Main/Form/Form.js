import React, { useContext, useEffect, useState } from 'react';
import { TextField,Typography,Grid,Button,FormControl,Select,MenuItem, InputLabel } from '@material-ui/core'
import useStyle from './styles';
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import { expenseCategories, incomeCategories } from './../../../constants/categories';
import formatDate from './../../../utils/formatDate';
import { useSpeechContext} from '@speechly/react-client'


const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
}

const Form = () => {
  const classes = useStyle();
  const [formData, setformData] = useState(initialState);
  const { addTransaction, transactions } = useContext(ExpenseTrackerContext);
  const { segment } = useSpeechContext();


  const createTransaction = () => {
       if (
         Number.isNaN(Number(formData.amount)) ||
         !formData.date.includes("-")
       )
      return;
    if (!formData.category) {
      alert('Must Fill the Categoty')
    }
    else if (!formData.amount) {
      alert('Must Fill the amount')
      }
    else {
    const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }
    addTransaction(transaction);
      setformData(initialState);
    
      
    }

  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setformData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setformData({ ...formData, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setformData(initialState);
      }

      segment.entities.forEach((s) => {
        const category = `${s.value.charAt(0)}${s.value
          .slice(1)
          .toLowerCase()}`;

        switch (s.type) {
          case "amount":
            setformData({ ...formData, amount: s.value });
            break;
          case "category":
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setformData({ ...formData, type: "Income", category });
            } else if (
              expenseCategories.map((iC) => iC.type).includes(category)
            ) {
              setformData({ ...formData, type: "Expense", category });
            }
            break;
          case "date":
            setformData({ ...formData, date: s.value });
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, [segment]);




  const selectedCategory = formData.type === 'Income' ? incomeCategories : expenseCategories;
  

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment && <>{segment.words.map((w)=>w.value).join(' ')} </>}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setformData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expenses">Expenses</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Categoty</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setformData({ ...formData, category: e.target.value })
            }
          >
            {selectedCategory.map((c) => (
              <MenuItem key={c.type} value={c.type}>
                {c.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="Amount"
          lable="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => setformData({ ...formData, amount: e.target.value })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="Date"
          lable="Date"
          fullWidth
          value={formData.date}
          onChange={(e) =>
            setformData({ ...formData, date: formatDate(e.target.value) })
          }
        />
      </Grid>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        fullWidth
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  );
}

export default Form