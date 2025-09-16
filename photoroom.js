var ojbk = JSON.parse($response.body);
ojbk.subscriber.entitlements = {
    'business': {
        'expires_date': '2333-02-23T02:33:33Z',
        'product_identifier': 'com.background.business.yearly',
        'purchase_date': '2023-02-23T02:33:33Z'
    }
};
ojbk.subscriber.original_purchase_date = '2023-02-23T03:33:33Z';
ojbk.subscriber.subscriptions = {
    'com.background.business.yearly': {
        'expires_date': '2099-01-01T06:06:06Z',
        'original_purchase_date': '2023-02-23T02:33:33Z',
        'purchase_date': '2099-01-01T06:06:06Z',
        'ownership_type': 'PURCHASED',
        'store': 'app_store'
    }
};
$done({
    'body': JSON.stringify(ojbk)
});
