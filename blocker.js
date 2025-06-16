var body = $response.body;
var objk = JSON.parse(body);

objk = {
    "request_date": "2022-06-25T07:36:55Z",
    "request_date_ms": 1656142614383,
    "subscriber": {
        "entitlements": {
            "premium": {
                "expires_date": "2099-12-31T01:01:01Z",
                "grace_period_expires_date": null,
                "product_identifier": "blocker.ios.subscription.yearly",
                "purchase_date": "2020-11-15T01:01:01Z"
            }
        },
        "first_seen": "2020-11-15T01:01:01Z",
        "last_seen": "2020-11-15T01:01:01Z",
        "management_url": "itms-apps://apps.apple.com/account/subscriptions",
        "non_subscriptions": {},
        "original_app_user_id": "9C57FE95-67YU-999B-09CB-GH89HJK89",
        "original_application_version": "900",
        "original_purchase_date": "2020-11-15T12:53:05Z",
        "other_purchases": {},
        "subscriptions": {
            "blocker.ios.subscription.yearly": {
                "billing_issues_detected_at": null,
                "expires_date": "2099-12-31T01:01:01Z",
                "grace_period_expires_date": null,
                "is_sandbox": false,
                "original_purchase_date": "2020-11-15T12:55:21Z",
                "period_type": "trial",
                "purchase_date": "2020-11-15T12:55:20Z",
                "store": "app_store",
                "unsubscribe_detected_at": null
            }
        }
    }
}


body = JSON.stringify(objk);

$done({
    body
});
