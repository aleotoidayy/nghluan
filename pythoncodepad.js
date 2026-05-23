var aleoo = JSON.parse($response.body);
aleoo.subscriber.entitlements = {
  "developer": {
    "expires_date": "2099-01-01T09:09:09Z",
    "product_identifier": "py_code_pad_developer_standard_yearly",
    "purchase_date": "2026-01-01T02:33:33Z"
  }
};
aleoo.subscriber.original_purchase_date = "2026-01-01T03:33:33Z";
aleoo.subscriber.subscriptions = {
  "py_code_pad_developer_standard_yearly": {
    "expires_date": "2099-01-01T09:09:09Z",
    "original_purchase_date": "2026-01-01T02:33:33Z",
    "purchase_date": "2026-01-01T02:33:33Z",
    "ownership_type" : "PURCHASED",
    "store" : "app_store"
  }
};
$done({ body: JSON.stringify(aleoo) });
