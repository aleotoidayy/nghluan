let aleoo = JSON.parse($response.body);
aleoo.products = [{
    "product_id": "com.adguard.lifetimePurchase",
    "premium_status": "ACTIVE"
}];
$done({body: JSON.stringify(aleoo)});
