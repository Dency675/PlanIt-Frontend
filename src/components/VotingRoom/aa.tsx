import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

const TestLoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth/jira";
  };

  return <button onClick={handleLogin}>Login with Jira</button>;
};

const RedirectPage = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [userProjects, setUserProjects] = useState<any>(null);

  useEffect(() => {
    // Add logic to handle redirection after Jira authentication
    // For example, you can check if the URL contains the code or any relevant information
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    console.log("code", code);

    if (code) {
      // Make a request to the server to exchange the code for access token and fetch user details
      axios
        .get(`http://localhost:3001/auth/jira/callback?code=${code}`)
        .then((response) => {
          // Data received from the server after successful authentication
          setUserDetails(response.data.UserData);
          setUserProjects(response.data.ProjectData);
          console.log("response", response.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          // Handle error or redirect to an error page
        });
    } else {
      // Handle redirection failure or invalid code
      console.error("Invalid code");
    }
  }, []);

  return (
    <div>
      {!userDetails || !userProjects ? (
        <h1>Redirecting...</h1>
      ) : (
        <div>
          <h2>User Details:</h2>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>Name: {userDetails.name}</p>
          </div>
          <h2>User Projects:</h2>
          {/* <pre>{JSON.stringify(userProjects, null, 2)}</pre>
           */}
          <ProjectDropdown projects={userProjects} />
        </div>
      )}
    </div>
  );
};

interface Project {
  id: string;
  key: string;
  name: string;
}

interface Sprint {
  id: number;
  name: string;
}

interface Props {
  projects: Project[];
}

const ProjectDropdown: React.FC<Props> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);
  const [issues, setIssues] = useState<any[]>([]);

  const handleProjectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const projectId = event.target.value;
    const project = projects.find((proj) => proj.id === projectId);
    setSelectedProject(project || null);

    try {
      const response = await axios.get(
        `http://localhost:3001/getAllSprints/?projectId=${projectId}`
      );
      setSprints(response.data.allSprints);
      console.log("All Sprints:", response.data);
      // Handle the response data as needed
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const handleSprintChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const sprintId = event.target.value;
    const sprint = sprints.find((sprint) => sprint.id.toString() === sprintId);
    setSelectedSprint(sprint || null);

    try {
      const response = await axios.get(
        `http://localhost:3001/getAllIssues/?sprintId=${sprintId}`
      );
      setIssues(response.data.issueData.issues);
      console.log("Issues:", response.data.issueData.issues);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  return (
    <div>
      <label htmlFor="project">Select a Project:</label>
      <select id="project" onChange={handleProjectChange}>
        <option value="">Select...</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name} - {project.key}
          </option>
        ))}
      </select>
      {selectedProject && (
        <div>
          <h2>Selected Project Details:</h2>
          <p>Name: {selectedProject.name}</p>
          <p>Key: {selectedProject.key}</p>
          <p>ID: {selectedProject.id}</p>

          <h2>Sprints:</h2>
          <select id="sprint" onChange={handleSprintChange}>
            {sprints.map((sprint) => (
              <option key={sprint.id} value={sprint.id}>
                {sprint.name}
              </option>
            ))}
          </select>

          {issues.map((issue) => (
            <div>
              {" "}
              <p>Id: {issue.id}</p>
              <p>Key: {issue.key}</p>
              <p>Desc: {issue.fields.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { TestLoginButton, RedirectPage, ProjectDropdown };
