require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

app.use(express.static("./project"))
app.use(express.json());

app.use(helmet())
app.use(cors())
app.use(xss())

app.set("trust proxy",1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
}))

const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocument = YAML.load("./swagger.yaml")

  app.use(express.static("./project"))

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

const AuthRouter = require("./routes/auth")
  app.use("/api/v1/auth",AuthRouter)
const authMidd = require("./middleware/authentication")
const JobsRouter = require("./routes/jobs")
  app.use("/api/v1/jobs",authMidd,JobsRouter)

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const connectDB = require("./db/connect")

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
