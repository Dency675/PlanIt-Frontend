import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/joy";

interface tablePropType {
  scoreCounts: { [key: string]: number };
  score: { [key: string]: string };
}

const PieChartResult: React.FC<tablePropType> = ({ scoreCounts, score }) => {
  const data = Object.keys(scoreCounts).map((key) => ({
    id: key,
    value: scoreCounts[key],
    label: `${score[key]}`.toString(),
  }));

  console.log("scorescore", score);

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
          cx: 100,
        },
      ]}
      height={180}
      width={250}
      style={{ alignItems: "start" }}
      slotProps={{
        legend: {
          direction: "column",
          position: { vertical: "middle", horizontal: "right" },
          padding: 0,
          // hidden: true,
        },
      }}
    />
  );
};

export default PieChartResult;
