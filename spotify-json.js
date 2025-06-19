// Author: aleotoidayy
// Date: 2025-06-01
// Purpose: Spotify Premium

console.log(`spotify-json-2023.06.13`);
let url = $request.url;

if (url.includes('platform=iphone')) {
    url = url.replace(/platform=iphone/, 'platform=ipad');
    
} else {
    console.log('无需处理');
}
$done({
    url
});
