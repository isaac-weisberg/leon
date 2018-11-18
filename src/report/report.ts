import { HarrassmentResults } from "../harrasser/harasser";

export async function report(results: HarrassmentResults) {
    return JSON.stringify(
        {
            base: results.base,
            bodyless: results.bodyless.map(results => {
                const errs = results.errors.length > 0 ? { errors: results.errors.map(error => error.unity()) } : {}
                return {
                    route: results.route.unity(),
                    errorCount: results.errors.length,
                    ...errs
                }
            })
        },
        null, 4)
}