import axios from "axios";

const getTempUserId = () => {
  let userId = localStorage.getItem("tempUserId");
  if (!userId) {
    userId = `user_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("tempUserId", userId);
  }
  return userId;
};

export const sendMessage = async (input) => {
  if (!input.trim()) return { text: "Mensaje vacío", sentiment: "neutral" };

  const userId = getTempUserId();

  try {
    const response = await axios.post("https://backend-mind-care.onrender.com/api/chat", {
      message: input,
      userId
    });

    console.log("Respuesta del servidor:", response.data);

    return {
      text: response.data.response?.text || String(response.data.response),
      sentiment: response.data.sentiment
    };
  } catch (error) {
    console.error("Error en el chatbot:", error);
    return { text: "Error conectando con el chatbot", sentiment: "neutral" };
  }
};



