function verifyPurchase(store, receipt, accessToken) {
  if (store.name === 'CafeBazaar') {
    return verifyCafeBazaar(receipt, accessToken);
  }
  if (store.name === 'Myket') {
    return verifyCafeBazaar(receipt, accessToken);
  }
  if (store.name === 'ZarinPal') {
    return verifyZarinPal(receipt, accessToken);
  }
  if (store.name === 'GooglePlay') {
    return verifyGooglePlay(receipt, accessToken);
  }
  if (store.name === 'AppleStore') {
    return verifyAppleStore(receipt, accessToken);
  }
}

function verifyCafeBazaar(receipt, accessToken) {
  return true;
}

function verifyMyket(receipt, accessToken) {
  return true;
}

function verifyZarinPal(receipt, accessToken) {
  return true;
}

function verifyGooglePlay(receipt, accessToken) {
  return true;
}

function verifyAppleStore(receipt, accessToken) {
  return true;
}

module.exports = {
  verifyPurchase,
};