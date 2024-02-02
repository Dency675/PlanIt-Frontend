import { Box, Card, Typography } from "@mui/joy";
import CardContent from "@mui/material/CardContent";
import { CheckCircle2 } from "lucide-react";
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
          "background-color 0.3s, color 0.3s, border-color 0.3s, border-width 0.3s", // Add border-width transition
        "&:hover": {
          backgroundColor: "#0080ff", // Invert background color on hover
          color: "#ffffff", // Invert text color on hover
          borderColor: "#e04419", // Change border color to green on hover
          borderWidth: "1px", // Increase border thickness on hover
        },
        borderColor: isHovered ? "#00cc00" : "#0080ff", // Set initial border color to green
        borderWidth: "1px", // Set initial border thickness
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent>
        <Box
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
        </Box>
        <Typography
          sx={{
            color: isHovered ? "#ffffff" : "#000000", // Adjust text color based on hover state
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
