import axios from "axios";
import type { ApiTestCase } from "../../src/types/testCase";

const BASE_URL = "http://localhost:3000";

export async function executeTest(test: ApiTestCase) {
    const url = test.pathParams
        ? Object.entries(test.pathParams).reduce(
            (u, [k, v]) => u.replace(`{${k}}`, v),
            `${BASE_URL}${test.path}`
        )
        : `${BASE_URL}${test.path}`;

    const start = Date.now();

    const res = await axios.request({
        method: test.method,
        url,
        data: test.body,
        validateStatus: () => true
    });

    return {
        testId: test.id,
        passed: res.status === test.expectedStatus,
        expected: test.expectedStatus,
        actual: res.status,
        latencyMs: Date.now() - start
    };
}
