import * as React from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import axios from "axios";

interface UserData {
  id: string;
  employeeId: string;
  name: string;
  email: string;
}

interface GuestInputProps {
  setSelectedUserArrayWithId: React.Dispatch<
    React.SetStateAction<{ userId: string; roleId: number }[]>
  >;
}

const GuestInput: React.FC<GuestInputProps> = ({
  setSelectedUserArrayWithId,
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

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3001/searchUserFilter`,
          {
            userList: userList,
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
      email: user.email,
      givenName: user.name.split(" ")[0],
    }));
    const updatedUserListWithId = selectedUserArray.map((user) => ({
      userId: user.id,
      roleId: 4,
    }));

    setSelectedUserArrayWithId(updatedUserListWithId);
    setUserList(updatedUserList);
  }, [selectedUserArray]);

  return (
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
  );
};

export default GuestInput;
