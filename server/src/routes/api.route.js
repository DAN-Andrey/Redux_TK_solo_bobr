const express = require("express");
const articleRouter = require('./article.route');
const authRouter = require("./auth.route");
const aiRouter = require("./Ai.route");

const apiRouter = express.Router();

apiRouter.use('/articles', articleRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/ai', aiRouter)

module.exports = apiRouter;
