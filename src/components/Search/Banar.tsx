import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Avatar, useTheme } from "@mui/joy";
import Image from "../../assets/BanarImg.png";

interface BanarProps {
  names: string | string[];
}

export default function Banar({ names }: BanarProps) {
  const theme = useTheme();

  return (
    <Card
      orientation="horizontal"
      variant="plain"
      sx={{
        my: 5,
        background:
          theme.palette.mode === "dark"
            ? "#333333"
            : "linear-gradient(to right bottom, #E9E6CE, #97ADB1)",
        color: theme.palette.mode === "dark" ? "#FFFFFF" : undefined,
        "@media (max-width: 600px)": {
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          my: 3,
        },
      }}
    >
      <Avatar
        src={Image}
        alt="j"
        sx={{
          height: "auto",
          width: { xs: 100, sm: 150 },
          borderRadius: 0,
          backgroundColor: "transparent",
          mb: { xs: 2, sm: 0 },
        }}
      />

      <CardContent sx={{ lg: { my: 5 } }}>
        <Typography sx={{ fontSize: 26, fontWeight: "bold" }}>
          Hi, {names}
        </Typography>
        <Typography level="body-lg" sx={{}}>
          Welcome to PlanIt
        </Typography>
        <Typography level="body-sm" sx={{}}>
          Through the lens of Planning Poker, teams find focus, aligning their
          perspectives for a successful sprint
        </Typography>
      </CardContent>
    </Card>
  );
}
