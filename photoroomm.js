let body = $response.body;
body = body
  
    .replace(/"validation_status":"[^"]*"/g, '"validation_status":"VERIFYING"')
    .replace(/"error_message":"[^"]*"/g, '"error_message":null')
    .replace(/"is_eligible_for_assigning_revenuecat_subscription":(true|false)/g, '"is_eligible_for_assigning_revenuecat_subscription":true')
    .replace(/"badgeText":"[^"]*"/g, '"badgeText":"Ultra"');

$done({body});
