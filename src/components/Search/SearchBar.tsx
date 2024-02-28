import { useState, useEffect } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import { Modal, Backdrop, Fade } from "@mui/material";
import axios from "axios";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

interface UserData {
  id: string;
  employeeId: string;
  name: string;
  email: string;
}

interface GuestInputProps {
  setSelectedUserId: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<GuestInputProps> = ({ setSelectedUserId }) => {
  const [usersArray, setUsersArray] = useState<UserData[]>([]);
  const [selectedUserArray, setSelectedUserArray] = useState<
    UserData | undefined
  >(undefined as UserData | undefined);

  const [inputValue, setInputValue] = useState("");
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const handleOpenProfileModal = () => {
    setProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setProfileModalOpen(false);
  };

  // useEffect(() => {
  //   // Clear user data when the component unmounts
  //   return () => {
  //     setSelectedUserArray(undefined);

  //   };
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/searchUser`, {
          params: {
            offset: 0,
            search: inputValue,
          },
        });
        const data = response.data;
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
  }, [inputValue]);

  useEffect(() => {
    if (selectedUserArray) {
      setSelectedUserId(selectedUserArray.id as string);
      handleOpenProfileModal();
    }
  }, [selectedUserArray]);

  console.log("selected", usersArray);

  useEffect(() => {
    if (!isProfileModalOpen) {
      setInputValue(""); // Clear input value when the modal closes
      setUsersArray([]);
      setSelectedUserArray(undefined); // Clear user array when the modal closes
    }
  }, [isProfileModalOpen]);

  return (
    <>
      <Autocomplete
        id="tags-default"
        placeholder="Enter user name"
        options={usersArray}
        autoHighlight
        getOptionLabel={(option) => `${option.name} (${option.email})`}
        onChange={(event, newValue, inputValue) => {
          setInputValue(inputValue);
          setSelectedUserArray(newValue as UserData);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />

      <Modal
        open={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        closeAfterTransition
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <Fade in={isProfileModalOpen}>
          <div style={{ outline: 0, color: "white" }}>
            <ProfilePage user={selectedUserArray} />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default SearchBar;
