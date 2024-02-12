import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { Grid } from "@mui/material";
import { BarChartComponentResponsesParent } from "../../../pages/ReportPage/types";

const DetailedReportChartComponent = ({
  barChartData,
}: BarChartComponentResponsesParent) => {
  // console.log("barchartdata", barChartData);
  // console.log("barchartdata.data", barChartData.data);

  const calculationArray = Object.values(barChartData.data).map((item) => ({
    storyPointResult: item.storyPointResult,
    userStoryId: item.userStoryId,
  }));

  // console.log("calculationArray");
  // console.log(calculationArray);
  // console.log(typeof calculationArray);

  const storyPointArray = calculationArray.map((item) => item.storyPointResult);
  const userStoryIdArray = calculationArray.map((item) => item.userStoryId);

  // console.log("Story Point Array:", storyPointArray);
  // console.log("User Story Id Array:", userStoryIdArray);

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
                      data: userStoryIdArray,
                      label: "User Story Id",
                    },
                  ]}
                  yAxis={[
                    {
                      scaleType: "linear",
                      label: "Story Points",
                    },
                  ]}
                  series={[{ data: storyPointArray }]}
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
