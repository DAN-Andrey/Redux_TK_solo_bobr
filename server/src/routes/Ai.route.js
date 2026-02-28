const AiController = require("../controllers/Ai.controller");
const aiRouter = require("express").Router();

aiRouter.post("/aireq", AiController.getAiResponse);

module.exports = aiRouter;
