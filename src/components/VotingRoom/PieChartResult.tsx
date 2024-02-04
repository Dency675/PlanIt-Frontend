import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from '@mui/joy';

const data = [
  { id: 0, value: 10 },
  { id: 1, value: 15 },
  { id: 2, value: 20 },
  { id: 3, value: 20 },
];

export default function PieChartResult() {
  return (
    
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'grey' },
          },
        ]}
        height={150}
        width={400}
        sx={{ alignItems: 'center' }}
      />
  
  );
}
