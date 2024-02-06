
import axios from 'axios';

export const fetchUserDetails = async () => {
  try {
    const response = await axios.get('https:localhost:3000/getUser');
    return response.data; // Assuming the response contains an array of user objects
  } catch (error) {
    console.error('Error fetching user details:', error);
    return []; // Return an empty array if there's an error
  }
};
