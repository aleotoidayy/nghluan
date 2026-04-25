var aleoo = JSON.parse($response.body);
aleoo.subscriber.entitlements = {
  "Pro": {
    "expires_date": "2099-01-01T09:09:09Z",
    "product_identifier": "ivy_1999_1y_1w0",
    "purchase_date": "2023-02-23T02:33:33Z"
  }
};
aleoo.subscriber.original_purchase_date = "2025-02-23T03:33:33Z";
aleoo.subscriber.subscriptions = {
  "ivy_1999_1y_1w0": {
    "expires_date": "2099-01-01T09:09:09Z",
    "original_purchase_date": "2025-02-23T02:33:33Z",
    "purchase_date": "2025-02-23T02:33:33Z",
    "ownership_type" : "PURCHASED",
    "store" : "app_store"
  }
};
$done({ body: JSON.stringify(aleoo) });
