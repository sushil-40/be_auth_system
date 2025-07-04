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
app.use("/api/v1/auth", authRoute);

app.use(errorHandler);
app.get("/", (req, res) => {
  res.json({
    message: "Hello from server!",
  });
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
