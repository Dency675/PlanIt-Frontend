import React, { useState } from "react";
import { DialogContent, DialogTitle, ListDivider, MenuItem } from "@mui/joy";
import { Grid, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { notifType } from "./type";
import { Close } from "@mui/icons-material";

interface NotificationComponentProps {
  notify: notifType["notif"][];
}

export const NotificationComponent: React.FC<NotificationComponentProps> = ({
  notify,
}) => {
  const [notif, setNotif] = useState<notifType["notif"][]>(notify);
  const [notifHoverId, setNotifHoverId] = useState<number | null>(null);
  return (
    <>
      <Grid container spacing={2}>
        <Grid md={"auto"}>
          {notif.map((notifItem) => (
            <MenuItem
              key={notifItem.id}
              color={!notifItem.isRead ? "primary" : "neutral"}
              onClick={(e) => {
                console.log("Notification clicked:", notifItem.id);
                notifItem.isRead = !notifItem.isRead;
              }}
              onMouseEnter={() => setNotifHoverId(notifItem.id)}
              onMouseLeave={() => setNotifHoverId(null)}
            >
              <ListItem
                secondaryAction={
                  notifHoverId === notifItem.id && (
                    <IconButton>
                      <Close />
                    </IconButton>
                  )
                }
              >
                <ListItemText
                  primary={
                    <DialogTitle>
                      {" "}
                      <b>{notifItem.title}</b>
                    </DialogTitle>
                  }
                  secondary={<DialogContent>{notifItem.content}</DialogContent>}
                />
              </ListItem>

              <ListDivider />
            </MenuItem>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
