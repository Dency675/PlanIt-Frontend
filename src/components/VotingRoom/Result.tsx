import React from 'react'
import { Typography } from '@mui/joy'
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import TableBox from './TableBox';
import { PieChart } from '@mui/x-charts';
import PieChartResult from './PieChartResult';

const Result = () => {
  return (
    <Card
    variant="outlined"
    sx={{
      maxHeight: 'max-content',
      maxWidth: '100%',
      mx: 3,
      my:5,
      height: 500,
      // to make the demo resizable
      overflow: 'auto',
      // resize: 'horizontal',
    }}>
      <Typography level="title-lg">Result</Typography>
      <Divider orientation="horizontal" />
      <TableBox/>
      <Typography level="title-lg">Estimation</Typography>
      <Divider orientation="horizontal" /> 
      <PieChartResult/> 
      
    </Card>
    

  )
}

export default Result
