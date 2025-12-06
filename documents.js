var aleoo = JSON.parse($response.body);
aleoo.subscriber.entitlements = {
    'core': {
        'product_identifier': 'com.readdle.ReaddleDocsIPad.subscription.year50_upd_user',
        'purchase_date': '2025-01-01T02:33:33Z'
    }
};
aleoo.subscriber.original_purchase_date = '2025-01-01T02:33:33Z';
aleoo.subscriber.subscriptions = {
    'com.readdle.ReaddleDocsIPad.subscription.year50_upd_user': {
        'original_purchase_date': '2025-01-01T02:33:33Z',
        'purchase_date': '2025-01-01T02:33:33Z',
        'ownership_type': 'PURCHASED',
        'store': 'app_store'
    }
};
$done({
    'body': JSON.stringify(aleoo)
});
