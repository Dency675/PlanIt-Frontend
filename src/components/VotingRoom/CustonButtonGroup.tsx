import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import MuiButtonGroup from '@mui/joy/ButtonGroup'; // Renamed to avoid conflict with local ButtonGroup
import Typography from '@mui/joy/Typography';

const CustomButtonGroup = () => { // Renamed to avoid conflict with imported ButtonGroup
  return (
    <Card
      variant="outlined"
      sx={{
        mx: 6,
        mt:2,
        width: '85%',
        overflow: 'auto',
      }}
    >
      <CardContent sx={{ textAlign: 'center', alignItems: 'center' }}>
        <MuiButtonGroup // Renamed to avoid conflict with local ButtonGroup
          variant="soft"
          aria-label="outlined primary button group"
          buttonFlex="0 1 200px"
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          <Button>Start Voting</Button>
          <Button>Reveal</Button>
          <Button>Save Result</Button>
          <Button>Exit</Button>
        </MuiButtonGroup>
      </CardContent>  
    </Card>
  );
};

export default CustomButtonGroup; // Export the renamed component
