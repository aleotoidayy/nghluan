let body = $response.body;

body = body
    .replace(/"time_left":"[^"]*"/g, '"time_left":"Vô hạn"')
    .replace(/"time_left_sec":\d+/g, '"time_left_sec":999999999')
    .replace(/"free_time_sec":\d+/g, '"free_time_sec":999999999')
    .replace(/"plan_time_sec":\d+/g, '"plan_time_sec":999999999')
    .replace(/"permanent_time_sec":\d+/g, '"permanent_time_sec":999999999')
    .replace(/"permanent_free_time_sec":\d+/g, '"permanent_free_time_sec":999999999')
    .replace(/"standard_plan":\{"time":\d+\}/g, '"standard_plan":{"time":999999999}')
    .replace(/"basic_plan":\{"time":\d+\}/g, '"basic_plan":{"time":999999999}')
    .replace(/"diamond":\{"time":\d+\}/g, '"diamond":{"time":999999999}')
    .replace(/"elite":\{"time":\d+\}/g, '"elite":{"time":999999999}')
    .replace(/"supreme":\{"time":\d+\}/g, '"supreme":{"time":999999999}')
    .replace(/"subscription_product_id":"[^"]*"/g, '"subscription_product_id":"subscription_vip3_12_months"')
    .replace(/"subscription_state":"[^"]*"/g, '"subscription_state":"ACTIVE"')
    .replace(/"subscription_channel":"[^"]*"/g, '"subscription_channel":"google_play"')
    .replace(/"is_subscription":(true|false)/g, '"is_subscription":true')
    .replace(/"is_expired":(true|false)/g, '"is_expired":false')
    .replace(/"is_paid":(true|false)/g, '"is_paid":true')
    .replace(/"is_unlimit_locale":(true|false)/g, '"is_unlimit_locale":true')
    .replace(/"is_gaming":(true|false)/g, '"is_gaming":true')
    .replace(/"use_proxy":(true|false)/g, '"use_proxy":false')
    .replace(/"use_time_type":\d+/g, '"use_time_type":3')
    .replace(/"level":\d+/g, '"level":3');

$done({body});
