Const version = 'V1.0.3';


function removeHeader(headers, key) {
    const lowerKey = key.toLowerCase();
    if (headers[key]) {
        delete headers[key];
    }
    if (headers[lowerKey]) {
        delete headers[lowerKey];
    }
}
var modifiedHeaders = $request.headers;
removeHeader(modifiedHeaders, "If-None-Match");
removeHeader(modifiedHeaders, "X-RevenueCat-ETag");
removeHeader(modifiedHeaders, "X-Headers-Hash");
$done({headers: modifiedHeaders});
