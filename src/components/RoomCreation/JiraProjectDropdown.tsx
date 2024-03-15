import * as React from "react";
import { selectClasses } from "@mui/joy/Select";
import { InputLabel, Select, SelectChangeEvent } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem } from "@mui/material";
import axios from "axios";
interface Project {
  id: string;
  key: string;
  name: string;
}
interface Props {
  projects: Project[];
  accessToken: String;
  projectData: any;
  setSprints: React.Dispatch<React.SetStateAction<Sprint[]>>;
}
interface Sprint {
  id: number;
  name: string;
}

const JiraProjectDropdown: React.FC<Props> = ({
  projects,
  accessToken,
  projectData,
  setSprints,
}) => {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(
    null
  );

  const cloudId = "8041d251-f1c4-4732-a7ea-2680b867ceaf";

  const handleProjectChange = async (
    event: SelectChangeEvent<HTMLSelectElement>
  ) => {
    const projectId = event.target.value;
    const project = projects.find((proj) => proj.id === projectId);
    setSelectedProject(project || null);

    console.log("projectData");
    console.log(projectData);

    try {
      const response = await axios.post(
        `http://localhost:3001/getAllSprints/?projectId=${projectId}&cloudId=${cloudId}`,
        { project: project, projectData: projectData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSprints(response.data.allSprints);
      console.log("All Sprints:", response.data);
      // Handle the response data as needed
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  return (
    <div>
      <Select
        placeholder="Choose Project"
        fullWidth
        size="small"
        onChange={handleProjectChange}
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
        {projects.map((project: Project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name} - {project.key}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default JiraProjectDropdown;
