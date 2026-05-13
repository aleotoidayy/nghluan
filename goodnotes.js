var aleoo = JSON.parse($response.body);

aleoo.subscriber.entitlements = {
    "apple_access": {
        "expires_date": "2099-01-01T09:09:09Z",
        "product_identifier": "com.goodnotes.pro_7dt_1y_3599",
        "purchase_date": "2026-01-01T02:33:33Z"
    },
    "crossplatform_access": {
        "expires_date": "2099-01-01T09:09:09Z",
        "product_identifier": "com.goodnotes.pro_7dt_1y_3599",
        "purchase_date": "2026-01-01T02:33:33Z"
    },
    "pro_access": {
        "expires_date": "2099-01-01T09:09:09Z",
        "product_identifier": "com.goodnotes.pro_7dt_1y_3599",
        "purchase_date": "2026-01-01T02:33:33Z"
    },
    "gnc_access": {
        "expires_date": "2099-01-01T09:09:09Z",
        "product_identifier": "com.goodnotes.pro_7dt_1y_3599",
        "purchase_date": "2026-01-01T02:33:33Z"
    }
};

aleoo.subscriber.original_purchase_date = "2026-01-01T03:33:33Z";

aleoo.subscriber.subscriptions = {
    "com.goodnotes.pro_7dt_1y_3599": {
        "expires_date": "2099-01-01T09:09:09Z",
        "original_purchase_date": "2026-01-01T02:33:33Z",
        "purchase_date": "2026-01-01T02:33:33Z",
        "ownership_type": "PURCHASED",
        "store": "app_store"
    }
};

$done({ body: JSON.stringify(aleoo) });
