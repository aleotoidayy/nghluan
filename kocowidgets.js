var aleoo = JSON.parse($response.body);

aleoo.subscriber.entitlements = {
      "Subscription":{
              "product_identifier":"com.niko.PocketWidgetsApp.lifetimePlus",
              "purchase_date":"2025-01-01T05:05:01Z"
      }
  },
  
aleoo.subscriber.subscriptions ={
      "com.niko.PocketWidgetsApp.lifetimePlus":{
              "billing_issues_detected_at":null,
              "is_sandbox":false,
              "original_purchase_date":"2025-01-01T05:05:01Z",
              "period_type":"normal",
              "purchase_date":"2025-01-01T05:05:01Z",
              "store":"app_store",
              "unsubscribe_detected_at":null
      }
  }

$done({body: JSON.stringify(aleoo)});
