import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/joy";

interface tablePropType {
  scoreCounts: { [key: string]: number };
}

const PieChartResult: React.FC<tablePropType> = ({ scoreCounts }) => {
  const data = Object.keys(scoreCounts).map((key) => ({
    id: key,
    value: scoreCounts[key],
  }));

  React.useEffect(() => {
    console.log("scoreCounts", scoreCounts);
  }, [scoreCounts]);

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "grey" },
        },
      ]}
      height={150}
      width={400}
      sx={{ alignItems: "center" }}
    />
  );
};

export default PieChartResult;
