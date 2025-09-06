var body = $response.body.replace(
  /<head>/,
  `<head>
    <style>
      .sidebar_units,
      .sidebar_compliance,
      div[class^="wwads-"],
      [id="ads"],
      [class="ads"],
      .sponsor,
      .promotion {
        display: none !important;
        visibility: hidden !important;
        max-height: 0 !important;
        overflow: hidden !important;
      }
      .popup,
      .modal,
      .overlay,
      [class*="popup"],
      [class*="modal"] {
        display: none !important;
      }
      video[autoplay][src*="ads"],
      video[ad],
      iframe[src*="ads"],
      iframe[id="ads"] {
        display: none !important;
      }
    </style>`
);

$done({ body });
