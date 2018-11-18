import harasser from "./harrasser/harasser";
import report from "./report/report";
import View from "./view/View";

export default {
    harrasser: harasser,
    report: report
}

const vuew: View = {
    base: new URL('https://dev.fuckingserver/api/v1'),
    bodyless: [
        
    ]
};

(async () => {
    const res = await harasser(vuew)
    const rep = await report(res)
    process.stdout.write(rep)
})()
