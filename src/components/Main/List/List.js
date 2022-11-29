import {
    ListItem, List as MUList, ListItemAvatar, ListItemText, Avatar,
    ListItemSecondaryAction, IconButton, Slide
} from '@material-ui/core';
import React, { useContext } from 'react';
import { Delete,MoneyOff, } from '@material-ui/icons'
import useStyle from './styles'
import { ExpenseTrackerContext } from './../../../context/context';


const List = () => {
  const classes = useStyle();
  const {transactions,deleteTransaction} = useContext(ExpenseTrackerContext);
  
    
    return (
        <MUList dense={false} className={classes.list}>
            {transactions.map((transaction) => (
                <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense} >
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`$${transaction.amount} -${transaction.date}`}  />
                        <ListItemSecondaryAction >
                            <IconButton edge='' aria-label='delete' onClick={()=>deleteTransaction(transaction.id)}>
                            <Delete />
                            </IconButton> 
                    </ListItemSecondaryAction>
                    </ListItem>
              </Slide>
          ))}
  </MUList>
  );
}

export default List