let aleoo = JSON.parse($response.body);
aleoo.subscription.is_lifetime = true;
aleoo.subscription.valid = true;
$done({body: JSON.stringify(aleoo)});
