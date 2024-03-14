const BASE_URL = "http://localhost:3001";

export async function postCardValues(cardValuesPayload: any) {
  try {
    const response = await fetch(`${BASE_URL}/scales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardValuesPayload),
    });

    if (!response.ok) {
      throw new Error("Error submitting card values to the API.");
    }

    return true;
  } catch (error) {
    throw new Error("Error submitting card values to the API.");
  }
}
