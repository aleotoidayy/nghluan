// Author: aleotoidayy
// Date: 2025-06-01
// Purpose: AdGuard Premium

var body = $response.body;
var obj = JSON.parse(body);

obj = {
  "products": [
    {
      "product_id": "com.adguard.lifetimePurchase",
      "premium_status": "ACTIVE"
    }
  ]
};

body = JSON.stringify(obj);
$done({ body: body });
