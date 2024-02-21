import axios from "axios";

const addUserStoriesAndSessionMapping = async (
  fileName: string,
  sessionId: number
) => {
  try {
    const FileResponse = await axios.post(
      "http://localhost:3001/addUserStoriesAndSessionMapping",
      {
        key: fileName,
        sessionId: sessionId,
      }
    );
    return FileResponse.data; // Return the response data if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Throw the error for handling outside of this function
  }
};

export default addUserStoriesAndSessionMapping;
