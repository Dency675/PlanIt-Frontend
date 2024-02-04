const GetLogin = async (token: string): Promise<string[]> => {
  try {
    console.log("jhgf");
    const response = await fetch("https://localhost:3001/addUser", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log(response);
    console.log("data");
    console.log(data);
    const roles = data.roles || [];
    return roles.map((role: any) => role.roleName.toLowerCase());
  } catch (error) {
    console.error("Error sending token to server:", error);
    return [];
  }
};

export default GetLogin;
