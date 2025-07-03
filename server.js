import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "Hello from server!",
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Your server is running at http://localhost:${PORT}`);
});
