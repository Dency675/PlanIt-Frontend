import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import {
  OverviewComponentDataResponse,
  SessionDetailsResponsesData,
  UserStoryTitleAndPointResponse,
  UserStory,
} from "../ReportPage/types";

interface OverviewComponentProp {
  overViewData: OverviewComponentDataResponse;
  sessionData: SessionDetailsResponsesData;
  userStoryData: UserStoryTitleAndPointResponse;
  participantScoreData: UserStory[];
}

const ReportPdf = ({
  overViewData,
  sessionData,
  userStoryData,
  participantScoreData,
}: OverviewComponentProp) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.title}>{sessionData.data.sessionTitle}</Text>
      <Text style={styles.author}>
        {" "}
        {sessionData.data.createDateTime.slice(0, 10)}
      </Text>

      <Text style={styles.subtitle}>Overview</Text>

      <View style={styles.section2}>
        <Text style={styles.label}>Scrum Master</Text>
        <Text style={styles.text2}>: {sessionData.data.scrumMasterName}</Text>
      </View>
      <View style={styles.section2}>
        <Text style={styles.label}>Project Manager</Text>
        <Text style={styles.text2}>
          : {sessionData.data.projectManagerName}
        </Text>
      </View>
      <View style={styles.section2}>
        <Text style={styles.label}>Estimation Method</Text>
        <Text style={styles.text2}>: {sessionData.data.estimationName}</Text>
      </View>

      <Text style={styles.subtitle}>Status</Text>

      <View style={styles.section2}>
        <Text style={styles.label2}>Total User Stories</Text>
        <Text style={styles.text2}>: {overViewData.totalCount} stories</Text>
      </View>
      <View style={styles.section2}>
        <Text style={styles.label2}>Completed Stories</Text>
        <Text style={styles.text2}>
          : {overViewData.completeStoryCount} stories
        </Text>
      </View>
      <View style={styles.section2}>
        <Text style={styles.label2}>Incompleted Stories</Text>
        <Text style={styles.text2}>
          : {overViewData.incompleteUserStoryCount} stories
        </Text>
      </View>
      <View style={styles.section2}>
        <Text style={styles.label2}>Total Participants</Text>
        <Text style={styles.text2}>
          : {sessionData.data.participantCount} People
        </Text>
      </View>

      <Text style={styles.subtitle}>User stories</Text>

      {Array.from(
        { length: userStoryData.length },
        (_, index) =>
          userStoryData[index].storyPointResult !== 0 && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 4,
                  marginLeft: 10,
                  fontSize: 14,
                }}
              >
                <Text style={{ marginHorizontal: 8 }}>•</Text>
                <Text>User story {userStoryData[index].userStoryId} :</Text>
                <Text> {userStoryData[index].userStory.userStory}</Text>
              </View>
              <View
                style={{
                  width: "50%",
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 70,
                  fontSize: 12,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: "black",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      borderRightWidth: 1,
                      borderColor: "black",
                      padding: 5,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>Name</Text>
                  </View>
                  <View style={{ flex: 1, padding: 5 }}>
                    <Text style={{ textAlign: "center" }}>Score</Text>
                  </View>
                </View>

                {Object.values(
                  participantScoreData[index].participantScores
                ).map((participant, index) => (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: "black",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          borderRightWidth: 1,
                          borderColor: "black",
                          padding: 5,
                        }}
                      >
                        <Text style={{ textAlign: "center" }}>
                          {participant.participantName}
                        </Text>
                      </View>
                      <View style={{ flex: 1, padding: 5 }}>
                        <Text style={{ textAlign: "center" }}>
                          {participant.storyPoint}
                        </Text>
                      </View>
                    </View>
                  </>
                ))}
              </View>
              <Text
                style={{
                  margin: 0,
                  marginLeft: 50,
                  fontSize: 14,
                  textAlign: "justify",
                }}
              >
                <Text style={{ fontFamily: "Helvetica-Bold", fontWeight: 700 }}>
                  Story Point :{" "}
                </Text>
                {userStoryData[index].storyPointResult}
              </Text>
              <Text
                style={{
                  margin: 12,
                  marginLeft: 50,
                  marginBottom: 30,
                  fontSize: 14,
                  textAlign: "justify",
                }}
              >
                <Text style={{ fontFamily: "Helvetica-Bold", fontWeight: 700 }}>
                  Comment :{" "}
                </Text>
                {userStoryData[index].comment}
              </Text>
            </>
          )
      )}
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  root: {
    padding: "50px",
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    border: " 3px solid black",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  section2: {
    marginLeft: 30,
    flexGrow: 1,
    marginBottom: "6px",
    fontSize: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    width: 130,
  },
  label2: {
    width: 140,
  },
  text2: {
    flex: 1,
  },
  table: {
    marginLeft: 30,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "black",
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingVertical: 5,
  },
});

export default ReportPdf;
