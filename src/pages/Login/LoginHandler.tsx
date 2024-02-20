import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "./Context/UserRoleContext";
import { loginRequest } from "./Authentication/authConfig";
import GetLogin from "./apis/GetLogin";

const useLoginHandler = (onLoginSuccess: () => void) => {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const { setUserRoles, setUserId } = useUserRole(); // Include setUserId from the context

  const handleLogin = async (loginType: string) => {
    if (loginType === "popup") {
      try {
        const response = await instance.loginPopup(loginRequest);
        console.log(response.accessToken);
        const { roles, userId } = await GetLogin(response.accessToken);

        console.log("from login");
        console.log(response);
        console.log(roles);
        console.log(userId);
        if (roles.length > 0) {
          setUserRoles(roles);
          setUserId(userId);
          console.log(userId); // Set the userId in the context
          localStorage.setItem("userId", userId); // Store userId in sessionStorage directly
          sessionStorage.setItem("userRoles", JSON.stringify(roles));

          let role = roles[0].trim().replace(/ /g, "_");

          if (role === "admin") navigate(`/dashboard`);
          else navigate(`/home`);
        }
        onLoginSuccess();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return { handleLogin };
};

export default useLoginHandler;
