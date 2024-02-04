import React from 'react'
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
 import Loginimage from '../../assets/images/login.jpg'

const LeftComponent = () => {
  return (
    <Sheet      
         sx={{
          width: 350,
          // mx: 'auto', // margin left & right
          marginLeft:'auto',
          marginRight:0,
          my: 12, // margin top & bottom
          // py: 3, // padding top & bottom
          // px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="soft"
      >
   
        <img src={Loginimage} alt="Your Image" />
      
    </Sheet>
  )
}

export default LeftComponent
