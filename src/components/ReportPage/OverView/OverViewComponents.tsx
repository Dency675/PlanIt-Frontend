import OverViewSubComponents from "./OverViewSubComponents";
import { Box } from "@mui/joy";
import { CheckCircle2, XCircle, ClipboardList, Users } from "lucide-react";
import { Grid } from "@mui/material";
import {
  OverviewComponentDataResponse,
  SessionDetailsResponsesData,
} from "../../../pages/ReportPage/types";

interface OverviewComponentProp {
  overViewData: OverviewComponentDataResponse;
  sessionData: SessionDetailsResponsesData;
}

const OverViewComponents = ({
  overViewData,
  sessionData,
}: OverviewComponentProp) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1000,
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6} md={3}>
          <OverViewSubComponents
            title="Completed Stories"
            description={`${overViewData.completeStoryCount} stories`}
            logo={
              <CheckCircle2 style={{ fontSize: "40px", strokeWidth: "2" }} />
            }
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <OverViewSubComponents
            title="Incomplete Stories"
            description={`${overViewData.incompleteUserStoryCount} stories`}
            logo={<XCircle style={{ fontSize: "40px", strokeWidth: "2" }} />}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <OverViewSubComponents
            title="Total User Stories "
            description={`${overViewData.totalCount} stories`}
            logo={
              <ClipboardList style={{ fontSize: "40px", strokeWidth: "2" }} />
            }
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <OverViewSubComponents
            title="Total Participants"
            description={`${sessionData.data.participantCount} People`}
            logo={<Users style={{ fontSize: "40px", strokeWidth: "2" }} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverViewComponents;
