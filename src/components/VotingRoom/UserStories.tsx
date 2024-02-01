import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Typography from '@mui/joy/Typography';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Book } from 'lucide-react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function UserStories() {
  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        mx: 'auto',
        mt:5,
        // to make the demo resizable
        overflow: 'auto',
        // resize: 'horizontal',
      }}
    >
      <Typography level="title-lg" startDecorator={<Book />}>
        User Stories
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: '1/-1' }}>
          {/* <Input endDecorator={<CreditCardIcon />} /> */}
          <Select
      placeholder="Select User Story"
      indicator={<KeyboardArrowDown />}
      sx={{
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
      <Option value="1">As a user, I want to be able to create a new account</Option>
      <Option value="2">As a user, I want to be able to log in to the system</Option>
      <Option value="3">As a user, I want to be able to reset my password</Option>
      <Option value="4">As a user, I want to be able to update my profile information</Option>
      <Option value="4">As a user, I want to be able to search for other users by their username.</Option>
    </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
