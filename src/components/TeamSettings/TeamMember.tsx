// TeamMember.jsx

import {
  Avatar,
  Button,
  ButtonGroup,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  ModalDialog,
  Typography,
} from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Modal from "@mui/joy/Modal";
import DeleteForever from "@mui/icons-material/DeleteForever";
import React from "react";

export interface TeamMemberProps {
  teamMember: {
    id: number;
    givenName: string;
    roleName: string;
    isScrumMaster: boolean;
  };

  // teamMember: {
  //   id: number;

  //   userInformation: {
  //     givenName: string;
  //   };

  //   role: {
  //     roleName: string;
  //   };
  // };

  onRemove: (id: number) => void;
  onMakeScrumMaster: (id: number) => void;
}

const TeamMember = ({
  teamMember,
  onRemove,
  onMakeScrumMaster,
}: TeamMemberProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const { givenName } = teamMember;

  const { roleName } = teamMember;
  // const handleMakeScrumMasterClick = () => {
  //   onMakeScrumMaster(teamMember.id);

  // console.log("check2");

  // console.log(teamMember.id);

  return (
    <ListItem
      sx={{
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-start" },
      }}
    >
      <ListItemDecorator>
        <Avatar src="/static/images/avatar/1.jpg" />
      </ListItemDecorator>

      <ListItemContent sx={{ ml: { xs: 0, md: 2 } }}>
        <Typography level="title-sm" textColor={"black"}>
          {givenName}
        </Typography>

        <Typography level="body-xs" noWrap>
          {roleName}
        </Typography>
      </ListItemContent>

      <ButtonGroup
        sx={{ mt: { xs: 2, md: 0 } }}
        spacing="0.5rem"
        aria-label="spacing button group"
      >
        {/* {teamMember.isScrumMaster ? (
          <Button disabled>Scrum Master</Button>
        ) : (
          <Button onClick={() => onMakeScrumMaster(teamMember.id)}>
            Make Scrum Master
          </Button>
        )} */}

        <Button
          disabled={teamMember.isScrumMaster} // Disable only if member is already a Scrum Master
          onClick={() => onMakeScrumMaster(teamMember.id)}
        >
          Make Scrum Master
        </Button>

        <Button
          variant="outlined"
          // color="danger"
          endDecorator={<DeleteForever />}
          onClick={() => setOpen(true)}
          //  onClick={() => onRemove(teamMember.id)}
        >
          Remove
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
              <WarningRoundedIcon />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              Are you sure you want to remove member?
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="danger"
                onClick={() => {
                  onRemove(teamMember.id);
                  setOpen(false);
                }}
              >
                Remove
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </ButtonGroup>
    </ListItem>
  );
};
export { TeamMember };
