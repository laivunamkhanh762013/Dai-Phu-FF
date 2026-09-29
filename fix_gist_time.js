const { getGist, updateGist } = require('./api/db.js');

async function fixTime() {
    const data = await getGist();
    let updated = false;
    for (let o of data.orders) {
        if (o.id === 'DPVN4136' || o.id === 'DPVN7206') {
            console.log(`Order ${o.id} time is ${o.time}`);
            // Let's manually fix them
            if (o.id === 'DPVN4136') o.time = '00:42:38 30/09/2026';
            if (o.id === 'DPVN7206') o.time = '23:26:50 29/09/2026';
            updated = true;
        }
    }
    if (updated) {
        await updateGist({ orders: data.orders });
        console.log('Fixed times in Gist DB.');
    } else {
        console.log('Orders not found.');
    }
}
fixTime();
