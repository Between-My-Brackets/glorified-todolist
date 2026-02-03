import {taskApiTests} from "../generated/task.api.tests";
import { executeTest } from "./executor.js";
import { report } from "./reporter.js";

(async () => {
    const results = [];

    for (const test of taskApiTests) {
        results.push(await executeTest(test));
    }

    report(results);
})();
