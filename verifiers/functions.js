const fetch = require('node-fetch');

async function verify(store, receipt, accessToken, sku, game_package) {
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

    console.log('Purchase Log for CafeBazaar, for game: ' + game_package + ' and sku: ' + sku + ' and receipt: ' + receipt + ' and access token: ' + accessToken + ' and response: ' + response.status, ' and body', await response.text());

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

    console.log('Purchase Log for Myket, for game: ' + game_package + ' and sku: ' + sku + ' and receipt: ' + receipt + ' and access token: ' + accessToken + ' and response: ' + response.status, ' and body', await response.text());
    
    if (response.status === 200) {
        return 0;
    } else {
        try {
            const responseText = await response.text();
            const responseData = JSON.parse(responseText);
            
            if (responseData.messageCode === 'SkuAlreadyConsumed') {
                return 1;
            } else {
                return 2;
            }
        } catch (error) {
            return 2;
        }
    }
}

async function verifyZarinPal(receipt, accessToken, game_package, sku) {
    return 0;
}

async function verifyGooglePlay(receipt, accessToken, game_package, sku) {
    const baseUrl = 'https://androidpublisher.googleapis.com/androidpublisher/v3';
    const getUrl = `${baseUrl}/applications/${game_package}/purchases/products/${sku}/tokens/${receipt}`;
    const consumeUrl = `${baseUrl}/applications/${game_package}/purchases/products/${sku}/tokens/${receipt}:consume`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
    };

    try {
        const verifyResponse = await fetch(getUrl, {method: 'GET', headers});
        if (verifyResponse.status === 401 || verifyResponse.status === 403 || verifyResponse.status === 404 || !verifyResponse.ok) {
            return 2;
        }

        const purchaseData = await verifyResponse.json();

        if (purchaseData.purchaseState !== 0) {
            return 2;
        }

        if (purchaseData.consumptionState === 1) {
            return 1;
        }

        const consumeResponse = await fetch(consumeUrl, {method: 'POST', headers});
        if (consumeResponse.status === 401 || consumeResponse.status === 403 || !consumeResponse.ok) {
            return 2;
        }

        return 0;
    } catch (error) {
        console.error('Error verifying Google Play purchase:', error);
        return 2;
    }
}

async function verifyAppleStore(receipt, accessToken, game_package, sku) {
    return 0;
}

module.exports = {
    verify,
};