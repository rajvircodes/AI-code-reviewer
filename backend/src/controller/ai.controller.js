const aiService = require("../services/ai.service");

const getReview = async (req, res) => {
  try {
    const code = req.body.code;
    if (!code) {
      return res.status(400).json({
        message: "Please provide code",
        success: false,
      });
    }

    const response = await aiService(code);
    res.send(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = getReview;
