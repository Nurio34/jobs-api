require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handler

app.use(express.json());

// extra packages

// routers
const authRouter=  require("./routes/auth")
  app.use("/api/v1/auth",authRouter)
const jobsRouter=  require("./routes/jobs")
  app.use("/api/v1/jobs",jobsRouter)


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
