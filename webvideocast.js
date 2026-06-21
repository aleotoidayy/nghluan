var aleoo = JSON.parse($response.body); 
aleoo.subscriber.entitlements = {  
  "Premium": {
    "product_identifier": "premium.regular.price",
    "purchase_date": "2026-01-01T02:33:33Z"
  }
};
aleoo.subscriber.original_purchase_date = "2026-01-01T02:33:33Z"; 
aleoo.subscriber.subscriptions = {          
  "premium.regular.price": {
    "original_purchase_date": "2026-01-01T02:33:33Z",
    "purchase_date": "2026-01-01T02:33:33Z",
    "ownership_type" : "PURCHASED",
    "store" : "app_store"
  }
};
$done({ body: JSON.stringify(aleoo) });
