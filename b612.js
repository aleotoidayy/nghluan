var body = $response.body;
var aleoo = JSON.parse(body);

aleoo = {
  "result": {
    "activated": true,
    "products": [{
      "productId": "com.campmobile.snowcamera.vip.oneyear",
      "startDate": 1735689600000,
      "expireDate": 4070908800,
      "managed": false,
      "status": "ACTIVE"
    }]
  }
};

body = JSON.stringify(aleoo);
$done({ body });
