import { Grid, Avatar, Typography, Paper, Box } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";

interface UserData {
  id: string;
  employeeId: string;
  name: string;
  email: string;
}

interface ProfilePageProps {
  user?: UserData; // Change the prop to accept the entire user object
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  // You can add additional state to hold user information
  const [userData, setUserData] = React.useState<any>(null);

  console.log("user", user);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3001/getUserById`, {
  //         params: {
  //           userId: userId,
  //         },
  //       });

  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, [userId]);

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
        <Box>
          <Typography variant="h6">Employee Id:</Typography>
          <Typography>{employeeId}</Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ProfilePage;
