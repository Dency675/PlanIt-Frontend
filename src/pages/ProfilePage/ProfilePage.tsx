import { Grid, Avatar, Typography, Paper, Box } from "@mui/material";
import React from "react";

const ProfilePage = () => {
  const avatarUrl = "your_avatar_url.jpg";
  const userName = "Your Name";
  const userEmail = "your.email@example.com";

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", background: "#f5f5f5" }}
    >
      <Paper
        elevation={3}
        style={{ padding: "40px", textAlign: "center", maxWidth: "500px" }}
      >
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Avatar
          alt={userName}
          src={avatarUrl}
          style={{
            width: 120,
            height: 120,
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
      </Paper>
    </Grid>
  );
};

export default ProfilePage;
