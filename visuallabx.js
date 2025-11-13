var aleoo = JSON.parse($response.body); 
aleoo.subscriber.entitlements = {  
  "pro": {
    "product_identifier": "vlx_lifetime_special",
    "purchase_date": "2025-01-01T02:33:33Z"
  }
};
aleoo.subscriber.original_purchase_date = "2025-01-01T02:33:33Z"; 
aleoo.subscriber.subscriptions = {          
  "vlx_lifetime_special": {
    "original_purchase_date": "2025-01-01T02:33:33Z",
    "purchase_date": "2025-01-01T02:33:33Z",
    "ownership_type" : "PURCHASED",
    "store" : "app_store"
  }
};
$done({ body: JSON.stringify(aleoo) });
