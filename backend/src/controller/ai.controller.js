const aiService = require("../services/ai.service");

const getReview = async (req, res) => {
  try {
    const prompt = req.query.prompt;

    if (!prompt) {
      return res.status(400).json({
        message: "Please provide prompt",
        success: false,
      });
    }
    const response = await aiService(prompt);
    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = getReview;
