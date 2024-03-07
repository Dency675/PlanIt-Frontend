import { Grid, Avatar, Typography, Paper, Box } from "@mui/material";
import React from "react";

interface UserData {
  id: string;
  employeeId: string;
  name: string;
  email: string;
}

interface ProfilePageProps {
  user?: UserData;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  console.log("user", user);

  const avatarUrl = user?.name[0] || "default_avatar_url.jpg";
  const userName = user?.name || "Unknown User";
  const userEmail = user?.email || "unknown.email@example.com";
  const employeeId = user?.employeeId || "Unknown";

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "40px",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Avatar
          alt={userName}
          src={avatarUrl}
          style={{
            width: 100,
            height: 100,
            margin: "auto",
            marginBottom: "20px",
          }}
        />
        <Box>
          <Typography variant="h6">Full Name:</Typography>
          <Typography>{userName}</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6">Email:</Typography>
          <Typography>{userEmail}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Employee Id:</Typography>
          <Typography>{employeeId}</Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ProfilePage;
