const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// ✅ Save Performance Data
export const submitPerformanceData = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/performance/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to submit performance data");
    return response.json();
  } catch (error) {
    console.error("❌ Error submitting performance data:", error);
  }
};

// ✅ Get User Performance Data
export const getPerformanceData = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/performance/${userId}`);

    if (!response.ok) throw new Error("Failed to fetch performance data");
    return response.json();
  } catch (error) {
    console.error("❌ Error fetching performance data:", error);
  }
};

// ✅ Send a Message
export const sendMessage = async (messageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/messages/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      const errorData = await response.text(); // Log server response
      console.error("❌ Message Send Error:", errorData);
      throw new Error("Failed to send message");
    }

    return response.json();
  } catch (error) {
    console.error("❌ Error sending message:", error);
  }
};

// ✅ Fetch Chat History
export const getMessages = async (user1, user2) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/messages/${user1}/${user2}`);

    if (!response.ok) throw new Error("Failed to fetch messages");
    return response.json();
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
  }
};

// ✅ User Signup
export const signup = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const login = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};