let body = $response.body; 

var inapp = {
  product_id: "me.imgbase.intolive.proSubYearly",  
  quantity: "1",
  expires_date: "2099-01-01T23:59:59Z",
  expires_date_pst: "2099-01-01 23:59:59 America/Los_Angeles",
  expires_date_ms: "4070889599000", 
  is_in_intro_offer_period: "false",
  transaction_id: "1000000000000000",
  is_trial_period: "false",
  original_transaction_id: "1000000000000000",
  purchase_date_ms: "1735775999000",
  purchase_date: "2025-01-01T23:59:59Z",
  purchase_date_pst: "2025-01-01 23:59:59 America/Los_Angeles",
  original_purchase_date: "2025-01-01T23:59:59Z",
  original_purchase_date_pst: "2025-01-01 23:59:59 America/Los_Angeles",
  original_purchase_date_ms: "1735775999000",
  in_app_ownership_type: "PURCHASED",
  web_order_line_item_id: "1000000000000000"
};

var renew = {
  product_id: "me.imgbase.intolive.proSubYearly",
  original_transaction_id: "1000000000000000",
  auto_renew_product_id: "me.imgbase.intolive.proSubYearly",
  auto_renew_status: "1"
};

var fake_receipt = {
  status: 0,
  environment: "Production",
  receipt: {
    in_app: [inapp]
  },
  latest_receipt_info: [inapp],
  latest_receipt: "",
  pending_renewal_info: [renew]
};

$done({ body: JSON.stringify(fake_receipt) });
