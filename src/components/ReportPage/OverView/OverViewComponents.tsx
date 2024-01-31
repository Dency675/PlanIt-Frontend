import React from "react";
import OverViewSubComponents from "./OverViewSubComponents";
import { Box } from "@mui/joy";
import { CheckCircle2, XCircle, ClipboardList, Users } from "lucide-react";

const OverViewComponents = () => {
  const description = 15;
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1900,
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <OverViewSubComponents
        title="Completed Stories"
        description={`${description} stories`}
        logo={<CheckCircle2 style={{ fontSize: "40px", strokeWidth: "2" }} />}
      />
      <OverViewSubComponents
        title="Incomplete Stories"
        description={`${description} stories`}
        logo={<XCircle style={{ fontSize: "40px", strokeWidth: "2" }} />}
      />
      <OverViewSubComponents
        title="Total Stories"
        description={`${description} stories`}
        logo={<ClipboardList style={{ fontSize: "40px", strokeWidth: "2" }} />}
      />
      <OverViewSubComponents
        title="Total Participants"
        description={`${description} stories`}
        logo={<Users style={{ fontSize: "40px", strokeWidth: "2" }} />}
      />
    </Box>
  );
};

export default OverViewComponents;
