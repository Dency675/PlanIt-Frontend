// import * as React from "react";
// import Input from "@mui/joy/Input";
// import SearchIcon from "@mui/icons-material/Search";

// export default function SearchBar() {
//   return (
//     <>
//       <Input
//         size="lg"
//         placeholder="Search user and teams"
//         endDecorator={<SearchIcon />}
//         sx={{
//           mt: 2,
//           "&::before": {
//             border: "0.1px solid var(--Input-focusedHighlight)",
//             transform: "scaleX(0)",
//             left: "2.5px",
//             right: "2.5px",
//             bottom: 0,
//             top: "unset",
//             transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
//             borderRadius: 0,
//             borderBottomLeftRadius: "64px 20px",
//             borderBottomRightRadius: "64px 20px",
//           },
//           "&:focus-within::before": {
//             transform: "scaleX(1)",
//           },
//         }}
//       />
//     </>
//   );
// }

import * as React from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import axios from "axios";
import { SearchIcon } from "lucide-react";

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
  const [usersArray, setUsersArray] = React.useState<UserData[]>([]);

  const [selectedUserArray, setSelectedUserArray] = React.useState<UserData>();

  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
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

  React.useEffect(() => {
    console.log(" selectedUserArray");
    console.log(selectedUserArray);
    if (selectedUserArray) setSelectedUserId(selectedUserArray.id as string);
  }, [selectedUserArray]);

  return (
    <Autocomplete
      id="tags-default"
      placeholder="Enter user name"
      options={usersArray}
      // endDecorator={<SearchIcon />}
      autoHighlight
      getOptionLabel={(option) => `${option.name} (${option.email})`}
      onChange={(event, newValue, inputValue) => {
        console.log("inputValue");

        console.log("newValue");
        console.log(newValue);

        setSelectedUserArray(newValue as UserData);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        console.log(inputValue);
      }}
    />
  );
};

export default SearchBar;
