// Author: aleotoidayy
// Date: 2025-06-01
// Purpose: Aloha Vpn Premium

let obj = JSON.parse($response.body);
obj.profile.is_premium = true,
obj.profile.end_of_premium = 4080979200,
obj.profile._end_of_premium = "2099-01-01 10:19:39"
$done({body: JSON.stringify(obj)});
