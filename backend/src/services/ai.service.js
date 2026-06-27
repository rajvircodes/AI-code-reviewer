const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

async function generateContent(code) {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: code,
      config: {
        systemInstruction: `You are a blunt, expert senior developer conducting an ultra-concise code review. 
        Your response must be brief and structured strictly as follows:

        1. ❌ Issues: Maximum 2-3 bullet points calling out major bugs, security holes, or bad practices. If the code is perfect, just say "Looks clean."
        2. 🛠️ Fix: A single, optimized, refactored code snippet showing the solution.
        3. 💡 Tip: One sentence max on how to prevent this issue or improve.

        Keep filler text, polite introductions, and long explanations completely out of your response.`,
      },
    });

    console.log(result.text);
    return result.text;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = generateContent;
