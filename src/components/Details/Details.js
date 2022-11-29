import { Card,CardHeader,CardContent,Typography } from '@material-ui/core';
import React from 'react';
import {Doughnut} from 'react-chartjs-2'
import useStyle from './styles'
import useTransactions from './../../useTransactions';
import { useContext } from 'react';
 

const Details = ({title}) => {

    const classes = useStyle();
    const { total, chartData } = useTransactions(title);
    

  return (
      <Card className={title === 'Income' ? classes.income : classes.expense}
          sx={{ height: '29vh' }}>
          <CardHeader title={title} />
          <CardContent >
              <Typography variant='h5' >${total}</Typography>
              <Doughnut data={chartData} />
          </CardContent>
   </Card>
  )
}

export default Details;