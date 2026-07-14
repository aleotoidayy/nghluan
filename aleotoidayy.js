let body = $response.body;

body = body
    .replace(/"premium_type":\d+/g, '"premium_type":2')
    .replace(/"id":"[^"]*"/g, '"id":"1526458411074584689"')
    .replace(/"sku_id":"[^"]*"/g, '"sku_id":"521847234246082599"')
    .replace(/"starts_at":"[^"]*"/g, '"starts_at":"2026-01-01T00:00:00.000000+00:00"')
    .replace(/"ends_at":"[^"]*"/g, '"ends_at":"2099-01-01T00:00:00.000000+00:00"')
    .replace(/"fulfilled_at":"[^"]*"/g, '"fulfilled_at":"2026-01-01T00:00:00.000000+00:00"')
    .replace(/"fulfillment_status":\d+/g, '"fulfillment_status":5')

$done({body});
