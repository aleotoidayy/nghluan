var aleoo = JSON.parse($response.body);
aleoo.subscriber.entitlements = {
  "EasyComix Pro": {
    "expires_date": "2099-01-01T09:09:09Z",
    "product_identifier": "app.easycomix.annual",
    "purchase_date": "2026-01-01T02:33:33Z"
  }
};
aleoo.subscriber.original_purchase_date = "2026-01-01T03:33:33Z";
aleoo.subscriber.subscriptions = {
  "app.easycomix.annual": {
    "expires_date": "2099-01-01T09:09:09Z",
    "original_purchase_date": "2026-01-01T02:33:33Z",
    "purchase_date": "2026-01-01T02:33:33Z",
    "ownership_type" : "PURCHASED",
    "store" : "app_store"
  }
};
$done({ body: JSON.stringify(aleoo) });
