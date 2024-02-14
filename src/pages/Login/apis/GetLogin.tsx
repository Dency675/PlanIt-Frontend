import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  userId: string;
  roles: string[];
  exp: number;
  iss: string;
}

const GetLogin = async (
  token: string
): Promise<{ roles: string[]; userId: string }> => {
  try {
    const response = await fetch("http://localhost:3001/addUser", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    if (!data.token) {
      console.error("JWT not found in response");
      return { roles: [], userId: "" };
    }

    const decoded: JWTPayload = jwtDecode(data.token);
    // localStorage.setItem("userId", decoded.userId);

    console.log("decoded.userId", data.token);
    console.log("decoded.userId", decoded.userId);
    console.log("decoded.userId", decoded.roles);

    const roles: string[] = decoded.roles;
    const userId: string = decoded.userId;

    console.log("decoded.userId", roles);
    console.log("decoded.userId", userId);

    return { roles, userId };
  } catch (error) {
    console.error("Error sending token to server:", error);
    return { roles: [], userId: "" };
  }
};

export default GetLogin;
