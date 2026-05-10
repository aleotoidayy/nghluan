let aleoo = JSON.parse($request.body);

if (aleoo.analytics_user_properties) {
    aleoo.analytics_user_properties.is_premium = "true";
}

$done({body: JSON.stringify(aleoo)});
