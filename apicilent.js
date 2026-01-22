var aleoo = JSON.parse($response.body);

aleoo.subscriber.entitlements = {
      "Premium":{
              "product_identifier":"p_yearly",
              "purchase_date":"2025-01-01T05:05:01Z"
      }
  },
  
aleoo.subscriber.subscriptions ={
      "p_yearly":{
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
