import Typography from "@mui/joy/Typography";
import CardHeader from "@mui/material/CardHeader";
import { Card, CardContent } from "@mui/material";
import React from "react";

const DetailedReportSessionComponent = ({ name = "Hari" }: any) => {
  return (
    <Card style={{ padding: 10, border: "1px solid #9DBEFF" }}>
      <CardContent>
        <Typography fontSize={25} fontWeight={750}>
          Session Estimation
        </Typography>
        <Typography>Session Name : {name}</Typography>
        <Typography>Scrum Master : Dency</Typography>
        <Typography>Product Manager : Dency</Typography>
        <Typography>Product Owner : Dency</Typography>
        <Typography>Date : 12/12/12</Typography>
        <Typography>Estimation Method : Fibonacci</Typography>
      </CardContent>
    </Card>
  );
};

export default DetailedReportSessionComponent;
