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

    const roles: string[] = data.roles.map((role: any) =>
      role.role_name.toLowerCase()
    );
    const userId: string = data.userId;

    return { roles, userId };
  } catch (error) {
    console.error("Error sending token to server:", error);
    return { roles: [], userId: "" };
  }
};

export default GetLogin;
