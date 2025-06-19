// Author: aleotoidayy
// Date: 2025-06-01
// Purpose: Locket Gold

const version = 'V1.0.2';


function setHeaderValue(e,a,d){var r=a.toLowerCase();r in e?e[r]=d:e[a]=d}var modifiedHeaders=$request.headers;setHeaderValue(modifiedHeaders,"X-RevenueCat-ETag",""),$done({headers:modifiedHeaders});
