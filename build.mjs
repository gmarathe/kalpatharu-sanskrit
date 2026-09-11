// Build: src/ → public/  (run: npm run build)
import { build } from "esbuild";
import fs from "node:fs";
import crypto from "node:crypto";

const out = "public";
fs.mkdirSync(`${out}/fonts`, { recursive: true });

await build({
  entryPoints: ["src/main.jsx"], bundle: true, minify: true, format: "iife",
  outfile: `${out}/app.js`, jsx: "automatic", loader: { ".js": "jsx" },
  define: { "process.env.NODE_ENV": '"production"' }, legalComments: "none", target: ["es2019"],
});

// Fonts (self-hosted so the app works offline)
const F = "node_modules/@fontsource";
const fonts = {
  "kn-400.woff2": `${F}/noto-serif-kannada/files/noto-serif-kannada-kannada-400-normal.woff2`,
  "kn-700.woff2": `${F}/noto-serif-kannada/files/noto-serif-kannada-kannada-700-normal.woff2`,
  "la-400.woff2": `${F}/noto-serif-kannada/files/noto-serif-kannada-latin-400-normal.woff2`,
  "la-700.woff2": `${F}/noto-serif-kannada/files/noto-serif-kannada-latin-700-normal.woff2`,
  "dv-400.woff2": `${F}/noto-serif-devanagari/files/noto-serif-devanagari-devanagari-400-normal.woff2`,
  "dv-700.woff2": `${F}/noto-serif-devanagari/files/noto-serif-devanagari-devanagari-700-normal.woff2`,
};
for (const [n, p] of Object.entries(fonts)) fs.copyFileSync(p, `${out}/fonts/${n}`);

const css = fs.readFileSync("src/style.css", "utf8");
const js = fs.readFileSync(`${out}/app.js`);
const ver = crypto.createHash("sha1").update(js).update(css).digest("hex").slice(0, 10);

fs.writeFileSync(`${out}/index.html`, `<!DOCTYPE html>
<html lang="kn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲಮ್</title>
<meta name="description" content="ಕನ್ನಡದಲ್ಲಿ ಸಂಸ್ಕೃತ — ದಿನಕ್ಕೆ ಐದು ನಿಮಿಷ. ಪಠಾಮಃ ವದಾಮಃ ಪ್ರಸಾರಯಾಮಃ">
<meta name="theme-color" content="#7A1F2B">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="ಸಂಸ್ಕೃತ ಮಂಡಲಮ್">
<meta property="og:title" content="ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲಮ್">
<meta property="og:description" content="ಕನ್ನಡದಲ್ಲಿ ಸಂಸ್ಕೃತ ಕಲಿಯಿರಿ. ದಿನಕ್ಕೆ ಐದು ನಿಮಿಷ ಸಾಕು.">
<meta property="og:image" content="/icons/icon-512.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" href="/icons/icon-192.png">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="preload" href="/fonts/kn-400.woff2" as="font" type="font/woff2" crossorigin>
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<noscript>ಈ ಆ್ಯಪ್‌ಗೆ JavaScript ಬೇಕು.</noscript>
<script src="/app.js?v=${ver}" defer></script>
</body>
</html>
`);

fs.writeFileSync(`${out}/sw.js`, fs.readFileSync("src/sw.js", "utf8").replace("__VERSION__", ver));
console.log("built", ver, (js.length / 1024).toFixed(0) + " KB js");
