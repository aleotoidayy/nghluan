// Author's Telegram: t.me/aleotoidayy

let body = $response.body;
let json = JSON.parse(body);

json.data = {
  active_sub_type: 2,
  account_type: 1,
  sub_type_name: "Renewal",
  active_sub_order_id: "7069961436604422668",
  trial_period_invalid_time: "4102444800000", 
  current_order_invalid_time: "4102444800000", 
  active_order_id: "7069961436340181123",
  limit_type: 0,
  use_vip: true,
  have_valid_contract: true,
  derive_type_name: "Standard Member",
  derive_type: 1,
  in_trial_period: false,
  is_vip: true,
  membership: {
    id: "1230010086",
    display_name: "Win Member",
    level: 1,
    level_name: "Level 5"
  },
  active_promotion_status_list: [2],
  sub_type: 2,
  account_id: "32495529599000",
  invalid_time: "4070908800000", 
  valid_time: "0",   
  active_product_id: "jsjia",
  active_promotion_status: 2,
  show_renew_flag: true
};

$done({ body: JSON.stringify(json) });
