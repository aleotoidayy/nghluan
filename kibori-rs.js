let aleoo = JSON.parse($response.body);

if (aleoo.entries) {
    aleoo.entries.MAX_FREE_ACTION = "99999";
    aleoo.entries.MAX_FREE_TEMPLATE = "99999";
    aleoo.entries.MAX_FREE_STICKER_PACK_DOWNLOAD = "99999";
    aleoo.entries.MAX_FREE_BUBBLE_TEMPLATE_DOWNLOAD = "99999";
    aleoo.entries.FREE_DRAWING_COPY_LIMIT = "99999";
    aleoo.entries.DAILY_DRAWING_COPY_LIMIT = "99999";
    aleoo.entries.ADS_ENABLED = "false";
    
    if (aleoo.entries.REMOVE_BG_CONFIG) {
        let removeBg = JSON.parse(aleoo.entries.REMOVE_BG_CONFIG);
        removeBg.first_day_daily_limit = 99999;
        removeBg.daily_limit = 99999;
        aleoo.entries.REMOVE_BG_CONFIG = JSON.stringify(removeBg);
    }
    
    if (aleoo.entries.PREMIUM_PLANS) {
        aleoo.entries.PREMIUM_PLANS = aleoo.entries.PREMIUM_PLANS
            .replace(/"show":false/g, '"show":true')
            .replace(/"is_best":false/g, '"is_best":true')
            .replace(/"recommended":false/g, '"recommended":true')
            .replace(/"product_id":"skey_subs_weekly/, '"product_id":"skey_product_lifetime"')
            .replace(/"type":"subscription"/, '"type":"lifetime"');
    }
}

$done({body: JSON.stringify(aleoo)});
