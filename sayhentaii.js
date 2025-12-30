let aleoo = $response.body;

if (aleoo) {
    const style = `
    <style>
        .cat-fish, .cat-fish-mobile, .cat-fish-pc, .sticky-footer, .pop-up, .vipads,
        [id*="cat-fish"], [class*="float-ck"], [id*="vn_"], .ads-banner {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            pointer-events: none !important;
        }
        a[href*="68gamewin33"], a[href*="6789x.site"], a[href*="au88link"], a[href*="bet"] {
            display: none !important;
        }
    </style>`;

    aleoo = aleoo.replace('<head>', '<head>' + style);
    aleoo = aleoo.replace(/<script.*?src=".*?(vipads|badland|darnobedience|acquiredeceased|clickadu|mb66).*?".*?><\/script>/g, '');
    aleoo = aleoo.replace(/https?:\/\/.*?\.(me|art|live|net|com)\/public\/storage\/images\/banner\/.*\.gif/g, '');
    aleoo = aleoo.replace(/window\.open\(/g, 'console.log("Blocked");(');
}

$done({ body: aleoo });
