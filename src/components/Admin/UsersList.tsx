import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import SearchIcon from "@mui/icons-material/Search";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useState, useEffect } from "react";
import { UserList } from "../../pages/Admin/types/UserList";
import Snackbar from "@mui/joy/Snackbar";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import { fetchUsersData } from "../../pages/Admin/apis/usersList";
import { searchUsers } from "../../pages/Admin/apis/SearchUser";
import { deleteUser } from "../../pages/Admin/apis/RemoveUser";
import { assignTeamManager } from "../../pages/Admin/apis/AssignManager";
import {
  ButtonGroup,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { fetchTeamManagers } from "../../pages/Admin/apis/ProjectManager";
import { User } from "../../pages/Admin/types/ProjectManager";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const data = comparator(a[0], b[0]);
    if (data !== 0) {
      return data;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function UsersList() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  // const [searchQuery, setSearchQuery] = React.useState('');
  const [data, setData] = useState<UserList[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openManagerSnack, setOpenManagerSnack] = useState(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string>("");
  const [managerData, setManagerData] = useState<User[]>([]); // Provide initial value of empty array

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const adminUserId = localStorage.getItem("userId");
        const fetchedData = await fetchUsersData(page);
        const filteredData = fetchedData.filter(
          (data: any) => data.id !== adminUserId
        );
        if (filteredData.length === 0) {
          setHasMoreData(false);
        } else {
          setData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const fetchProjectManagerData = async () => {
      try {
        const fetchedManagerData = await fetchTeamManagers();

        if (!fetchedManagerData) {
          setManagerData([]);
        } else {
          setManagerData(fetchedManagerData);
        }
        console.log("MANAGER DATA:", managerData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProjectManagerData();
  }, []);

  const handleNextPage = () => {
    setPage(page + 7);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 7);
  };

  function RowMenu({ userId, status }: { userId: string; status: string }) {
    const handleDeleteClick = (userId: string) => {
      setUserIdToDelete(userId);
      setOpen(true);
    };

    const handleDelete = async () => {
      if (userIdToDelete !== null) {
        try {
          await deleteUser(userIdToDelete);
          console.log(`User with ID ${userIdToDelete} deleted successfully.`);
          // setOpen(true)
          setOpenSnackbar(true);

          // setData(data.filter(user => user.id !== userId));
          setData((prevData) =>
            prevData.map((user) =>
              user.id === userIdToDelete
                ? { ...user, status: "inactive" }
                : user
            )
          );
        } catch (error) {
          console.error("Error deleting user :", error);
        } finally {
          setOpen(false);
        }
      }
    };

    const assignManager = async () => {
      setOpenManagerSnack(true);
      try {
        await assignTeamManager(userId);
        console.log(`User with ID ${userId} assigned as mansager.`);
        // setManagerData((prev) =>
        //   prev.map((user) =>
        //     user.id === userId ? { ...user, role_id:  } : user
        //   )
        // );
        console.log();
      } catch (error) {
        console.error("Error assigning user :", error);
      }
    };
    return (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: "plain", color: "neutral", size: "sm" },
          }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem disabled={status === "inactive"} onClick={assignManager}>
            Assign Project Manager{" "}
          </MenuItem>
          <Divider />
          <MenuItem
            color="danger"
            disabled={status === "inactive"}
            onClick={() => handleDeleteClick(userId)}
          >
            Delete
          </MenuItem>
        </Menu>

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
              <Button variant="solid" color="danger" onClick={handleDelete}>
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

        <Snackbar
          variant="soft"
          color="success"
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
          endDecorator={
            <Button
              onClick={() => setOpenSnackbar(false)}
              size="sm"
              variant="soft"
              color="success"
            >
              Dismiss
            </Button>
          }
        >
          Account has been deactivated
        </Snackbar>

        <Snackbar
          variant="soft"
          color="success"
          open={openManagerSnack}
          onClose={() => setOpenManagerSnack(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
          endDecorator={
            <Button
              onClick={() => setOpenManagerSnack(false)}
              size="sm"
              variant="soft"
              color="success"
            >
              Dismiss
            </Button>
          }
        >
          Project Manager Added
        </Snackbar>
      </Dropdown>
    );
  }
  const handleSearch = async (e: any) => {
    setSearchQuery(e.target.value);
    try {
      const searchResults = await searchUsers(e.target.value);
      setData(searchResults);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          onChange={handleSearch}
          value={searchQuery}
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for user</FormLabel>
          <Input
            value={searchQuery}
            onChange={handleSearch}
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "block", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 290, padding: "14px 10px" }}>Name</th>
              <th style={{ width: 90, padding: "12px 10px" }}>Status</th>
              <th style={{ width: 80, padding: "12px 8px" }}>Department</th>
              <th style={{ width: 100, padding: "12px 10px" }}>Role</th>
              <th style={{ width: 80, padding: "12px 10px" }}>Set Role </th>
            </tr>
          </thead>
          <tbody>
            {stableSort(filteredRows, getComparator(order, "id")).map((row) => (
              //  {filteredRows.map((row) => (
              <tr key={row.id}>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar size="sm">
                      {row.givenName.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                      <Typography level="body-xs">{row.givenName}</Typography>
                      <Typography level="body-xs">{row.email}</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        active: <CheckRoundedIcon />,
                        // inactive: <AutorenewRoundedIcon />,
                        inactive: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        active: "success",
                        // inactive: 'neutral',
                        inactive: "danger",
                      }[row.status] as ColorPaletteProp
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Typography level="body-xs">{row.department}</Typography>
                </td>
                <td>
                  <Chip variant="soft">
                    {managerData.some((manager) => manager.id === row.id)
                      ? "Project Manager"
                      : "Team Member"}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <RowMenu userId={row.id} status={row.status} />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          Previous
        </Button>
        {hasMoreData && (
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            endDecorator={<KeyboardArrowRightIcon />}
            onClick={handleNextPage}
            disabled={!hasMoreData}
          >
            Next
          </Button>
        )}
      </Box>
    </React.Fragment>
  );
}
