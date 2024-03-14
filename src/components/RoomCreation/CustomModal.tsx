// CustomModal.js

import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField, Grid } from "@mui/material";
import PlayingCard from "./PlayingCard";
// import { postEstimations, postCardValues } from "./api";

import { postEstimations } from "./api/postEstimations";
import { postCardValues } from "./api/postCardValues";

const CustomModal: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [cardValues, setCardValues] = useState<string[]>([]);
  const [estimationName, setEstimationName] = useState<string>("");
  const [estimationId, setEstimationId] = useState<number | null>(null);
  const [isSubmitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [numOfCards, setNumOfCards] = useState<number | string>("");
  const [storedUserId, setStoredUserId] = useState<string | null>(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [isPlayingCardRendered, setIsPlayingCardRendered] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setStoredUserId(userId);
  }, []);

  useEffect(() => {
    setShowSubmitButton(
      cardValues.length > 0 && cardValues.every((value) => value.trim() !== "")
    );
  }, [cardValues]);

  useEffect(() => {
    if (estimationId !== null) {
      setModalOpen(false);
    }
  }, [estimationId]);

  useEffect(() => {
    if (cardValues.length > 0) {
      setIsPlayingCardRendered(true);
    }
  }, [cardValues]);

  const handleCardValueChange = (index: number, value: string) => {
    const newCardValues = [...cardValues];
    newCardValues[index] = value;
    setCardValues(newCardValues);
  };

  const handleNumOfCardsChange = (value: string) => {
    setNumOfCards(value);
  };

  const handleEstimationNameChange = (value: string) => {
    setEstimationName(value);
  };

  const handleSubmit = async () => {
    try {
      if (!storedUserId) {
        setValidationError("User ID not found in local storage.");
        return;
      }

      if (cardValues.some((value) => value.trim() === "")) {
        setValidationError("Please enter a value for each card.");
        setSubmitted(true);
        return;
      }

      const estimationPayload = {
        estimationName: estimationName,
        userId: storedUserId,
      };

      const { id } = await postEstimations(estimationPayload);
      setEstimationId(id);

      const cardValuesPayload = {
        estimationId: id,
        cardValues: cardValues,
      };

      await postCardValues(cardValuesPayload);

      console.log("Data submitted successfully:", {
        estimation: estimationPayload,
        cardValues: cardValuesPayload,
      });

      setModalOpen(false);
      setValidationError(null);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      setValidationError("Error submitting data. Please try again.");
      setSubmitted(true);
    }
  };

  const handleCloseModal = () => {
    setCardValues([]);
    setEstimationName("");
    setEstimationId(null);
    setNumOfCards("");
    setSubmitted(false);
    setValidationError(null);
    setModalOpen(false);
    setIsPlayingCardRendered(false);
  };

  const handleShowModal = () => {
    setModalOpen(true);
    setSubmitted(false);
    setValidationError(null);
  };

  const handleNextButtonClick = () => {
    openModal();
  };

  const handleNumOfCardsKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      openModal();
    }
  };

  const openModal = () => {
    const num = parseInt(numOfCards as string, 10);
    if (!isNaN(num) && num >= 2 && num <= 6) {
      setCardValues(Array(num).fill(""));
      setModalOpen(true);
      setValidationError(null);
    } else {
      setValidationError("Card limit is between 2 and 6");
    }
  };

  return (
    <div>
      <Button onClick={handleShowModal}>Create Custom Scale</Button>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" mb={2} textAlign="center">
            Custom Estimation Scale
          </Typography>
          <TextField
            label="Estimation Name"
            placeholder="Enter the name of the estimation"
            type="text"
            value={estimationName}
            onChange={(e) => handleEstimationNameChange(e.target.value)}
            sx={{ width: "100%", mb: 2 }}
          />
          <TextField
            label="Number of Cards"
            placeholder="Enter the number of cards"
            type="text"
            value={numOfCards}
            onChange={(e) => handleNumOfCardsChange(e.target.value)}
            onKeyPress={handleNumOfCardsKeyPress}
            sx={{ width: "100%", mb: 2 }}
          />
          <Grid container spacing={2}>
            {isPlayingCardRendered &&
              cardValues.map((value, index) => (
                <PlayingCard
                  key={index}
                  index={index}
                  value={value}
                  onChange={handleCardValueChange}
                  isSubmitted={isSubmitted}
                />
              ))}
          </Grid>
          {isPlayingCardRendered ? (
            <>
              {validationError && (
                <Typography color="error" mt={2} textAlign="center">
                  {validationError}
                </Typography>
              )}
              <Box mt={2} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </>
          ) : (
            <Box mt={2} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextButtonClick}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
