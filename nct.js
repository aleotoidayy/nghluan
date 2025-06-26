var obj = JSON.parse($response.body);
let url = $request.url;
var cons = "users/info";
if(url.indexOf(cons) != -1)
{
obj.data.VIPExpire= "1/01/2099 00:00:00";
obj.data.isVIP= true;
}
$done({body: JSON.stringify(obj)});
