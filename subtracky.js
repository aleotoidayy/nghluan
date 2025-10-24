var aleoo = JSON.parse($response.body); 
aleoo.subscriber.entitlements = {  
  "premium": {
    "expires_date": "2099-01-01T09:09:09Z",
    "product_identifier": "premium_subtracky_lifetime",
    "purchase_date": "2025-01-01T02:33:33Z"
  }
};
aleoo.subscriber.original_purchase_date = "2025-01-01T02:33:33Z"; 
aleoo.subscriber.subscriptions = {          
  "premium_subtracky_lifetime": {
    "expires_date": "2099-01-01T09:09:09Z",
    "original_purchase_date": "2025-01-01T02:33:33Z",
    "purchase_date": "2025-01-01T02:33:33Z",
    "ownership_type" : "PURCHASED",
    "store" : "app_store"
  }
};
$done({ body: JSON.stringify(aleoo) });
