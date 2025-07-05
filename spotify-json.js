console.log(`spotify-json-2025.06.25`);
let url = $request.url;

if (url.includes('com:443')) {
    url = url.replace(/com:443/, 'com');
}
if (url.includes('platform=iphone')) {
    url = url.replace(/platform=iphone/, 'platform=ipad');
    
} else {
    console.log('无需处理');
}
$done({
    url
});
