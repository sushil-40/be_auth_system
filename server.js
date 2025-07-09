import express from "express";
import cors from "cors";
import { dbConnect } from "./src/config/dbConfig.js";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

//api endpoints
import authRoute from "./src/routes/authRoute.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { responseClient } from "./src/middleware/responseClient.js";
app.use("/api/v1/auth", authRoute);

app.use(errorHandler);
app.get("/", (req, res) => {
  const message = "Hello from server!";
  responseClient({ req, res, message });
});

dbConnect()
  .then(() => {
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`Your server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
