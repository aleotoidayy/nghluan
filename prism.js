function fakePlus(json) {
    if (!json || typeof json !== "object") return json;

    const oldUserToken =
        json.subscriptionStatus?.userToken ?? null;

    json.subscriptionStatus = {
        level: "PLUS",
        market: "APPLE",
        userToken: oldUserToken, 
        itemId: "com.navercorp.prism.plusmonthly",
        autoRenewing: true,
        startAt: "2025-01-01T00:00:00.000Z",
        endAt: "2099-01-01T00:00:00.000Z",
        realEndAt: "2099-01-01T00:00:00.000Z",
        isTrial: true,
        hadTrial: true,
        subscriptionStatus: "ACTIVE"
    };

    json.subscriptionResource = null;

    return json;
}

let body = $response.body;

if (body) {
    try {
        const json = JSON.parse(body);
        fakePlus(json);
        body = JSON.stringify(json);
    } catch (e) {}
}

$done({ body });
