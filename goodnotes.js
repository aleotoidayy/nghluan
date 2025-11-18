const aleo = {};
const aleoo = JSON.parse(typeof $response != "undefined" && $response.body || "{}");

const aleooo = "apple_access";
const aleooooo = "crossplatform_access";
const product_id = "com.goodnotes.gn6_one_time_unlock_3999";

if (typeof $response == "undefined") {

    delete $request.headers["x-revenuecat-etag"];
    delete $request.headers["X-RevenueCat-ETag"];
    aleo.headers = $request.headers;

} else if (aleoo && aleoo.subscriber) {
    if (!aleoo.subscriber.subscriptions) aleoo.subscriber.subscriptions = {};
    if (!aleoo.subscriber.entitlements) aleoo.subscriber.entitlements = {};

    const data = {
        "purchase_date": "2025-01-01T09:09:09Z"
    };

    aleoo.subscriber.subscriptions[product_id] = {
        "original_purchase_date": "2025-01-01T09:09:09Z",
        "purchase_date": "2025-01-01T09:09:09Z",
        "store": "app_store",
        "ownership_type": "PURCHASED"
    };

    aleoo.subscriber.entitlements[aleooo] = JSON.parse(JSON.stringify(data));
    aleoo.subscriber.entitlements[aleooooo] = JSON.parse(JSON.stringify(data));

    aleoo.subscriber.entitlements[aleooo].product_identifier = product_id;
    aleoo.subscriber.entitlements[aleooooo].product_identifier = product_id;

    aleo.body = JSON.stringify(aleoo);
}

$done(aleo);
