import {
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link,
  Typography,
} from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import React from "react";
import Button from "@mui/joy/Button";
import Logo from "../../assets/images/logo_Pi.png";
import { size } from "@floating-ui/core";
import { width } from "@mui/system";
import { Add } from "@mui/icons-material";
import { SiMicrosoftoutlook } from "react-icons/si";
import useLoginHandler from "../../pages/Login/LoginHandler";

const RightComponent = () => {
  const { handleLogin } = useLoginHandler(() => {
    console.log("Logged in successfully");
  });
  return (
    <Sheet
      sx={{
        width: 350,
        // mx: 'auto', // margin left & right
        marginLeft: 0,
        marginRight: "auto",
        my: 12, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
      variant="soft"
    >
      <center>
        <Box>
          <img src={Logo} style={{ width: "100px", height: "45px" }} />
        </Box>
      </center>
      <Divider />
      <center>
        <div>
          <Typography
            level="h4"
            component="h1"
            sx={{ py: 2, alignContent: "center", alignItems: "center" }}
          >
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
      </center>
      {/* <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            // html input attribute
            name="email"
            type="email"
            placeholder="johndoe@email.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            // html input attribute
            name="password"
            type="password"
            placeholder="password"
          />
        </FormControl> */}
      <Button
        sx={{ mt: 1 /* margin top */ }}
        startDecorator={<SiMicrosoftoutlook />}
        onClick={() => handleLogin("popup")}
      >
        {" "}
        Continue with Outlook
      </Button>
      <Divider />

      <Typography
        endDecorator={<Link href="/sign-up"> Continue with Outlook</Link>}
        fontSize="sm"
        sx={{ alignSelf: "center" }}
      >
        Don&apos;t have an account?
      </Typography>
    </Sheet>
  );
};

export default RightComponent;
