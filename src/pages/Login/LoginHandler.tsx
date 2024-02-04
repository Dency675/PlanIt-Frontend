import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "./Context/UserRoleContext";
import { loginRequest } from "./Authentication/authConfig";
import GetLogin from "./apis/GetLogin";

const useLoginHandler = (onLoginSuccess: () => void) => {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const { setUserRoles } = useUserRole();

  const handleLogin = async (loginType: string) => {
    if (loginType === "popup") {
      try {
        const response = await instance.loginPopup(loginRequest);
        console.log(response.accessToken);
        const roles = await GetLogin(response.accessToken);
        console.log(response);
        console.log(roles);

        if (roles.length > 0) {
          setUserRoles(roles);
          sessionStorage.setItem("userRoles", JSON.stringify(roles));
          // Navigate based on the primary role
          navigate(`/${roles[0]}/home`);
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
