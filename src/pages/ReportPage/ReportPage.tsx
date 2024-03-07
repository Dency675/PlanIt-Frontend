import {
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
} from "@mui/material";
import OverViewComponents from "../../components/ReportPage/OverView/OverViewComponents";
import UserStoryComponent from "../../components/ReportPage/UserStory/UserStoryComponent";
import DetailedReportComponent from "../../components/ReportPage/DetailedReport/DetailedReportComponent";
import Header from "../../components/Navbar/Header";
import { ReportPageProp } from "./types";
import { Box, Button } from "@mui/joy";
import ReportPdf from "./ReportPagePdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

const ReportPage = ({
  viewMode,
  overViewData,
  sessionData,
  barChartData,
  participantData,
  userStoryData,
  visibleUserStoryCount,
  participantScoreData,
  userStoryRef,
  toggleViewMode,
}: ReportPageProp) => {
  return (
    <>
      <Header></Header>
      <Grid>
        <Grid
          style={{ backgroundColor: "#f0f3f7" }}
          container
          spacing={3}
          sx={{ padding: 2 }}
        >
          <Grid item xs={12} sm={12} md={12}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={toggleViewMode}
              aria-label="report view mode"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: 125,
              }}
            >
              <ToggleButton
                value="detailed"
                aria-label="detailed"
                color="primary"
              >
                Detailed Report
              </ToggleButton>
              <ToggleButton value="short" aria-label="short" color="primary">
                Brief Report
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              sx={{
                fontSize: "27px",
                fontWeight: "bold",
                marginLeft: 6,
                marginBottom: 1,
              }}
            >
              Overview
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <OverViewComponents
              overViewData={overViewData}
              sessionData={sessionData}
            />
          </Grid>
          {viewMode === "detailed" && (
            <>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  sx={{
                    fontSize: "27px",
                    fontWeight: "bold",
                    marginLeft: 6,
                    marginBottom: 1,
                    marginTop: 2,
                  }}
                >
                  Detailed Report
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <DetailedReportComponent
                  participantData={participantData}
                  sessionData={sessionData}
                  barChartData={barChartData}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              sx={{
                fontSize: "27px",
                fontWeight: "bold",
                marginLeft: 6,
                marginBottom: 5,
              }}
            >
              User Story
            </Typography>
            <Grid />
            {Array.from({ length: userStoryData.length }, (_, index) => (
              <Grid item xs={12} sm={12} md={12} key={index}>
                {index < visibleUserStoryCount &&
                  userStoryData[index].storyPointResult !== 0 && (
                    <UserStoryComponent
                      userStoryData={userStoryData}
                      index={index}
                      participantScoreData={participantScoreData}
                      viewMode={viewMode}
                    />
                  )}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid style={{ backgroundColor: "#f0f3f7" }}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", pb: 3, mr: 10 }}
          >
            <Button color="primary">
              <PDFDownloadLink
                document={
                  <ReportPdf
                    sessionData={sessionData}
                    overViewData={overViewData}
                    userStoryData={userStoryData}
                    participantScoreData={participantScoreData}
                  />
                }
                fileName="sessionReport.pdf"
                style={{ color: "white", textDecoration: "none" }}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download PDF"
                }
              </PDFDownloadLink>
            </Button>
          </Box>
        </Grid>
        <div ref={userStoryRef} />
      </Grid>
    </>
  );
};

export default ReportPage;
