import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { Grid } from "@mui/material";

const DetailedReportChartComponent = () => {
  return (
    <Card
      variant="outlined"
      style={{
        border: "1px solid #9DBEFF",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <CardContent>
        <Box>
          <Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Box style={{ overflowX: "auto", maxWidth: "100%" }}>
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
                  series={[
                    { data: [4, 6, 7, 9, 4, 3, 5, 1, 2, 4, 3, 5, 1, 2] },
                  ]}
                  width={450}
                  height={350}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DetailedReportChartComponent;
