const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });
console.log(process.env.GOOGLE_GEMINI_KEY);

async function generateContent(prompt) {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    console.log(result.text);
    return result.text;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = generateContent;
