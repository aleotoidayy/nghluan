// Author: aleotoidayy
// Date: 2025-06-01
// Purpose: NiceGram Premium

var Q = JSON.parse($response.body);
Q.data.user.lifetime_subscription = true;
Q.data.user.store_subscription = true;
Q.data.user.subscription = true;
$done({body : JSON.stringify(Q)});
