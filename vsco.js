var request = $request;

const options = {
  url: 'https://api.revenuecat.com/v1/product_entitlement_mapping',
  headers: request.headers
};

$httpClient.get(options, function (error, response, data) {
  const original = JSON.parse(data);
  console.log(data);

  let fakeData = {
    request_date_ms: 1704061261000,
    request_date: '2024-01-01T01:01:01Z',
    subscriber: {
      entitlements: {},
      first_seen: '2024-01-01T01:01:01Z',
      original_application_version: '9692',
      last_seen: '2024-01-01T01:01:01Z',
      other_purchases: {},
      management_url: null,
      subscriptions: {},
      original_purchase_date: '2024-01-01T01:01:01Z',
      original_app_user_id: '70B24288-83C4-4035-B001-573285B21AE2',
      non_subscriptions: {}
    }
  };

  const mappings = original.product_entitlement_mapping;

  for (const [entitlementName, productInfo] of Object.entries(mappings)) {
    const productId = productInfo.product_identifier;
    const entitlements = productInfo.entitlements;

    for (const entitlement of entitlements) {
      fakeData.subscriber.entitlements[entitlement] = {
        purchase_date: '2024-01-01T01:01:01Z',
        original_purchase_date: '2024-01-01T01:01:01Z',
        expires_date: '2099-01-01T01:01:01Z',
        product_identifier: productId
      };

      fakeData.subscriber.subscriptions[productId] = {
        expires_date: '2099-01-01T01:01:01Z',
        original_purchase_date: '2024-01-01T01:01:01Z',
        purchase_date: '2024-01-01T01:01:01Z'
      };
    }
  }

  console.log(fakeData);

  $done({ body: JSON.stringify(fakeData) });
});
