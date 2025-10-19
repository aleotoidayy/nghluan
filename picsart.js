let objc = {
  "status": "success",
  "response": [
    {
      "is_eligible_for_grant": true,
      
      "status": "SUBSCRIPTION_PURCHASED", 
      "is_trial": false,
      "subscription_id": "com.picsart.studio.subscription_pro_3_yearly",
      "plan_meta": {
        "permissions": [
          "premium_tools_standard",
          "premium_tools_ai",
        ],
        "auto_renew_product_id": "com.picsart.studio.subscription_pro_3_yearly",
        "level": 2000, 
        "storage_limit_in_mb": 102400, 
        "id": "com.picsart.studio.subscription_pro_3_yearly",
        "frequency": "yearly",
        "type": "renewable",
        "scope_id": "full",
        "product_id": "com.picsart.studio.subscription_pro_3_yearly",
        "tier_id": "pro" 
      },
      "limitation": {
        "max_count": 10,
        "limits_exceeded": false
      },
      "is_eligible_for_introductory": true,
      "reason": "ok",

      "purchase_date": 1735689600000, 
      "expire_date": 4070908800000,   
      "order_id": "2000001036585376", 
      "original_order_id": "2000000980730539"
    }
  ]
};

$done({
    response: {
        body: JSON.stringify(objc),
        status: 200
    }
});
