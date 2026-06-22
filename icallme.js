let body = $response.body;

body = body
    .replace(/"is_premium":(true|false)/g, '"is_premium":true')
    .replace(/"premium_member":null/g, '"premium_member":true')
    .replace(/"isAdmin":(true|false)/g, '"isAdmin":true')
    .replace(/"status":\d+/g, '"status":1')
    .replace(/"first_buy":(true|false)/g, '"first_buy":false');

$done({body});
