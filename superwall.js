let body = $response.body;
body = body.replace(/"isActive":false/g, '"isActive":true');
body = body.replace(/"willRenew":false/g, '"willRenew":true');
body = body.replace(/"isLifetime":false/g, '"isLifetime":true');
$done({body});
