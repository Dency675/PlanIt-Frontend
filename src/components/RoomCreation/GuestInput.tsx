import * as React from "react";
import Autocomplete from "@mui/joy/Autocomplete";
// import axios from "axios";
// import TextField from "@mui/material/TextField";

interface UserData {
  id: string;
  employeeId: string;
  name: string;
  email: string;
}
const GuestInput: React.FC = () => {
  const [usersArray, setUsersArray] = React.useState<UserData[]>([]);

  const [selectedUserArray, setSelectedUserArray] = React.useState<UserData[]>(
    []
  );
  const [search, setSearch] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/searchUser?offset=0&search=${inputValue}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
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
  }, [inputValue]);

  React.useEffect(() => {
    console.log("selectedUserArray");
    console.log(selectedUserArray);
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
