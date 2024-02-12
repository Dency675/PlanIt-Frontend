import React, { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/joy";
import Slide from "@mui/material/Slide";
import getScales from "./api/getScale";
import { useSocket } from "../Socket/SocketContext";
interface votingCardsPropType {
  estimationId: number;
}

interface scaleDataProps {
  scaleName: string;
  scaleValue: number;
}

const VotingCards: React.FC<votingCardsPropType> = ({ estimationId }) => {
  const [scaleData, setScaleData] = useState<scaleDataProps[]>([
    { scaleName: "", scaleValue: 0 },
  ]);

  const [isStartButtonStarted, setIsStartButtonStarted] =
    useState<boolean>(true);

  const socket = useSocket();

  React.useEffect(() => {
    getScales(estimationId)
      .then((response: any) => {
        console.log("get Scales:", response.formattedData);
        setScaleData(response.formattedData);
      })
      .catch((error) => {
        console.error("Error occurred while changing status :", error);
      });
  }, [estimationId]);

  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  React.useEffect(() => {
    socket.on("votingStarted", async (sessionId, isStartButtonStarted) => {
      console.log("votingStarted", sessionId, isStartButtonStarted);
      setIsStartButtonStarted(isStartButtonStarted);
    });

    return () => {
      socket.off("votingStarted");
    };
  }, []);

  const handleCardClick = (index: number, scaleValue: number) => {
    if (isStartButtonStarted) {
      setSelectedCard(index === selectedCard ? null : index);
      console.log(scaleValue);
    }
  };

  return (
    <Grid container justifyContent="center" spacing={0} sx={{ mt: 1 }}>
      {scaleData.map((card, index) => (
        <Grid key={index} xs={6} sm={4} md={3}>
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
              onClick={() => handleCardClick(index, card.scaleValue)}
            >
              <CardContent>
                <Typography level="h1">{card.scaleName}</Typography>
              </CardContent>
            </Card>
          </Slide>
        </Grid>
      ))}
    </Grid>
  );
};

export default VotingCards;
