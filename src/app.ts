import express from "express";
import taskRoutes from "./routes/task.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { requestLogger } from "./middleware/logger.middleware.js";

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use("/tasks", taskRoutes);
app.use(errorHandler);

export default app;