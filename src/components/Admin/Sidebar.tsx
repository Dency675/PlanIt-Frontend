import React, { useState } from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import logo from "../../assets/images/logo_Pi.png";
import { closeSidebar } from "../utils";
import GroupIcon from "@mui/icons-material/Group";
import Groups2Icon from "@mui/icons-material/Groups2";
import { useMsal } from "@azure/msal-react";
import { MdRecordVoiceOver } from "react-icons/md";
import getUserInformationById from "../../pages/TeamManagement/api/fetchUserData";
import { useColorScheme as useJoyColorScheme } from "@mui/joy/styles";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}
interface SidebarProps {
  SendValueToParent: (tabName: any) => void;
  // Add other props here if needed
}

export const Sidebar: React.FC<SidebarProps> = ({ SendValueToParent }) => {
  const [selectedTab, setSelectedTab] = useState(null);
  const userId = localStorage.getItem("userId");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  React.useEffect(() => {
    getUserInformationById(userId as string)
      .then(({ givenName, email }) => {
        setName(givenName);
        setEmail(email);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleTabClick = (tabName: any) => {
    setSelectedTab(tabName);
    SendValueToParent(tabName);
  };

  const { setMode: setJoyMode } = useJoyColorScheme();
  const { mode } = useJoyColorScheme();
  const { instance } = useMsal();

  const logOut = () => {
    localStorage.removeItem("roleID");
    sessionStorage.clear();
    localStorage.removeItem("userId");
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  function stringAvatar(givenName: string) {
    console.log(givenName);
    return {
      sx: {
        bgcolor: mode === "light" ? "lightgrey" : "darkgrey", // Adjusting background color based on theme mode
      },
      children: `${givenName.split(" ")[0][0]}`,
    };
  }

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Box>
          <img src={logo} style={{ width: "100px", height: "45px" }} />
        </Box>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
              selected={selectedTab === "users"}
              onClick={() => handleTabClick("users")}
            >
              <GroupIcon />
              <ListItemContent>
                <Typography level="title-sm">Users</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={selectedTab === "teams"}
              onClick={() => handleTabClick("teams")}
            >
              <Groups2Icon />
              <ListItemContent>
                <Typography level="title-sm">Teams</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={selectedTab === "projectmanager"}
              onClick={() => handleTabClick("projectmanager")}
            >
              <MdRecordVoiceOver />
              <ListItemContent>
                <Typography level="title-sm">Project Manager</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {/* <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        /> */}

        <Avatar {...stringAvatar(name)} />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{name}</Typography>
          <Typography level="body-xs" noWrap>
            {email}
          </Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" onClick={logOut}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
};
function SendValueToParent(tabName: any) {
  throw new Error("Function not implemented.");
}
