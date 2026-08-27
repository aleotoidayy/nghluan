var obj = JSON.parse($response.body);
const headers = $request.headers;
const ua = headers['User-Agent'] || headers['user-agent'];

const list = {
  'CLIME': { id: "com.apalonapps.radarfree.01y_CLIME00001_d50" },
  'SpeakTranslate': { id: "com.speakandtranslate.premium.69_99.yearly.7dtrial.groupa" },
  'splice': { id: "com.path36.SpliceFree.1y_t150_bundle" },
  'filmicpro': { id: "com.cinegenix.filmic.pro.1y_t130_bundle_creator" },
  'firstlight': { id: "com.filmicpro.firstlight.1y_t130_bundle_creator" },
  'doubletake': { id: "com.filmicpro.doubletake.1w_t20_bundle_creator" },
  'focos': { id: "com.focos.1y_t130_bundle_creator" },
  'remini': { id: "com.bigwinepot.nwdn.international.1y_p99_99_ft_pro" },
  'focoslive': { id: "com.focoslive.1y_t130_adj" },
  'thirtydayfitness': { id: "com.vigorapps.30DayFitness.1y_t130_bundle_adj" },
  'sleep': { id: "com.bendingspoonsapps.SleepHelp.1y_t100_bundle_adj" },
  'yoga': { id: "com.flyingnayeem.yoga.1y_t100_1w_bundle_adj" }
};

for (const key in list) {
  if (new RegExp(`^${key}`, `i`).test(ua)) {
    obj["me"]["active_subscriptions_ids"] = [list[key].id];
    obj["me"]["active_bundle_subscriptions"] = [{
      "expiry": "2099-01-01T00:00:00+00:00",
      "product_id": list[key].id,
      "features": ["unlock"]
    }];
    obj["settings"]["__identity__"]["expiration"] = "2099-01-01T00:00:00+00:00";
    break;
  }
}

$done({body: JSON.stringify(obj)});
