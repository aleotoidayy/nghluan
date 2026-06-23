/*
 * Name:    PolyGit
 * Author:  @aleotoidayy
 * Update:  12/02/2026
 */

const TARGET_BUNDLE_ID  = "com.polygitapp.polygit";
const TARGET_PRODUCT_ID = "com.polygitapp.polygit.pro.yearly";

let aleoo = JSON.parse($response.body);

let bundleId = aleoo.receipt?.bundle_id || "";
let productId = aleoo.receipt?.in_app?.[0]?.product_id || "";

if (bundleId !== TARGET_BUNDLE_ID && productId !== TARGET_PRODUCT_ID) {
  $done({});
}

let fakeInapp = {
  product_id: TARGET_PRODUCT_ID,
  quantity: "1",
  expires_date: "2099-01-01 00:00:00 Etc/GMT",
  expires_date_pst: "2099-01-01 00:00:00 America/Los_Angeles",
  expires_date_ms: "4070908800000",
  is_in_intro_offer_period: "false",
  transaction_id: "7000000001234567",
  is_trial_period: "false",
  original_transaction_id: "7000000001234567",
  purchase_date_ms: "1701647999000", 
  purchase_date: "2026-01-01 00:00:00 Etc/GMT",
  purchase_date_pst: "2026-01-01 00:00:00 America/Los_Angeles",
  original_purchase_date: "2026-01-01 00:00:00 Etc/GMT",
  original_purchase_date_pst: "2026-01-01 00:00:00 America/Los_Angeles",
  original_purchase_date_ms: "1735689600000",
  in_app_ownership_type: "PURCHASED",
  web_order_line_item_id: "7000000001234567"
};

let renew = {
  product_id: TARGET_PRODUCT_ID,
  original_transaction_id: "7000000001234567",
  auto_renew_product_id: TARGET_PRODUCT_ID,
  auto_renew_status: "1"
};

aleoo.receipt.in_app = [fakeInapp];
aleoo.latest_receipt_info = [fakeInapp];
aleoo.pending_renewal_info = [renew];
console.log("✅ Polygit VIP unlocked");

$done({ body: JSON.stringify(aleoo) });
