import React from "react";
import OverViewSubComponents from "./OverViewSubComponents";
import { Box } from "@mui/joy";
import { CheckCircle2, XCircle, ClipboardList, Users } from "lucide-react";
import { Grid } from "@mui/material";

const OverViewComponents = () => {
  const description = 15;
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
            description={`${description} stories`}
            logo={
              <CheckCircle2 style={{ fontSize: "40px", strokeWidth: "2" }} />
            }
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <OverViewSubComponents
            title="Incomplete Stories"
            description={`${description} stories`}
            logo={<XCircle style={{ fontSize: "40px", strokeWidth: "2" }} />}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <OverViewSubComponents
            title="Total User Stories "
            description={`${description} stories`}
            logo={
              <ClipboardList style={{ fontSize: "40px", strokeWidth: "2" }} />
            }
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <OverViewSubComponents
            title="Total Participants"
            description={`${description} stories`}
            logo={<Users style={{ fontSize: "40px", strokeWidth: "2" }} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverViewComponents;
