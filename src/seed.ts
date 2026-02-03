import mongoose from "mongoose";
import { Task } from "./models/task.model.js";
import { connectDB } from "./config/db.js";

const seedTasks = [
    {
        title: "Complete the project report",
        description: "Gather all the data and write the final report.",
        status: "doing",
    },
    {
        title: "Prepare for the presentation",
        description: "Create the slides and practice the presentation.",
        status: "todo",
    },
    {
        title: "Fix the bugs in the login page",
        description: "The login page is not working properly.",
        status: "todo",
    },
    {
        title: "Deploy the new version",
        description: "Deploy the new version to the production server.",
        status: "done",
    },
    {
        title: "Design the new landing page",
        description: "Create a mockup and wireframe for the new landing page.",
        status: "todo",
    },
    {
        title: "Implement JWT authentication",
        description: "Add JWT-based authentication to the API.",
        status: "doing",
    },
    {
        title: "Write unit tests for the task controller",
        description: "Ensure all endpoints in the task controller are covered by unit tests.",
        status: "done",
    },
];

const seedDB = async () => {
    await connectDB();
    await Task.deleteMany({});
    await Task.insertMany(seedTasks);
};

seedDB().then(() => {
    console.log("Database seeded successfully!");
    mongoose.connection.close();
});
