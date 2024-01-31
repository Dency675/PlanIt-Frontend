import { Box, Card, Typography } from "@mui/joy";
import CardContent from "@mui/material/CardContent";
import { CheckCircle2 } from "lucide-react";
import React from "react";

const OverViewSubComponents = ({ title, description, logo }: any) => {
  return (
    <Card variant="outlined" color="primary" size="sm" sx={{ width: 200 }}>
      <CardContent>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {logo}
          <Typography level="title-md">{title}</Typography>
        </Box>
        <Typography sx={{ color: "#0080ff", fontWeight: "bold" }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OverViewSubComponents;
