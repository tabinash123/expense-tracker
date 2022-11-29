import React from 'react'
import useStyle from './styles';
import { Card, CardContent, CardHeader, Divider, Typography, Grid } from '@material-ui/core';
import Form from './Form/Form';
import List from './List/List';
import { ExpenseTrackerContext } from './../../context/context';
import { useContext } from 'react';



const Main = () => {
  const classes = useStyle();
  const { balance } = useContext(ExpenseTrackerContext);
  return (
    <Card className={classes.root}>
      <CardHeader title="Expenses Tracker" subheader="Powered by Speechly" />
      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance ${balance}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ lineHeight: "1.5em", marginTop: "20px" }}
        >
          {/* info card */}
          
        </Typography>

        <Divider />

        <Form />
      </CardContent>

      <CardContent className={classes.cartContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List/>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Main