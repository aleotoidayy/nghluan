var aleoo = JSON.parse($response.body);

aleoo.subscriber.entitlements = {
      "premium":{
              "product_identifier":"spark_5999_1y_1w0",
              "purchase_date":"2025-01-01T05:05:01Z"
      }
  },
  
aleoo.subscriber.subscriptions ={
      "spark_5999_1y_1w0":{
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
