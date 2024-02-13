import { Box, Divider, List, ListDivider, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import Input from "@mui/joy/Input";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { TeamMember } from "./TeamMember";
import axios from "axios";
import { TeamMemberProps } from "./TeamMember";
import AddMember from "./AddMember";
import { identifier } from "stylis";
import fetchMembers from "../RoomCreation/api/fetchTeamMembers";

interface TeamListProps {
  teamId: number;
  selectedUserArray: any; // Define the type of the teamId prop
}

const TeamList: React.FC<TeamListProps> = ({ teamId, selectedUserArray }) => {
  const [teamMembers, setTeamMembers] = useState<
    TeamMemberProps["teamMember"][]
  >([]);

  const [selectedUserArrayWithId, setSelectedUserArrayWithId] = React.useState<
    {
      userId: string;
      roleId: number;
    }[]
  >([selectedUserArray]);

  React.useEffect(() => {
    console.log(" selectedUserArrayWithId from room creation");
    console.log(selectedUserArrayWithId);
  }, [selectedUserArrayWithId]);

  const [scrumMaster, setScrumMaster] = useState(true);
  // useEffect(() => {
  //   const fetchTeamMembers = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3001/getMembers?teamId=${teamId}`
  //       );

  //       const teamMembersData = response.data.activeTeamMembers;
  //       console.log("teamMembersData");
  //       console.log(teamMembersData);
  //       setTeamMembers(teamMembersData);
  //     } catch (error) {
  //       console.error("Error fetching team members:", error);
  //     }
  //   };

  //   console.log("IM useeffect");
  //   fetchTeamMembers();
  // }, [teamId]);
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getMembers?teamId=${teamId}`
      );

      const teamMembersData = response.data.activeTeamMembers;
      const updatedTeamMembers = teamMembersData.length
        ? teamMembersData.map((member: { roleName: string }) => ({
            ...member,
            isScrumMaster: member.roleName === "scrum master",
          }))
        : [];
      setTeamMembers(updatedTeamMembers);

      // Update team members to include isScrumMaster property
      // const updatedTeamMembers = response.data.activeTeamMembers.map(
      //   (member: { roleName: string }) => ({
      //     ...member,
      //     isScrumMaster: member.roleName === "scrum master", // Define isScrumMaster based on the role
      //   })
      // );
      // setTeamMembers(updatedTeamMembers);
    } catch (error: any) {
      console.error("Error fetching team members:", error);
      if (error.response && error.response.status === 404) {
        setTeamMembers([]); // Set teamMembers to an empty array
      }
    }
  };
  useEffect(() => {
    fetchTeamMembers();
  }, [teamId, selectedUserArrayWithId]);

  // console.log(teamMembers);
  const handleRemoveMember = async (id: number) => {
    try {
      await axios.put(
        `http://localhost:3001/removeMember?id=${id}`
        // , { userId: id }
      );
      setTeamMembers((prevMembers) =>
        prevMembers.filter((member) => {
          console.log("Member:", member);
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
        `http://localhost:3001/assignNewScrumMaster?teamMemberId=${id}`
      );
      console.log("posting");
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
    console.log("scrumMaster");
    console.log(scrumMaster);
  }, [scrumMaster]);

  return (
    <Box>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: "0.15rem", m: 2, fontSize: 16 }}
      >
        Team Members
      </Typography>

      {teamMembers.length === 0 ? (
        <>
          <Typography sx={{ letterSpacing: "0.15rem", m: 4, fontSize: 14 }}>
            No members in the team.
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
            <AddMember
              setSelectedUserArrayWithId={setSelectedUserArrayWithId}
              teamId={teamId}
            />
            {/* <Input placeholder="+ Add Member" endDecorator={<PersonSearchIcon />} /> */}
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
            <AddMember
              setSelectedUserArrayWithId={setSelectedUserArrayWithId}
              teamId={teamId}
            />
            {/* <Input placeholder="+ Add Member" endDecorator={<PersonSearchIcon />} /> */}
          </Box>
        </>
      )}
    </Box>
  );
};

export default TeamList;

{
  /* <List
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
              onMakeScrumMaster={(id: number) => handleMakeScrumMaster(id)}
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
        <AddMember setSelectedUserArrayWithId={setSelectedUserArrayWithId} />
      </Box>
    </Box>
  );
};

export default TeamList; */
}
