import React from "react";
import { Card, CardContent, TextField, Grid } from "@mui/material";

interface PlayingCardProps {
  index: number;
  value: string;
  onChange: (index: number, value: string) => void;
  isSubmitted: boolean;
}

const PlayingCard: React.FC<PlayingCardProps> = ({
  index,
  value,
  onChange,
  isSubmitted,
}) => (
  <Grid item xs={6}>
    <Card
      sx={{
        border: `0.5px solid ${
          isSubmitted ? (value.trim() !== "" ? "green" : "red") : "initial"
        }`,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <TextField
          label={`Card ${index + 1}`}
          placeholder={`Enter value for Card ${index + 1}`}
          value={value}
          onChange={(e) => onChange(index, e.target.value)}
        />
      </CardContent>
    </Card>
  </Grid>
);

export default PlayingCard;
