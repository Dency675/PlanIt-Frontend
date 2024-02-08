import { Box, Card, Grid, Typography } from "@mui/joy";
import CardContent from "@mui/material/CardContent";
import React from "react";

const OverViewSubComponents = ({ title, description, logo }: any) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Card
      variant="outlined"
      color="primary"
      size="sm"
      sx={{
        transition:
          "background-color 0.3s, color 0.3s, border-color 0.3s, border-width 0.3s",
        "&:hover": {
          backgroundColor: "#979999",
          color: "#ffffff",
          borderColor: "#ffffff",
          borderWidth: "1px",
        },
        borderColor: isHovered ? "#00cc00" : "#0080ff",
        borderWidth: "1px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent>
        <Grid
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          {logo}
          <Typography
            level="title-md"
            style={{
              marginLeft: "10px",
              color: isHovered ? "#ffffff" : "#0080ff",
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Typography
          sx={{
            color: isHovered ? "#ffffff" : "#000000",
            fontWeight: "bold",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OverViewSubComponents;
