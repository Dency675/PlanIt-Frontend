import { Box, Divider, List, ListDivider, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { TeamMember } from "./TeamMember";
import axios from "axios";
import { TeamMemberProps } from "./TeamMember";
import AddMember from "./AddMember";
import { useParams } from "react-router-dom";

interface TeamListProps {
  teamId: number;
  teamName: string;
  selectedUserArray: any;
}

const TeamList = ({ teamName, selectedUserArray }: TeamListProps) => {
  const userId = localStorage.getItem("userId");

  const { teamId } = useParams();

  const [teamMembers, setTeamMembers] = useState<
    TeamMemberProps["teamMember"][]
  >([]);

  const [scrumMaster, setScrumMaster] = useState(true);

  const [selectedUserArrayWithId, setSelectedUserArrayWithId] = useState<
    {
      userId: string;
      roleId: number;
    }[]
  >([selectedUserArray]);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getMembers?teamId=${teamId}&userId=${userId}`
      );

      const teamMembersData = response.data.activeTeamMembers;
      const updatedTeamMembers = teamMembersData.length
        ? teamMembersData.map((member: { roleName: string }) => ({
            ...member,
            isScrumMaster: member.roleName === "scrum master",
          }))
        : [];
      setTeamMembers(updatedTeamMembers);
    } catch (error: any) {
      console.error("Error fetching team members:", error);
      if (error.response && error.response.status === 404) {
        setTeamMembers([]);
      }
    }
  };

  const handleRemoveMember = async (id: number) => {
    try {
      await axios.put(`http://localhost:3001/removeMember?id=${id}`);
      setTeamMembers((prevMembers) =>
        prevMembers.filter((member) => {
          return member?.id !== id;
        })
      );
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  const handleMakeScrumMaster = async (id: number) => {
    try {
      let scrumResponse = await axios.put(
        `http://localhost:3001/teamMemberInformation/${id}`
      );
      setTeamMembers((prevMembers) =>
        prevMembers.map((member) => {
          return member.id === id
            ? { ...member, isScrumMaster: true }
            : { ...member, isScrumMaster: false };
        })
      );
      setScrumMaster(false);

      if (scrumResponse) {
        fetchTeamMembers();
      }
    } catch (error) {
      console.error("Error assigning new Scrum Master:", error);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [teamId, selectedUserArrayWithId]);

  useEffect(() => {
    console.log(" selectedUserArrayWithId from room creation");
    console.log(selectedUserArrayWithId);
  }, [selectedUserArrayWithId]);

  const role = localStorage.getItem("teamUserRole");

  return (
    <Box>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: "0.15rem", m: 2, fontSize: 16 }}
      >
        {teamName}
      </Typography>

      {teamMembers.length === 0 ? (
        <>
          <Typography sx={{ letterSpacing: "0.15rem", m: 4, fontSize: 14 }}>
            No other members in the team.
          </Typography>
          <Divider sx={{ height: 2 }} />
          <Box
            sx={{
              pt: 2,
              display: "flex",
              mt: 2,
              justifyContent: "flex-end",
              p: { xs: 2, sm: 0 },
            }}
          >
            {role?.includes("project manager") && (
              <AddMember
                setSelectedUserArrayWithId={setSelectedUserArrayWithId}
                teamId={parseInt(teamId as string)}
              />
            )}
          </Box>
        </>
      ) : (
        <>
          <List
            aria-labelledby="ellipsis-list-demo"
            sx={{
              "--ListItemDecorator-size": "56px",
              width: "100%",
              p: { xs: 0, sm: 2 },
            }}
          >
            {teamMembers.map((teamMember, index) => (
              <React.Fragment key={index}>
                <ListDivider />
                <TeamMember
                  teamMember={teamMember}
                  onRemove={(id: number) => handleRemoveMember(id)}
                  onMakeScrumMaster={(id: number) => {
                    handleMakeScrumMaster(id);
                    setScrumMaster(true);
                  }}
                />
              </React.Fragment>
            ))}
          </List>
          <Divider sx={{ height: 2 }} />
          <Box
            sx={{
              pt: 2,
              display: "flex",
              mt: 2,
              justifyContent: "flex-end",
              p: { xs: 2, sm: 0 },
            }}
          >
            {role?.includes("project manager") && (
              <AddMember
                setSelectedUserArrayWithId={setSelectedUserArrayWithId}
                teamId={parseInt(teamId as string)}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default TeamList;
