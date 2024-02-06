import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/joy";
import Stack from "@mui/joy/Stack";
import Slide from "@mui/material/Slide";

const VotingCards: React.FC = () => {
  const cardData = [
    { title: " 1", content: "1" },
    { title: " 2", content: "2" },
    { title: " 3", content: "3" },
    { title: " 4", content: "5" },
    { title: " 3", content: "8" },
    { title: " 4", content: "13" },
    { title: " 4", content: "21" },
  ];

  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 5 }}
      >
        {cardData.map((card, index) => (
          <Slide
            in={true}
            direction={"right"}
            timeout={(1000 * index) / 2}
            key={index}
          >
            <Card
              variant="solid"
              sx={{
                backgroundImage: "linear-gradient(to right, #FD726F, #B2D5D9)",
                color: "white",
                width: 80,
                height: 120,
                mx: "auto",
                my: 5,
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
        ))}
      </Stack>
    </div>
  );
};

export default VotingCards;
