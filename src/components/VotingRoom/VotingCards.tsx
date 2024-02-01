import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import Slide from '@mui/material/Slide';

const VotingCards: React.FC = () => {
  const cardData = [
    { title: ' 1', content: '1' },
    { title: ' 2', content: '2' },
    { title: ' 3', content: '3' },
    { title: ' 4', content: '5' },
    { title: ' 3', content: '8' },
    { title: ' 4', content: '13' },
    { title: ' 4', content: '21' }
  ];

  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCard(index === selectedCard ? null : index); // Toggle selected card
  };

  return (
    <div>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 5 }}>
        {cardData.map((card, index) => (
          <Slide in={true} direction={'right'} timeout={(1000 * index) / 2} key={index}>
            <Card
            //  color="primary"
              variant="solid"
              sx={{
                backgroundImage: 'linear-gradient(to right, #FD726F, #B2D5D9)', // Set your custom color here
          color: 'white',
                width: '60px', // Set desired width
                height: '90px', // Set desired height
                mx: 'auto',
                my: 5,
                cursor: 'pointer',
                border: selectedCard === index ? '2px solid blue' : '1px solid ', // Apply different border styles based on selection
                overflow: 'auto'
              }}
              onClick={() => handleCardClick(index)} // Handle card click event
            >
              <CardContent>
                {/* <Typography>{card.title}</Typography> */}
                <Typography level='h1'>{card.content}</Typography>
              </CardContent>
            </Card>
          </Slide>
        ))}
      </Stack>
    </div>
  );
};

export default VotingCards;
