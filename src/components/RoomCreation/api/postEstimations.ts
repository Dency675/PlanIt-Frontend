const BASE_URL = "http://localhost:3001";

export async function postEstimations(estimationPayload: any) {
  try {
    const response = await fetch(`${BASE_URL}/postEstimations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estimationPayload),
    });

    if (!response.ok) {
      throw new Error("Error submitting estimation data to the API.");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error submitting estimation data to the API.");
  }
}
