// tests/generated/task.api.tests.ts
import type { ApiTestCase } from "../../src/types/testCase.js";

export const taskApiTests: ApiTestCase[] = [
    {
        id: "POST_TASKS_201",
        name: "Create task with valid payload",
        method: "POST",
        path: "/tasks",
        body: {
            title: "Test task",
            description: "Generated task description",
            status: "todo"
        },
        expectedStatus: 201,
        category: "functional"
    },
    {
        id: "POST_TASKS_400_INVALID_STATUS",
        name: "Create task with invalid status enum",
        method: "POST",
        path: "/tasks",
        body: {
            title: "Bad task",
            description: "Invalid enum",
            status: "invalid_status"
        },
        expectedStatus: 500,
        category: "negative"
    },
    {
        id: "GET_TASKS_200",
        name: "Fetch all tasks",
        method: "GET",
        path: "/tasks",
        expectedStatus: 200,
        category: "functional"
    },
    {
        id: "GET_TASK_STATS_200",
        name: "Fetch task statistics",
        method: "GET",
        path: "/tasks/stats",
        expectedStatus: 200,
        category: "functional"
    },
    {
        id: "GET_TASK_BY_ID_200",
        name: "Fetch task by valid id",
        method: "GET",
        path: "/tasks/{id}",
        pathParams: {
            id: "valid-task-id"
        },
        expectedStatus: 200,
        category: "functional"
    },
    {
        id: "GET_TASK_BY_ID_404",
        name: "Fetch task with non-existent id",
        method: "GET",
        path: "/tasks/{id}",
        pathParams: {
            id: "non-existent-id"
        },
        expectedStatus: 404,
        category: "negative"
    },
    {
        id: "PATCH_TASK_200",
        name: "Update task status",
        method: "PATCH",
        path: "/tasks/{id}",
        pathParams: {
            id: "valid-task-id"
        },
        body: {
            status: "doing"
        },
        expectedStatus: 200,
        category: "functional"
    },
    {
        id: "PATCH_TASK_500_INVALID_ENUM",
        name: "Update task with invalid enum",
        method: "PATCH",
        path: "/tasks/{id}",
        pathParams: {
            id: "valid-task-id"
        },
        body: {
            status: "broken"
        },
        expectedStatus: 500,
        category: "negative"
    },
    {
        id: "DELETE_TASK_200",
        name: "Delete task by id",
        method: "DELETE",
        path: "/tasks/{id}",
        pathParams: {
            id: "valid-task-id"
        },
        expectedStatus: 200,
        category: "functional"
    },
    {
        id: "DELETE_TASK_404",
        name: "Delete task with non-existent id",
        method: "DELETE",
        path: "/tasks/{id}",
        pathParams: {
            id: "non-existent-id"
        },
        expectedStatus: 404,
        category: "negative"
    }

];
