var aleoo = JSON.parse($response.body);
aleoo.subscriber.entitlements = {
  "pro": {
    "expires_date": "2099-01-01T09:09:09Z",
    "product_identifier": "cc.seukku.app.pro.weekly",
    "purchase_date": "2026-01-01T02:33:33Z"
  }
};
aleoo.subscriber.original_purchase_date = "2026-01-01T03:33:33Z";
aleoo.subscriber.subscriptions = {
  "cc.seukku.app.pro.weekly": {
    "expires_date": "2099-01-01T09:09:09Z",
    "original_purchase_date": "2026-01-01T02:33:33Z",
    "purchase_date": "2026-01-01T02:33:33Z",
    "ownership_type" : "PURCHASED",
    "store" : "app_store"
  }
};
$done({ body: JSON.stringify(aleoo) });
