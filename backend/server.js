import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB

// Routes
app.use("/", (req, res) => {
  res.send("API is working");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

// What is Node.js and why is it used for backend development?
// Answer: Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets us run JavaScript on the
// server and is commonly used for fast, scalable backend applications.

// What is Express.js and why do we use it with Node.js?
// Answer: Express.js is a lightweight web framework for Node.js. It simplifies routing, middleware, request
// handling, and API development