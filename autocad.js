var aleoo = JSON.parse($response.body);
var aleoo_response = {
    "status": "MyDesignStorage",
    "is_legacy_subscriber": true,
    "features": [
        "svc0000020",
        "svc0000087",
        "svc0000089",
        "ADSK_GRANTED_USERS_AUTODESK_EDUCATION_BUNDLE",
        "svc0002664",
        "svc0003000"
    ],
    "is_trial": false,
    "is_authorized": true,
    "type": "MyDesignStorage",
    "recheck_sec": 1712250693,
    "is_edu_account": true,
    "is_mobile_store_subscriber": true,
    "subscriptions": [],
    "expiry_sec": 4070908800,
    "subscribed": true,
    "start_sec": 1735689600
};

aleoo = aleoo_response;

$done({
    body: JSON.stringify(aleoo)
});
