var aleoo = JSON.parse($response.body); 
aleoo.subscriber.entitlements = {  
  "pro": {
    "product_identifier": "vscopro_global_5999_annual_7D_free",
    "purchase_date": "2026-01-01T02:33:33Z"
  }
};
aleoo.subscriber.original_purchase_date = "2026-01-01T02:33:33Z"; 
aleoo.subscriber.subscriptions = {          
  "vscopro_global_5999_annual_7D_free": {
    "original_purchase_date": "2026-01-01T02:33:33Z",
    "purchase_date": "2026-01-01T02:33:33Z",
    "ownership_type" : "PURCHASED",
    "store" : "app_store"
  }
};
$done({ body: JSON.stringify(aleoo) });
