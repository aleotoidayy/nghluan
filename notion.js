var aleoo = JSON.parse($response.body);
aleoo.subscriber.entitlements = {
  "notion.id.plus_with_ai": {
    "expires_date": "2099-01-01T09:09:09Z",
    "product_identifier": "notion.id.plus_ai_yearly",
    "purchase_date": "2023-02-23T02:33:33Z"
  }
};
aleoo.subscriber.original_purchase_date = "2025-02-23T03:33:33Z";
aleoo.subscriber.subscriptions = {
  "notion.id.plus_ai_yearly": {
    "expires_date": "2099-01-01T09:09:09Z",
    "original_purchase_date": "2025-02-23T02:33:33Z",
    "purchase_date": "2025-02-23T02:33:33Z",
    "ownership_type" : "PURCHASED",
    "store" : "app_store"
  }
};
$done({ body: JSON.stringify(aleoo) });
