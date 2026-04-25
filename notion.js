var aleoo = JSON.parse($response.body);
aleoo.subscriber.entitlements = {
    'notion.id.plus_with_ai': {
        'product_identifier': 'notion.id.plus_ai_yearly',
        'purchase_date': '2025-01-01T02:33:33Z'
    }
};
aleoo.subscriber.original_purchase_date = '2025-01-01T02:33:33Z';
aleoo.subscriber.subscriptions = {
    'notion.id.plus_ai_yearly': {
        'original_purchase_date': '2025-01-01T02:33:33Z',
        'purchase_date': '2025-01-01T02:33:33Z',
        'ownership_type': 'PURCHASED',
        'store': 'app_store'
    }
};
$done({
    'body': JSON.stringify(aleoo)
});