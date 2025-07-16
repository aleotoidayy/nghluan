let response = {
  entitlements: [
    {
      expires_date_ms: 4070908800000,
      purchase_date_ms: 1735689600000,
      product_identifier: 'SpeedTest_RemoveAd_1_Year_20181015',
      is_in_trial_period: false,
      is_in_intro_offer_period: false,
      environment: 'Production',
      redeem: {},
      auto_renew: true,
      entitlement_id: 'premium'
    }
  ],
  is_valid: true
};

$done({ body: JSON.stringify(response) });
