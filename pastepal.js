var aleoo = JSON.parse($response.body);

aleoo.subscriber.entitlements = {
      "pro":{
              "product_identifier":"com.onmyway133.PastePal.pro",
              "purchase_date":"2025-01-01T05:05:01Z"
      }
  },
  
aleoo.subscriber.subscriptions ={
      "com.onmyway133.PastePal.pro":{
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
