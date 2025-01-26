const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
