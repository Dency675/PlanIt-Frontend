import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const DetailedReportChartComponent = () => {
  return (
    <Card style={{ border: "1px solid #9DBEFF" }}>
      <CardContent>
        <Box>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: [
                  "group A",
                  "group B",
                  "group C",
                  "group D",
                  "group E",
                  "group F",
                  "group G",
                  "group H",
                  "group I",
                  "group J",
                  "group 1",
                  "group J2",
                  "group J3",
                  "group Js",
                ],
              },
            ]}
            series={[{ data: [4, 6, 7, 9, 4, 3, 5, 1, 2, 4, 3, 5, 1, 2] }]}
            width={500}
            height={300}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DetailedReportChartComponent;
