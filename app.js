require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handler

app.use(express.static("./project"))
app.use(express.json());
// extra packages

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
