const { getGist, updateGist } = require('./api/db');

async function fixGist() {
    console.log("Fetching gist...");
    const data = await getGist();
    console.log("Found " + data.orders.length + " orders.");
    
    let changed = false;
    for (let o of data.orders) {
        if (o.plan && o.plan.includes('Gi') && o.plan.includes('(Test)')) {
            console.log("Found corrupted plan:", o.plan);
            o.plan = 'Key 1 Giờ (Test)';
            changed = true;
        }
        if (o.planName && o.planName.includes('Gi') && o.planName.includes('(Test)')) {
            o.planName = 'Key 1 Giờ (Test)';
            changed = true;
        }
    }
    
    if (changed) {
        console.log("Updating gist...");
        const success = await updateGist({ orders: data.orders });
        console.log("Update success:", success);
    } else {
        console.log("No corrupted data found.");
    }
}

fixGist().catch(console.error);
