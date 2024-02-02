import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
import Tooltip from "@mui/joy/Tooltip";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import Drawer from "@mui/joy/Drawer";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";

import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SideNav from "./SideNav";
import { CssVarsProvider, useColorScheme } from "@mui/joy";

import { useColorScheme as useJoyColorScheme } from "@mui/joy/styles";
import { useColorScheme as useMaterialColorScheme } from "@mui/material/styles";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

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
  const [open, setOpen] = React.useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "divider",
        m: 2,
        padding: 2,
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
          <IconButton
            size="md"
            variant="outlined"
            color="neutral"
            sx={{
              display: { xs: "none", md: "inline-flex" },
              borderRadius: "50%",
            }}
          >
            <LanguageRoundedIcon />
          </IconButton>

          <Button
            variant="plain"
            color="neutral"
            component="a"
            href="/joy-ui/getting-started/templates/email/"
            size="sm"
            sx={{ alignSelf: "center" }}
          >
            PlanIT
          </Button>
        </Stack>
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
            <DialogTitle>PlanIt</DialogTitle>
            <SideNav />

            <Box sx={{ px: 1 }}>{/* <TeamNav /> */}</Box>
          </Drawer>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1.5,
            alignItems: "left",
          }}
        >
          <ColorSchemeToggle />

          <Tooltip title="Joy UI overview" variant="outlined">
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
          </Tooltip>
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
              <Avatar
                src="https://i.pravatar.cc/40?img=2"
                srcSet="https://i.pravatar.cc/80?img=2"
                sx={{ maxWidth: "32px", maxHeight: "32px" }}
              />
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
                  <Avatar
                    src="https://i.pravatar.cc/40?img=2"
                    srcSet="https://i.pravatar.cc/80?img=2"
                    sx={{ borderRadius: "50%" }}
                  />
                  <Box sx={{ ml: 1.5 }}>
                    <Typography level="title-sm" textColor="text.primary">
                      Rick Sanchez
                    </Typography>
                    <Typography level="body-xs" textColor="text.tertiary">
                      rick@email.com
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              <ListDivider />
              <MenuItem>
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
