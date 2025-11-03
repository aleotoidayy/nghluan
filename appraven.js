var aleoo = JSON.parse(
  $response.body
    .replace(/"premium":false/g, '"premium":true')
    .replace(/"adsEnabled":true/g, '"adsEnabled":false')
    .replace(/"loadAdsOnStartup":true/g, '"loadAdsOnStartup":false')
    .replace(/"adTimerEnabled":true/g, '"adTimerEnabled":false')
    .replace(/You don't have enough permissions./g, "Tôi cũng muốn xem nó, nhưng tôi không thể làm gì được~")
);
$done({ body: JSON.stringify(aleoo) });
