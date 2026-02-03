export function report(results: any[]) {
    console.table(results);

    const failed = results.filter(r => !r.passed);
    if (failed.length > 0) {
        process.exit(1);
    }
}
