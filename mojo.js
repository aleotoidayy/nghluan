var body = $response.body;
var aleoo = JSON.parse(body);

aleoo.subscriber.entitlements = {
    "pro_ai": {
        "expires_date": "2099-01-01T00:00:00Z",
        "product_identifier": "video.mojo.pro.ai.yearly",
        "purchase_date": "2025-01-01T00:00:00Z"
    }
};

aleoo.subscriber.subscriptions = {
    "video.mojo.pro.ai.yearly": {
        "billing_issues_detected_at": null,
        "expires_date": "2099-01-01T00:00:00Z",
        "is_sandbox": false,
        "original_purchase_date": "2025-01-01T00:00:00Z",
        "period_type": "normal",
        "purchase_date": "2025-01-01T00:00:00Z",
        "store": "app_store",
        "unsubscribe_detected_at": null
    }
};

body = JSON.stringify(aleoo);
$done({ body });
