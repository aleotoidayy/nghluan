const opName = $request?.operationName || "";

let body;

if (/Ads/i.test(opName)) {
  $done({ body: "{}" });
} else {
  try {
    body = JSON.parse(
      $response.body
        .replace(/"isObfuscated":true/g, '"isObfuscated":false')
        .replace(/"obfuscatedPath":"[^"]*"/g, '"obfuscatedPath":null')
        .replace(/"isNsfw":true/g, '"isNsfw":false')
        .replace(/"isAdPersonalizationAllowed":true/g, '"isAdPersonalizationAllowed":false')
        .replace(/"isThirdPartyInfoAdPersonalizationAllowed":true/g, '"isThirdPartyInfoAdPersonalizationAllowed":false')
        .replace(/"isNsfwMediaBlocked":true/g, '"isNsfwMediaBlocked":false')
        .replace(/"isNsfwContentShown":true/g, '"isNsfwContentShown":false')
        .replace(/"isPremiumMember":false/g, '"isPremiumMember":true')
        .replace(/"isEmployee":false/g, '"isEmployee":true')
    );

    const data = body.data ?? {};

    Object.keys(data).forEach((key) => {
      const items = data[key]?.timeline?.instructions;
      if (!Array.isArray(items)) return;

      data[key].timeline.instructions = items.filter(({ node }) => {
        if (!node) return true;
        if (node.__typename === "DxeQL") return false;
        if (node.adPayload) return false;
        if (Array.isArray(node.cells)) {
          return !node.cells.some((cell) => cell?.__typename === "Ad");
        }
        return true;
      });
    });

    body = JSON.stringify(body);
  } catch (err) {
    console.log("Parse Error:", err);
  } finally {
    $done(body ? { body } : {});
  }
}
