import React, { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/joy";
import Slide from "@mui/material/Slide";

const VotingCards: React.FC = () => {
  const cardData = [
    { title: " 1", content: "1" },
    { title: " 2", content: "2" },
    { title: " 3", content: "3" },
    { title: " 4", content: "5" },
    { title: " 3", content: "8" },
    { title: " 4", content: "13" },
    { title: " 4", content: "?" },
  ];

  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  return (
    <Grid container justifyContent="center" spacing={0} sx={{ mt: 1 }}>
      {cardData.map((card, index) => (
        <Grid  key={index} xs={6} sm={4} md={3}>
          <Slide in={true} direction={"right"} timeout={(1000 * index) / 2}>
            <Card
              variant="solid"
              
              sx={{
                backgroundImage: "linear-gradient(to right, #FD726F, #B2D5D9)",
                color: "white",
                width: 90,
                // mt:0,
                height: 120,
                mx: "auto",
                my: 0.5, 
                cursor: "pointer",
                border:
                  selectedCard === index ? "2px solid blue" : "1px solid ",
                overflow: "auto",
                
              }}
              onClick={() => handleCardClick(index)}
            >
              <CardContent>
                <Typography level="h1">{card.content}</Typography>
              </CardContent>
            </Card>
          </Slide>
        </Grid>
      ))}
    </Grid>
  );
};

export default VotingCards;
