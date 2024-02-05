const GetLogin = async (token: string): Promise<string[]> => {
  try {
    console.log("jhgf");
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

    console.log(response);
    console.log("data");
    console.log(data.roles[0].role_name);
    const roles = data.roles || [];
    console.log(roles);
    return roles.map((role: any) => role.role_name.toLowerCase());
  } catch (error) {
    console.error("Error sending token to server:", error);
    return [];
  }
};

export default GetLogin;
