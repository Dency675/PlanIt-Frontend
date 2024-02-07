import axios, { AxiosResponse } from 'axios';

export const deleteUser = async (userId: string) => {
  try {
    const response: AxiosResponse = await axios.put(`http://localhost:3001/editUser?userId=${userId}`, { status: 'inactive' });

    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      console.log(`User with ID ${userId} deleted successfully.`);
    } else {
      throw new Error(`Failed to delete user with ID ${userId}`);
    }
  } catch (error:any) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};
