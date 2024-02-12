import * as React from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { Button, Modal, Typography } from "@mui/joy";
import { useState } from "react";
import {
  ModalDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/joy";

interface UserData {
  id: string;
  employeeId: string;
  name: string;
  email: string;
}

interface AddMemberProps {
  setSelectedUserArrayWithId: React.Dispatch<
    React.SetStateAction<{ userId: string; roleId: number }[]>
  >;
}

const AddMember: React.FC<AddMemberProps & { teamId: number }> = ({
  setSelectedUserArrayWithId,
  teamId,
}) => {
  const [usersArray, setUsersArray] = React.useState<UserData[]>([]);
  const [selectedUserArray, setSelectedUserArray] = React.useState<UserData[]>(
    []
  );
  // const [search, setSearch] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState("");
  const [userList, setUserList] = React.useState<
    { email: string; givenName: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalMessage, setModalMessage] = React.useState<string>("");

  // Reset inputValue when the team changes
  // React.useEffect(() => {
  //   setInputValue("");
  // }, [teamId]);

  const handleAddUsers = async () => {
    try {
      console.log("selectedUserArray");
      console.log(selectedUserArray);
      const requestBody = {
        teamId: teamId,
        userIds: selectedUserArray.map((user) => user.id),
      };

      console.log("requestBody");
      console.log(requestBody);
      const response = await axios.post(
        "http://localhost:3001/addMultipleMembers",
        requestBody
      );

      console.log("Users added successfully:", response.data);
      // Reset selected users
      setSelectedUserArray([]);
      // Open modal
      setModalMessage("Successfully Added!");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error adding users:", error);
    }
  };

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3001/searchUserFilter`,
          {
            userList: userList,
            teamId: teamId,
          },
          {
            params: {
              offset: 0,
              search: inputValue,
            },
          }
        );
        const data = response.data;
        // Transform the received data into the format you need
        const transformedUsers = data.userResults.map((user: any) => ({
          id: user.id,
          employeeId: user.employeeId,
          name: `${user.givenName} ${user.surName}`,
          email: user.email,
        }));
        setUsersArray(transformedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [inputValue, userList]);

  React.useEffect(() => {
    console.log("userList");
    console.log(userList);
  }, [userList]);

  React.useEffect(() => {
    console.log("selectedUserArray");
    console.log(selectedUserArray);
    const updatedUserList = selectedUserArray.map((user) => ({
      id: user.id,
      email: user.email,
      givenName: user.name.split(" ")[0],
    }));
    const updatedUserListWithId = selectedUserArray.map((user) => ({
      userId: user.id,
      roleId: 4,
    }));

    setSelectedUserArrayWithId(updatedUserListWithId);
    setUserList(updatedUserList);
  }, [selectedUserArray, setSelectedUserArrayWithId]);

  return (
    <>
      <Autocomplete
        multiple
        id="tags-default"
        placeholder="Enter user name"
        options={usersArray}
        autoHighlight
        getOptionLabel={(option) => `${option.name} (${option.email})`}
        defaultValue={[]}
        onChange={(event, newValue, inputValue) => {
          console.log("inputValue");

          newValue.map((n) => {
            console.log(n.email);
          });
          console.log("newValue");
          console.log(newValue);

          setSelectedUserArray(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          console.log(inputValue);
        }}
      />
      <Button
        sx={{ mx: 2 }}
        variant="outlined"
        color="neutral"
        onClick={handleAddUsers}
      >
        Add Users
      </Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalDialog>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <Typography>{modalMessage}</Typography>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default AddMember;
