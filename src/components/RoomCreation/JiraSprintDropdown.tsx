import * as React from "react";
import { selectClasses } from "@mui/joy/Select";
import { InputLabel, Select, SelectChangeEvent } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem } from "@mui/material";
import axios from "axios";

interface Sprint {
  id: number;
  name: string;
}

interface JiraSprintDropdownProps {
  accessToken: String;
  sprints: Sprint[];
  setIssues: React.Dispatch<React.SetStateAction<any[]>>;
  setFormattedIssues: React.Dispatch<
    React.SetStateAction<
      {
        userStoryId: string;
        userStory: string;
        description: string;
        issueKey: string;
      }[]
    >
  >;
}

const JiraSprintDropdown: React.FC<JiraSprintDropdownProps> = ({
  accessToken,
  sprints,
  setIssues,
  setFormattedIssues,
}) => {
  const cloudId = "8041d251-f1c4-4732-a7ea-2680b867ceaf";

  const [selectedSprint, setSelectedSprint] = React.useState<Sprint | null>(
    null
  );

  const handleSprintChange = async (
    event: SelectChangeEvent<HTMLSelectElement>
  ) => {
    const sprintId = event.target.value;
    const sprint = sprints.find((sprint) => sprint.id.toString() === sprintId);
    setSelectedSprint(sprint || null);

    try {
      const boardId = 1;
      const response = await axios.get(
        `http://localhost:3001/getAllIssues/?sprintId=${sprintId}&cloudId=${cloudId}&boardId=${boardId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIssues(response.data.issueData.issues);
      const { issues } = response.data.issueData;

      setFormattedIssues(
        issues.map((issue: any) => ({
          userStoryId: issue.id,
          userStory: issue.fields.summary,
          description: issue.fields.description,
          issueKey: issue.key,
        }))
      );

      console.log("Issues:", response.data.issueData.issues);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  return (
    <div>
      <Select
        placeholder="Choose Sprint"
        fullWidth
        size="small"
        onChange={handleSprintChange}
        IconComponent={KeyboardArrowDown}
        sx={{
          [`& .${selectClasses.indicator}`]: {
            transition: "0.2s",
            [`&.${selectClasses.expanded}`]: {
              transform: "rotate(-180deg)",
            },
          },
        }}
      >
        {sprints.map((sprint: Sprint) => (
          <MenuItem key={sprint.id} value={sprint.id}>
            {sprint.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default JiraSprintDropdown;
