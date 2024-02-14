import axios, { AxiosResponse } from "axios";

export const assignTeamManager = async (userId: string) => {
  try {
    const response: AxiosResponse = await axios.put(
      `http://localhost:3001/updateUserRoleToProjectManager?user_id=${userId}`
    );

    if (response.status === 200) {
      console.log(`User with ID ${userId} assignes as project manager.`);
    } else {
      throw new Error(`Failed to add manager ${userId}`);
    }
  } catch (error: any) {
    throw new Error(`Error assigning user: ${error.message}`);
  }
};
