import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/joy";
import Stack from "@mui/joy/Stack";
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
    <div>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 5 }}
      >
        {scaleData.map((card, index) => (
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
              onClick={() => handleCardClick(index, card.scaleValue)}
            >
              <CardContent>
                <Typography level="h1">{card.scaleName}</Typography>
              </CardContent>
            </Card>
          </Slide>
        ))}
      </Stack>
    </div>
  );
};

export default VotingCards;
