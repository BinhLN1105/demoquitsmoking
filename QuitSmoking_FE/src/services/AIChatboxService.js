<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
=======
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `${import.meta.env.VITE_API_URL}`;
>>>>>>> d9771916ef21d7f9c4204541bf68445c0d61e038
=======
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
>>>>>>> 2ab7ab5 (Deploy)
=======
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
>>>>>>> 9ac8281 (First commit)

export async function askGemini(message) {
  const body = {
    contents: [
      {
        parts: [{ text: message }]
      }
    ]
  };
  const res = await fetch(`${API_BASE_URL}/api/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error("Gemini proxy error");
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi từ AI.";
}