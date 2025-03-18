async function verifyPurchase(store, receipt, accessToken, game_package, sku) {
  if (store.name === 'CafeBazaar') {
    return verifyCafeBazaar(receipt, accessToken, game_package, sku);
  }
  if (store.name === 'Myket') {
    return verifyMyket(receipt, accessToken, game_package, sku);
  }
  if (store.name === 'ZarinPal') {
    return verifyZarinPal(receipt, accessToken, game_package, sku);
  }
  if (store.name === 'GooglePlay') {
    return verifyGooglePlay(receipt, accessToken, game_package, sku);
  }
  if (store.name === 'AppStore') {
    return verifyAppleStore(receipt, accessToken, game_package, sku);
  }
}

async function verifyCafeBazaar(receipt, accessToken, game_package, sku) {
  let url = `https://pardakht.cafebazaar.ir/devapi/v2/api/consume/${game_package}/purchases/`;
  let headers = {
    'CAFEBAZAAR-PIHSHKHAN-API-SECRET': accessToken,
  };
  let body = {
    token: receipt,
  };

  let response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });

  if (response.status !== 200) {
    console.error('CafeBazaar Verification Failed', response.status);
  }

  return response.status === 200;
}

async function verifyMyket(receipt, accessToken, game_package, sku) {
  let url = `https://developer.myket.ir/api/partners/applications/${game_package}/purchases/products/${sku}/tokens/${receipt}/consume`;
  let headers = {
    'X-Access-Token': accessToken,
  };

  let response = await fetch(url, {
    method: 'PUT',
    headers: headers,
  });

  if (response.status !== 200) {
    console.error('CafeBazaar Verification Failed', response.status);
  }

  return response.status === 200;
}

async function verifyZarinPal(receipt, accessToken, game_package, sku) {
  return true;
}

async function verifyGooglePlay(receipt, accessToken, game_package, sku) {
  return true;
}

async function verifyAppleStore(receipt, accessToken, game_package, sku) {
  return true;
}

module.exports = {
  verifyPurchase,
};