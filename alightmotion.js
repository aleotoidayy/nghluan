// Author: aleotoidayy
// Date: 2025-06-01
// Purpose: Alight Motion 

var objc = JSON.parse($response.body);
objc = {
  result: {
    result: "success",
    msTime: 0x18df5429d80,
    accountCreatedMillis: null,
    licenses: [
      {
        benefits: [
          "AdvancedEasing",
          "CameraObjects",
          "CloudStorageLowTier",
          "FutureMemberFeatures",
          "LayerParenting",
          "MemberEffects",
          "ProjectPackageSharing",
          "RemoveWatermark"
        ],
        type: "subscription",
        store: "apple_app_store",
        autoRenewing: true,
        orderNumber: "300001752007005",
        productId: "alightcreative.motion.1y_t60_1w",
        period: "1y",
        label: null,
        details: null,
        expires: 4070908800000, 
        valid: true,
        linkStatus: "linked-current"
      }
    ],
    warnings: []
  }
};
$done({ body: JSON.stringify(objc) });
