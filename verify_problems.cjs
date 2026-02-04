const { cProblems } = require('./src/data/cProblems.js');

console.log('Total problems:', cProblems.length);

cProblems.forEach((p, i) => {
    if (!p) {
        console.error(`Problem at index ${i} is undefined/null`);
    } else {
        console.log(`Index ${i}: ${p.id} - ${p.title}`);
        if (!p.description) console.error(`Index ${i} missing description`);
        if (!p.examples) console.error(`Index ${i} missing examples`);
        if (!p.constraints) console.error(`Index ${i} missing constraints`);
    }
});
