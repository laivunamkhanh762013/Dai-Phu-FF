const { getGist, updateGist } = require('./api/db.js');
const { CATALOG } = require('./api/_catalog.js');

async function fixNames() {
  const data = await getGist();
  let updated = false;
  for (let o of data.orders) {
    if (o.product === 'proxy-ios-novax') {
      o.product = 'NovaX (Android & iOS)';
      updated = true;
    }
  }
  if (updated) {
    await updateGist({ orders: data.orders });
    console.log('Fixed product names in DB.');
  } else {
    console.log('No products to fix in DB.');
  }
}
fixNames();
