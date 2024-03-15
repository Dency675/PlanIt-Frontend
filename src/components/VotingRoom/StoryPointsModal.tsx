import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Card,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Input,
  ModalDialog,
  useTheme,
} from "@mui/joy";

interface StoryPointsModalProps {
  open: boolean;
  onClose: () => void;
  onSaveToJira: (save: boolean) => void;
  teamId: number;
  sessionId: string;
}

const StoryPointsModal: React.FC<StoryPointsModalProps> = ({
  open,
  onClose,
  onSaveToJira,
  teamId,
  sessionId,
}) => {
  const handleYesClick = () => {
    onSaveToJira(true);
    onClose();
    window.location.href = `http://localhost:3001/auth/jira/${teamId}?sessionId=${sessionId}`;
  };

  const handleNoClick = () => {
    onSaveToJira(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>Do you want to add story points to Jira?</DialogTitle>

        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleNoClick}>
            No
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="success"
            onClick={handleYesClick}
          >
            Yes
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default StoryPointsModal;
