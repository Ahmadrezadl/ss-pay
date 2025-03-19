const fetch = require('node-fetch');

async function verify(store, receipt, accessToken, game_package, sku) {
  if (store.name === 'CafeBazaar') {
    return await verifyCafeBazaar(receipt, accessToken, game_package, sku);
  }
  if (store.name === 'Myket') {
    return await verifyMyket(receipt, accessToken, game_package, sku);
  }
  if (store.name === 'ZarinPal') {
    return await verifyZarinPal(receipt, accessToken, game_package, sku);
  }
  if (store.name === 'GooglePlay') {
    return await verifyGooglePlay(receipt, accessToken, game_package, sku);
  }
  if (store.name === 'AppStore') {
    return await verifyAppleStore(receipt, accessToken, game_package, sku);
  }
}

async function verifyCafeBazaar(receipt, accessToken, game_package, sku) {
  let url = `https://pardakht.cafebazaar.ir/devapi/v2/api/consume/${game_package}/purchases/`;
  let headers = {
    'Content-Type': 'application/json',
    'CAFEBAZAAR-PISHKHAN-API-SECRET': accessToken,
  };
  let body = {
    token: receipt,
  };

  let response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });

  console.log('Purchase Log for CafeBazaar, for game: ' + game_package + ' and sku: ' + sku + ' and receipt: ' + receipt + ' and access token: ' + accessToken + ' and response: ' + response.status, ' and body', response.body);

  return response.status === 200 ? 0 : response.status === 400 ? 1 : 2;
}

async function verifyMyket(receipt, accessToken, game_package, sku) {
  let url = `https://developer.myket.ir/api/partners/applications/${game_package}/purchases/products/${sku}/tokens/${receipt}/consume`;
  let headers = {
    'X-Access-Token': accessToken,
    'Content-Type': 'application/json',
  };

  let response = await fetch(url, {
    method: 'PUT',
    headers: headers,
  });

  console.log('Purchase Log for Myket, for game: ' + game_package + ' and sku: ' + sku + ' and receipt: ' + receipt + ' and access token: ' + accessToken + ' and response: ' + response.status, ' and body', response.body);
  return response.status === 200 ? 0 : response.status === 400 ? 1 : 2;
}

async function verifyZarinPal(receipt, accessToken, game_package, sku) {
  return 0;
}

async function verifyGooglePlay(receipt, accessToken, game_package, sku) {
  return 0;
}

async function verifyAppleStore(receipt, accessToken, game_package, sku) {
  return 0;
}

module.exports = {
  verify,
};