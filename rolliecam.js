let body = $response.body;

body = body
    .replace(/"isPremium":true/g, '"isPremium":false')
    .replace(/"required_pro":true/g, '"required_pro":false')
    .replace(/"is_featured":false/g, '"is_featured":true')
    .replace(/"requires_pro":(true|false)/g, '"requires_pro":false');

$done({ body });
