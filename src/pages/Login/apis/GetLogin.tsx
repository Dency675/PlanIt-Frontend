// const GetLogin = async (
//   token: string
// ): Promise<{ roles: string[]; userId: string }> => {
//   try {
//     // const GetLogin = async (token: string): Promise<string[]> => {
//     //   try {
//     console.log("jhgf");
//     const response = await fetch("http://localhost:3001/addUser", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch users");
//     }
//     const data = await response.json();

//     console.log(response);
//     console.log("data");
//     console.log(data.roles[0].role_name);
//     console.log("user");
//     console.log(data.userId);
//     // const roles = data.roles || [];
//     const roles: string[] = data.roles.map((role: any) =>
//       role.role_name.toLowerCase()
//     );
//     const userId: string = data.userId;
//     console.log(roles);
//     // return {roles.map((role: any) => role.role_name.toLowerCase()), userId};return { roles, userId };
//     // return roles;
//     return { roles, userId };
//   } catch (error) {
//     console.error("Error sending token to server:", error);
//     // return [];
//     // return { roles: [] };
//     return { roles: [], userId: "" };
//   }
// };

// export default GetLogin;
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
