// === locketgold.js ===
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua=$request.headers["User-Agent"]||$request.headers["user-agent"],obj=JSON.parse($response.body);obj.Attention="hihi";var locket02={is_sandbox:!1,ownership_type:"PURCHASED",billing_issues_detected_at:null,period_type:"normal",expires_date:"2099-12-18T01:04:17Z",grace_period_expires_date:null,unsubscribe_detected_at:null,original_purchase_date:"2009-08-17T01:04:18Z",purchase_date:"2009-08-17T01:04:17Z",store:"app_store"},locket01={grace_period_expires_date:null,purchase_date:"2009-08-17T01:04:17Z",product_identifier:"com.locket02.premium.yearly",expires_date:"2099-12-18T01:04:17Z"};const match=Object.keys(mapping).find(e=>ua.includes(e));if(match){let[e,s]=mapping[match];s?(locket01.product_identifier=s,obj.subscriber.subscriptions[s]=locket02):obj.subscriber.subscriptions["com.locket02.premium.yearly"]=locket02,obj.subscriber.entitlements[e]=locket01}else obj.subscriber.subscriptions["com.locket02.premium.yearly"]=locket02,obj.subscriber.entitlements.pro=locket01;$done({body:JSON.stringify(obj)});

// === locket.js ===
var request = $request;

const options = {
    url: "https://api.revenuecat.com/v1/product_entitlement_mapping",
    headers: {
     'Authorization' : request.headers["authorization"],
     'X-Platform' : 'iOS' ,
     'User-Agent' : request.headers["user-agent"]
    }
}

$httpClient.get(options, function(error, newResponse, data){
  
const ent = JSON.parse(data);

let jsonToUpdate = {
        "request_date_ms": 1704070861000,
        "request_date": "2009-08-17T01:01:01Z",
        "subscriber": {
            "entitlement": {},
            "first_seen": "2009-08-17T01:01:01Z",
            "original_application_version": "9692",
            "last_seen": "2009-08-17T01:01:01Z",
            "other_purchases": {},
            "management_url": null,
            "subscriptions": {},
            "entitlements": {},
            "original_purchase_date": "2009-08-17T01:01:01Z",
            "original_app_user_id": "70B24288-83C4-4035-B001-573285B21AE2",
            "non_subscriptions": {}
        }
    };

const productEntitlementMapping = ent.product_entitlement_mapping

for (const [entitlementId, productInfo] of Object.entries(productEntitlementMapping)) {
  const productIdentifier = productInfo.product_identifier;
  const entitlements = productInfo.entitlements;


  for (const entitlement of entitlements) {
    jsonToUpdate.subscriber.entitlements[entitlement] = {
      "purchase_date": "2009-08-17T01:01:01Z",
      "original_purchase_date": "2009-08-17T01:01:01Z",
      "expires_date": "9692-01-01T01:01:01Z",
      "is_sandbox" : false,
      "ownership_type": "PURCHASED",
      "store": "app_store",
      "product_identifier": productIdentifier
    };

    // Add product identifier to subscriptions
    jsonToUpdate.subscriber.subscriptions[productIdentifier] = {
      "expires_date": "9692-01-01T01:01:01Z",
      "original_purchase_date": "2009-08-17T01:01:01Z",
      "purchase_date": "2009-08-17T01:01:01Z",
      "is_sandbox" : false,
      "ownership_type": "PURCHASED",
      "store": "app_store"
    };
  }
}

body = JSON.stringify(jsonToUpdate);
$done({body});

});