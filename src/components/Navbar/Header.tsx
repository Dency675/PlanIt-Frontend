import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import Tooltip from "@mui/joy/Tooltip";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import Drawer from "@mui/joy/Drawer";
import ModalClose from "@mui/joy/ModalClose";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SideNav from "./SideNav";
import { Badge, CssVarsProvider } from "@mui/joy";

import { useColorScheme as useJoyColorScheme } from "@mui/joy/styles";
import { useColorScheme as useMaterialColorScheme } from "@mui/material/styles";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useMsal } from "@azure/msal-react";

import LightLogo from "../../assets/images/logo_Pi.png";
import DarkLogo from "../../assets/images/logo_white.png";
import getUserInformationById from "../../pages/TeamManagement/api/fetchUserData";
import { useNavigate } from "react-router";
import { NotificationModal } from "../Notifications/NotificationDropdownAndIcon";
import { Notifications } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import { NotificationComponent } from "../Notifications/NotificationDataFormat";

function ColorSchemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { mode, setMode: setMaterialMode } = useMaterialColorScheme();
  const { setMode: setJoyMode } = useJoyColorScheme();
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }

  return (
    <Tooltip title="Change theme" variant="outlined">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{ alignSelf: "center" }}
        onClick={() => {
          if (mode === "light") {
            setMaterialMode("dark");
            setJoyMode("dark");
          } else {
            setMaterialMode("light");
            setJoyMode("light");
          }
        }}
      >
        {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function Header() {
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const [length, setLength] = React.useState<number>(0);
  const navigate = useNavigate();
  const { instance } = useMsal();
  const { mode } = useJoyColorScheme();

  const logOut = () => {
    localStorage.removeItem("roleID");
    sessionStorage.clear();
    localStorage.removeItem("userId");
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };
  React.useEffect(() => {
    getUserInformationById(userId as string)
      .then(({ givenName, email, surName }) => {
        console.log("Given name:", givenName);

        setName(givenName + " " + surName);
        setEmail(email);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function stringAvatar(givenName: string) {
    console.log(givenName);

    return {
      sx: {
        bgcolor: mode === "light" ? "lightgrey" : "darkgrey",
      },
      children: `${givenName.split(" ")[0][0]}`,
    };
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "divider",
        m: 1,
        mb: 2,
        padding: 1,
      }}
    >
      <CssVarsProvider>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Box>
            <img
              src={
                localStorage.getItem("joy-mode") === "dark"
                  ? DarkLogo
                  : LightLogo
              }
              alt=""
              style={{ width: "100px", height: "45px" }}
              onClick={() => {
                navigate(`/home`);
              }}
            />
          </Box>
        </Stack>
        <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
          <IconButton variant="plain" color="neutral">
            <Notifications />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
          <IconButton
            variant="plain"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Drawer
            sx={{ display: { xs: "inline-flex", md: "none" } }}
            open={open}
            onClose={() => setOpen(false)}
          >
            <ModalClose />
            <Box sx={{ px: 1, pt: 1 }}>
              <img
                src={
                  localStorage.getItem("joy-mode") === "dark"
                    ? DarkLogo
                    : LightLogo
                }
                alt=""
                style={{ width: "100px", height: "45px" }}
                onClick={() => {
                  navigate(`/home`);
                }}
              />
            </Box>
            <SideNav
              onSelectTeam={function (teamId: number): void {}}
              resetSelectedUserArray={function (): void {}}
              updateTeamList={function (
                newTeamList: { id: number; teamName: string }[]
              ): void {}}
            />

            <Box sx={{ px: 1 }}>{/* <TeamNav /> */}</Box>
          </Drawer>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 3.5,
            alignItems: "left",
            pb: 2,
          }}
        >
          <NotificationModal />
          <ColorSchemeToggle />

          {/* <Tooltip title="Joy UI overview" variant="outlined">
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              component="a"
              href="/blog/first-look-at-joy/"
              sx={{ alignSelf: "center" }}
            >
              <NotificationsActiveIcon />
            </IconButton>
          </Tooltip> */}
          {/* <ColorSchemeToggle /> */}
          <Dropdown>
            <MenuButton
              variant="plain"
              size="sm"
              sx={{
                maxWidth: "32px",
                maxHeight: "32px",
                borderRadius: "9999999px",
              }}
            >
              {/* <Avatar
                src="https://i.pravatar.cc/40?img=2"
                srcSet="https://i.pravatar.cc/80?img=2"
                sx={{ maxWidth: "32px", maxHeight: "32px" }}
              /> */}

              <Avatar {...stringAvatar(name)} />
            </MenuButton>
            <Menu
              placement="bottom-end"
              size="sm"
              sx={{
                zIndex: "99999",
                p: 1,
                gap: 1,
                "--ListItem-radius": "var(--joy-radius-sm)",
              }}
            >
              <MenuItem>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar {...stringAvatar(name)} />
                  <Box sx={{ ml: 1.5 }}>
                    <Typography level="title-sm" textColor="text.primary">
                      {name}
                    </Typography>
                    <Typography level="body-xs" textColor="text.tertiary">
                      {email}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              <ListDivider />
              <MenuItem onClick={logOut}>
                <LogoutRoundedIcon />
                Log out
              </MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      </CssVarsProvider>
    </Box>
  );
}
