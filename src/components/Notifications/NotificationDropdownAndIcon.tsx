import React, { useEffect, useState } from "react";
import { Badge, Box, Container, Dropdown, Menu, MenuButton } from "@mui/joy";
import { Notifications } from "@mui/icons-material";
import { notifType } from "./type";
import { NotificationComponent } from "./NotificationDataFormat";
import { Grid } from "@mui/material";

// import { NotificationAlternate } from "./Notification-Comp";
const notificationData: notifType["notif"][] = [
  {
    id: 1,
    title: "That Darn Cat",
    content: "Team-oriented intangible throughput",
    isRead: true,
  },
  {
    id: 2,
    title: "Card Subject To Change",
    content: "Configurable 6th generation intranet",
    isRead: true,
  },
  {
    id: 3,
    title: "Wild Target",
    content: "Ameliorated grid-enabled support",
    isRead: true,
  },
  {
    id: 4,
    title: "Manderlay",
    content: "Intuitive stable product",
    isRead: false,
  },
  {
    id: 5,
    title: "Woo",
    content: "De-engineered contextually-based utilisation",
    isRead: false,
  },
  {
    id: 6,
    title: "Clock, The wonder that records time",
    content: "Centralized optimizing neural-net",
    isRead: true,
  },
  {
    id: 7,
    title: "Joe",
    content: "Reduced fresh-thinking process improvement",
    isRead: true,
  },
  {
    id: 8,
    title: "Early Spring (Soshun)",
    content: "Ergonomic contextually-based matrix",
    isRead: true,
  },
  {
    id: 9,
    title: "It's Not Me, I Swear! (C'est pas moi, je le jure!)",
    content: "Universal bi-directional process improvement",
    isRead: true,
  },
  {
    id: 10,
    title: "Handsome Harry",
    content: "Reverse-engineered bandwidth-monitored projection",
    isRead: true,
  },
];

export const NotificationModal = () => {
  const [length, setLength] = useState(0);
  console.log("Did enter this function.");
  useEffect(() => {
    let unreadCount = 0;

    const unreadNotifications = notificationData.filter(
      (notif) => !notif.isRead
    );
    unreadCount = unreadNotifications.length;
    console.log(unreadNotifications);

    console.log("Unread notifications count:", unreadCount);
    // console.log(typeof len);
    // setLength(5);
    setLength(unreadCount);
  }, [notificationData]);

  console.log(notificationData);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Dropdown>
          <MenuButton variant="plain">
            {length === 0 ? (
              <Notifications />
            ) : (
              <Badge badgeContent={length} max={100} badgeInset="0 -12 0 0">
                <Notifications />
              </Badge>
            )}
          </MenuButton>
          <Menu
            sx={{
              minHeight: "40vh",
              maxHeight: "60vh",
              minWidth: "30vh",
              overflow: "auto",
            }}
          >
            <Grid container spacing={2}>
              <Grid xs={2} sm={4} md={4} lg={4}>
                <Container>
                  <u>
                    <h2>Notifications</h2>
                  </u>
                </Container>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={2} sm={4} md={4} lg={4}>
                <NotificationComponent notify={notificationData} />
              </Grid>
            </Grid>
          </Menu>
        </Dropdown>
      </Box>
    </>
  );
};
