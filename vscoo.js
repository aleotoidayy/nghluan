let aleoo = JSON.parse($response.body);

aleoo.customerInfo.entitlements = [{
    identifier: "pro",
    type: "SERVICE_LEVEL",
    isActive: true,
    isLifetime: true,
    willRenew: true,
    productIds: ["vscopro_global_5999_annual_7D_free"]
}];

$done({body: JSON.stringify(aleoo)});
