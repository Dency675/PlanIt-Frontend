import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import MuiButtonGroup from '@mui/joy/ButtonGroup'; 
import { useState } from 'react';


interface CustomButtonGroupProps {
  onStartTimer: () => void; 
  stopTimer:()=>void;
}
//timer function 
const CustomButtonGroup: React.FC<CustomButtonGroupProps> = ({ onStartTimer,stopTimer }) => {
  const [isTimerOn, setIsTimerOn] = useState(false)

  const handleButtonClick = () => {

  if(isTimerOn){
    setIsTimerOn(!isTimerOn);
    onStartTimer();
   
  }else
  stopTimer()
   // Call the first function
   setIsTimerOn(!isTimerOn);
  };

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
        <MuiButtonGroup 
          variant="soft"
          aria-label="outlined primary button group"
          buttonFlex="0 1 200px"
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          <Button onClick={handleButtonClick}>{isTimerOn ? 'End Voting':'Start Voting'  }</Button>
          <Button>Reveal</Button>
          {/* <Button>Skip</Button> */}
          <Button>Save Result</Button>
          <Button>Exit</Button>
        </MuiButtonGroup>
      </CardContent>  
    </Card>
  );
};

export default CustomButtonGroup;
