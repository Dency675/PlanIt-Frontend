import { Box, Divider, List, ListDivider, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import Input from "@mui/joy/Input";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { TeamMember } from "./TeamMember";
import axios from "axios";
import { TeamMemberProps } from "./TeamMember";
import AddMember from "./AddMember";

const TeamList = () => {
  const [teamMembers, setTeamMembers] = useState<
    TeamMemberProps["teamMember"][]
  >([]);

  const [selectedUserArrayWithId, setSelectedUserArrayWithId] = React.useState<
    {
      sessionId: number | null;
      userId: string;
      roleId: number;
    }[]
  >([]);

  React.useEffect(() => {
    console.log(" selectedUserArrayWithId from room creation");
    console.log(selectedUserArrayWithId);
  }, [selectedUserArrayWithId]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/getMembers?teamId=1"
        );
        const teamMembersData = response.data.activeTeamMembers;
        // console.log(teamMembersData);
        setTeamMembers(teamMembersData);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    console.log("IM useeffect");
    fetchTeamMembers();
  }, []);

  console.log("IM HERE");
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

      // const mappedTeamMembers = teamMembers.map((member) => ({
      //   id: member.teamMember.id,
      //   userInformation: member.teamMember.userInformation,
      //   role: member.teamMember.role,
      // }));
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  // const mappedTeamMembers = teamMembers.map((member) => ({
  //   id: member.teamMember.id,
  //   userInformation: member.teamMember.userInformation,
  //   role: member.teamMember.role,
  // }));

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
              onRemove={(id) => handleRemoveMember(id)}
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
        {/* <Input placeholder="+ Add Member" endDecorator={<PersonSearchIcon />} /> */}
      </Box>
    </Box>
  );
};

export default TeamList;
