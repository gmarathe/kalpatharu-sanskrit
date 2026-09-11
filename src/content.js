/* ═══════════════════════════════════════════════════════════════
   ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲಮ್ — ಪಾಠದ ವಿಷಯ (content)
   ───────────────────────────────────────────────────────────────
   ಇಲ್ಲಿರುವುದು ವಿಷಯ ಮಾತ್ರ. ಕೋಡ್ ಮುಟ್ಟದೆ ಇಲ್ಲಿಯೇ ತಿದ್ದಬಹುದು.

   status:
     "REVIEW_REQUIRED"  ಕಾಣುತ್ತದೆ, "ಪರಿಶೀಲನೆ ಬಾಕಿ" ಗುರುತಿನೊಂದಿಗೆ
     "VERIFIED"         ಕಾಣುತ್ತದೆ, "ಪರಿಶೀಲಿತ" ಗುರುತು + ಮೂಲ (src)
     "WITHDRAWN"        ಎಲ್ಲರಿಗೂ ತಕ್ಷಣ ಮರೆಯಾಗುತ್ತದೆ (ತಪ್ಪು ಖಚಿತವಾದಾಗ)
   ಪುಸ್ತಕದೊಂದಿಗೆ ಹೋಲಿಸಿದ ಮೇಲೆ: src = "ಪುಸ್ತಕ, ಪಾಠ #", reviewedBy,
   reviewedOn = "YYYY-MM-DD", status = "VERIFIED".

   ಅರ್ಥ ಬರೆಯುವ ನಿಯಮ: ಸಂಸ್ಕೃತದಲ್ಲಿ ಇಲ್ಲದ ಪದವನ್ನು ಅರ್ಥದಲ್ಲಿ
   ಸೇರಿಸಬೇಡಿ. पठामि = ಓದುತ್ತೇನೆ; अहं पठामि = ನಾನು ಓದುತ್ತೇನೆ.
   ═══════════════════════════════════════════════════════════════ */

// ಹಂತ 0 — ಸ್ವರಗಳು [ದೇವನಾಗರಿ, ಕನ್ನಡ]
export const VOWELS = [
  ["अ", "ಅ"],
  ["आ", "ಆ"],
  ["इ", "ಇ"],
  ["ई", "ಈ"],
  ["उ", "ಉ"],
  ["ऊ", "ಊ"],
  ["ऋ", "ಋ"],
  ["ॠ", "ೠ"],
  ["ऌ", "ಌ"],
  ["ए", "ಏ"],
  ["ऐ", "ಐ"],
  ["ओ", "ಓ"],
  ["औ", "ಔ"],
  ["अं", "ಅಂ"],
  ["अः", "ಅಃ"]
];

// ಹಂತ 0 — ವ್ಯಂಜನಗಳು
export const CONSONANTS = [{"row": "ಕಂಠ್ಯ", "note": "ಗಂಟಲಿನಿಂದ", "items": [["क", "ಕ"], ["ख", "ಖ"], ["ग", "ಗ"], ["घ", "ಘ"], ["ङ", "ಙ"]]}, {"row": "ತಾಲವ್ಯ", "note": "ಅಂಗುಳಿನಿಂದ", "items": [["च", "ಚ"], ["छ", "ಛ"], ["ज", "ಜ"], ["झ", "ಝ"], ["ञ", "ಞ"]]}, {"row": "ಮೂರ್ಧನ್ಯ", "note": "ನಾಲಿಗೆ ಮೇಲ್ಮುಟ್ಟಿ", "items": [["ट", "ಟ"], ["ठ", "ಠ"], ["ड", "ಡ"], ["ढ", "ಢ"], ["ण", "ಣ"]]}, {"row": "ದಂತ್ಯ", "note": "ಹಲ್ಲಿನಿಂದ", "items": [["त", "ತ"], ["थ", "ಥ"], ["द", "ದ"], ["ध", "ಧ"], ["न", "ನ"]]}, {"row": "ಓಷ್ಠ್ಯ", "note": "ತುಟಿಯಿಂದ", "items": [["प", "ಪ"], ["फ", "ಫ"], ["ब", "ಬ"], ["भ", "ಭ"], ["म", "ಮ"]]}, {"row": "ಅಂತಸ್ಥ", "note": "", "items": [["य", "ಯ"], ["र", "ರ"], ["ल", "ಲ"], ["व", "ವ"]]}, {"row": "ಊಷ್ಮ", "note": "", "items": [["श", "ಶ"], ["ष", "ಷ"], ["स", "ಸ"], ["ह", "ಹ"]]}, {"row": "ಸಂಯುಕ್ತಾಕ್ಷರ", "note": "ಎರಡು ಅಕ್ಷರ ಸೇರಿ", "items": [["क्ष", "ಕ್ಷ"], ["त्र", "ತ್ರ"], ["ज्ञ", "ಜ್ಞ"], ["श्र", "ಶ್ರ"]]}];

// ಹಂತ 0 — ಉಚ್ಚಾರಣೆಯ ಟಿಪ್ಪಣಿಗಳು
export const NOTES = [
  {"t": "ಕನ್ನಡ ಲಿಪಿಯೇ ನಿಮ್ಮ ಗುರು", "d": "ಸಂಸ್ಕೃತದ ಎಲ್ಲಾ ಅಕ್ಷರಗಳೂ ಕನ್ನಡದಲ್ಲಿವೆ. ಹಾಗಾಗಿ ದೇವನಾಗರಿ ಬಾರದಿದ್ದರೂ ನೀವು ಸರಿಯಾಗಿ ಉಚ್ಚರಿಸಬಲ್ಲಿರಿ."},
  {"t": "ಹ್ರಸ್ವ ಮತ್ತು ದೀರ್ಘ", "d": "ಅ–ಆ, ಇ–ಈ, ಉ–ಊ. ದೀರ್ಘವನ್ನು ಎರಡು ಮಾತ್ರೆ ಹಿಡಿದು ಹೇಳಿ. ಸಂಸ್ಕೃತದಲ್ಲಿ ಇದು ಅರ್ಥವನ್ನೇ ಬದಲಾಯಿಸಬಲ್ಲದು."},
  {"t": "ಏ ಮತ್ತು ಓ ಸದಾ ದೀರ್ಘ", "d": "ಸಂಸ್ಕೃತದಲ್ಲಿ ಹ್ರಸ್ವ ಎ, ಒ ಇಲ್ಲ. ए = ಏ, ओ = ಓ. ಕನ್ನಡಿಗರು ಇಲ್ಲೇ ಹೆಚ್ಚು ತಪ್ಪುತ್ತಾರೆ."},
  {"t": "ವಿಸರ್ಗ ಃ", "d": "ಪದದ ಕೊನೆಯಲ್ಲಿ ಸಣ್ಣ 'ಹ್' ಧ್ವನಿ. ರಾಮಃ = ರಾಮಹ್. ಗಟ್ಟಿಯಾಗಿ ಅಲ್ಲ, ಮೃದುವಾಗಿ."},
  {"t": "ಅನುಸ್ವಾರ ಂ", "d": "ಮೂಗಿನ ಧ್ವನಿ. ಗೃಹಂ, ಜಲಂ. ಮುಂದಿನ ಅಕ್ಷರಕ್ಕೆ ತಕ್ಕಂತೆ ಧ್ವನಿ ಬದಲಾಗುತ್ತದೆ."},
  {"t": "ಶ ಮತ್ತು ಷ", "d": "ಶ = ಅಂಗುಳಿನಿಂದ (ಶಿವ). ಷ = ನಾಲಿಗೆ ಮೇಲ್ಮುಟ್ಟಿ (ಪುಷ್ಪ). ಎರಡೂ ಬೇರೆ ಬೇರೆ."},
  {"t": "ಋ ಸ್ವರ", "d": "ಋ ಒಂದು ಸ್ವರ, 'ರು' ಅಲ್ಲ. ಗೃಹ, ವೃಕ್ಷ — ನಾಲಿಗೆ ಮೇಲ್ಮುಟ್ಟಿ ಸಣ್ಣದಾಗಿ."}
];

// ಘಟಕಗಳು
export const MODULES = [
  {"n": 1, "t": "ನಮಸ್ಕಾರಃ", "s": "ಶುಭಾಶಯಗಳು"},
  {"n": 2, "t": "ಮಮ ಪರಿಚಯಃ", "s": "ನನ್ನ ಪರಿಚಯ"},
  {"n": 3, "t": "ಮಮ ಪರಿವಾರಃ", "s": "ನನ್ನ ಕುಟುಂಬ"},
  {"n": 4, "t": "ಮಮ ಗೃಹಮ್", "s": "ನನ್ನ ಮನೆ"},
  {"n": 5, "t": "ದೈನಿಕಜೀವನಮ್", "s": "ದೈನಂದಿನ ಜೀವನ"},
  {"n": 6, "t": "ಭೋಜನಮ್", "s": "ಊಟ"},
  {"n": 7, "t": "ಸಮಯಃ", "s": "ಸಮಯ ಮತ್ತು ಪ್ರಕೃತಿ"},
  {"n": 8, "t": "ಸಂಖ್ಯಾಃ", "s": "ಸಂಖ್ಯೆಗಳು"},
  {"n": 9, "t": "ಪ್ರಶ್ನಾಃ", "s": "ಪ್ರಶ್ನೆಗಳು"},
  {"n": 10, "t": "ಸರಳಸಂವಾದಃ", "s": "ಸರಳ ಸಂಭಾಷಣೆ"}
];

// ಹಂತ 1 — ಪದಗಳು. id ಬದಲಾಯಿಸಬೇಡಿ (ಕಲಿಯುವವರ ಪ್ರಗತಿ id ಗೆ ಕಟ್ಟಿದೆ). ಹೊಸ ಪದಕ್ಕೆ ಹೊಸ id ಕೊಡಿ.
export const WORDS = [
  {"id": 1, "d": "नमः", "k": "ನಮಃ", "m": "ನಮಸ್ಕಾರ, ವಂದನೆ", "mod": 1, "split": "ನ · ಮಃ", "tip": "ಕೊನೆಯ ವಿಸರ್ಗ ಮೃದುವಾದ 'ಹ್' ಧ್ವನಿ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 2, "d": "नमस्ते", "k": "ನಮಸ್ತೇ", "m": "ನಮಸ್ಕಾರ", "mod": 1, "split": "ನ · ಮ · ಸ್ತೇ", "tip": "ನಮಃ + ತೇ (ನಿನಗೆ). ಎಲ್ಲರಿಗೂ ಬಳಸುವ ವಂದನೆ.", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 3, "d": "धन्यवादः", "k": "ಧನ್ಯವಾದಃ", "m": "ಧನ್ಯವಾದ", "mod": 1, "split": "ಧ · ನ್ಯ · ವಾ · ದಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 4, "d": "सुस्वागतम्", "k": "ಸುಸ್ವಾಗತಮ್", "m": "ಸುಸ್ವಾಗತ", "mod": 1, "split": "ಸು · ಸ್ವಾ · ಗ · ತಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 5, "d": "आम्", "k": "ಆಮ್", "m": "ಹೌದು", "mod": 1, "split": "ಆಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 6, "d": "न", "k": "ನ", "m": "ಇಲ್ಲ, ಅಲ್ಲ", "mod": 1, "split": "ನ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 7, "d": "अस्तु", "k": "ಅಸ್ತು", "m": "ಆಗಲಿ", "mod": 1, "split": "ಅ · ಸ್ತು", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 8, "d": "क्षम्यताम्", "k": "ಕ್ಷಮ್ಯತಾಮ್", "m": "ಕ್ಷಮಿಸಿ", "mod": 1, "split": "ಕ್ಷ · ಮ್ಯ · ತಾಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 9, "d": "शुभम्", "k": "ಶುಭಮ್", "m": "ಮಂಗಳ, ಒಳಿತು", "mod": 1, "split": "ಶು · ಭಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 10, "d": "पुनः", "k": "ಪುನಃ", "m": "ಮತ್ತೆ", "mod": 1, "split": "ಪು · ನಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 11, "d": "अहम्", "k": "ಅಹಮ್", "m": "ನಾನು", "mod": 2, "split": "ಅ · ಹಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 12, "d": "त्वम्", "k": "ತ್ವಮ್", "m": "ನೀನು", "mod": 2, "split": "ತ್ವಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 13, "d": "भवान्", "k": "ಭವಾನ್", "m": "ನೀವು (ಪುರುಷರಿಗೆ)", "mod": 2, "split": "ಭ · ವಾನ್", "tip": "ಗೌರವಾರ್ಥಕ. ಇದರ ಜೊತೆ ಕ್ರಿಯಾಪದ 'ಅವನು' ರೂಪದಲ್ಲಿರುತ್ತದೆ (ಭವಾನ್ ಗಚ್ಛತಿ).", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 14, "d": "भवती", "k": "ಭವತೀ", "m": "ನೀವು (ಸ್ತ್ರೀಯರಿಗೆ)", "mod": 2, "split": "ಭ · ವ · ತೀ", "tip": "ಗೌರವಾರ್ಥಕ. ಇದರ ಜೊತೆ ಕ್ರಿಯಾಪದ 'ಅವಳು' ರೂಪದಲ್ಲಿರುತ್ತದೆ.", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 15, "d": "सः", "k": "ಸಃ", "m": "ಅವನು", "mod": 2, "split": "ಸಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 16, "d": "सा", "k": "ಸಾ", "m": "ಅವಳು", "mod": 2, "split": "ಸಾ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 17, "d": "वयम्", "k": "ವಯಮ್", "m": "ನಾವು", "mod": 2, "split": "ವ · ಯಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 18, "d": "नाम", "k": "ನಾಮ", "m": "ಹೆಸರು", "mod": 2, "split": "ನಾ · ಮ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 19, "d": "बालकः", "k": "ಬಾಲಕಃ", "m": "ಹುಡುಗ", "mod": 2, "split": "ಬಾ · ಲ · ಕಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 20, "d": "बालिका", "k": "ಬಾಲಿಕಾ", "m": "ಹುಡುಗಿ", "mod": 2, "split": "ಬಾ · ಲಿ · ಕಾ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 21, "d": "माता", "k": "ಮಾತಾ", "m": "ತಾಯಿ", "mod": 3, "split": "ಮಾ · ತಾ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 22, "d": "पिता", "k": "ಪಿತಾ", "m": "ತಂದೆ", "mod": 3, "split": "ಪಿ · ತಾ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 23, "d": "भ्राता", "k": "ಭ್ರಾತಾ", "m": "ಸಹೋದರ", "mod": 3, "split": "ಭ್ರಾ · ತಾ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 24, "d": "भगिनी", "k": "ಭಗಿನೀ", "m": "ಸಹೋದರಿ", "mod": 3, "split": "ಭ · ಗಿ · ನೀ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 25, "d": "पुत्रः", "k": "ಪುತ್ರಃ", "m": "ಮಗ", "mod": 3, "split": "ಪು · ತ್ರಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 26, "d": "पुत्री", "k": "ಪುತ್ರೀ", "m": "ಮಗಳು", "mod": 3, "split": "ಪು · ತ್ರೀ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 27, "d": "पतिः", "k": "ಪತಿಃ", "m": "ಪತಿ", "mod": 3, "split": "ಪ · ತಿಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 28, "d": "पत्नी", "k": "ಪತ್ನೀ", "m": "ಪತ್ನಿ", "mod": 3, "split": "ಪ · ತ್ನೀ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 29, "d": "मित्रम्", "k": "ಮಿತ್ರಮ್", "m": "ಸ್ನೇಹಿತ", "mod": 3, "split": "ಮಿ · ತ್ರಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 30, "d": "परिवारः", "k": "ಪರಿವಾರಃ", "m": "ಕುಟುಂಬ", "mod": 3, "split": "ಪ · ರಿ · ವಾ · ರಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 31, "d": "गुरुः", "k": "ಗುರುಃ", "m": "ಗುರು", "mod": 3, "split": "ಗು · ರುಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 32, "d": "आचार्यः", "k": "ಆಚಾರ್ಯಃ", "m": "ಆಚಾರ್ಯ, ಶಿಕ್ಷಕ", "mod": 3, "split": "ಆ · ಚಾ · ರ್ಯಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 33, "d": "छात्रः", "k": "ಛಾತ್ರಃ", "m": "ವಿದ್ಯಾರ್ಥಿ", "mod": 3, "split": "ಛಾ · ತ್ರಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 34, "d": "गृहम्", "k": "ಗೃಹಮ್", "m": "ಮನೆ", "mod": 4, "split": "ಗೃ · ಹಮ್", "tip": "ಋ ಸ್ವರ — 'ಗ್ರು' ಅಲ್ಲ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 35, "d": "द्वारम्", "k": "ದ್ವಾರಮ್", "m": "ಬಾಗಿಲು", "mod": 4, "split": "ದ್ವಾ · ರಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 36, "d": "पुस्तकम्", "k": "ಪುಸ್ತಕಮ್", "m": "ಪುಸ್ತಕ", "mod": 4, "split": "ಪು · ಸ್ತ · ಕಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 37, "d": "लेखनी", "k": "ಲೇಖನೀ", "m": "ಲೇಖನಿ", "mod": 4, "split": "ಲೇ · ಖ · ನೀ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 38, "d": "पीठम्", "k": "ಪೀಠಮ್", "m": "ಆಸನ, ಪೀಠ", "mod": 4, "split": "ಪೀ · ಠಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 39, "d": "दीपः", "k": "ದೀಪಃ", "m": "ದೀಪ", "mod": 4, "split": "ದೀ · ಪಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 40, "d": "वस्त्रम्", "k": "ವಸ್ತ್ರಮ್", "m": "ಬಟ್ಟೆ", "mod": 4, "split": "ವ · ಸ್ತ್ರಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 41, "d": "जलम्", "k": "ಜಲಮ್", "m": "ನೀರು", "mod": 4, "split": "ಜ · ಲಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 42, "d": "पात्रम्", "k": "ಪಾತ್ರಮ್", "m": "ಪಾತ್ರೆ", "mod": 4, "split": "ಪಾ · ತ್ರಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 43, "d": "मार्गः", "k": "ಮಾರ್ಗಃ", "m": "ದಾರಿ", "mod": 4, "split": "ಮಾ · ರ್ಗಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 44, "d": "ग्रामः", "k": "ಗ್ರಾಮಃ", "m": "ಹಳ್ಳಿ", "mod": 4, "split": "ಗ್ರಾ · ಮಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 45, "d": "नगरम्", "k": "ನಗರಮ್", "m": "ನಗರ", "mod": 4, "split": "ನ · ಗ · ರಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 46, "d": "शरीरम्", "k": "ಶರೀರಮ್", "m": "ಶರೀರ", "mod": 5, "split": "ಶ · ರೀ · ರಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 47, "d": "शिरः", "k": "ಶಿರಃ", "m": "ತಲೆ", "mod": 5, "split": "ಶಿ · ರಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 48, "d": "नेत्रम्", "k": "ನೇತ್ರಮ್", "m": "ಕಣ್ಣು", "mod": 5, "split": "ನೇ · ತ್ರಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 49, "d": "कर्णः", "k": "ಕರ್ಣಃ", "m": "ಕಿವಿ", "mod": 5, "split": "ಕ · ರ್ಣಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 50, "d": "नासिका", "k": "ನಾಸಿಕಾ", "m": "ಮೂಗು", "mod": 5, "split": "ನಾ · ಸಿ · ಕಾ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 51, "d": "मुखम्", "k": "ಮುಖಮ್", "m": "ಮುಖ, ಬಾಯಿ", "mod": 5, "split": "ಮು · ಖಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 52, "d": "हस्तः", "k": "ಹಸ್ತಃ", "m": "ಕೈ", "mod": 5, "split": "ಹ · ಸ್ತಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 53, "d": "पादः", "k": "ಪಾದಃ", "m": "ಕಾಲು", "mod": 5, "split": "ಪಾ · ದಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 54, "d": "गच्छामि", "k": "ಗಚ್ಛಾಮಿ", "m": "ಹೋಗುತ್ತೇನೆ", "mod": 5, "split": "ಗ · ಚ್ಛಾ · ಮಿ", "tip": "ಕೊನೆಯ '-ಮಿ' ಎಂಬುದೇ 'ನಾನು' ಎಂಬ ಅರ್ಥ ಕೊಡುತ್ತದೆ, ಕನ್ನಡದ '-ಏನೆ' ಯಂತೆ. ಹಾಗಾಗಿ ಅರ್ಥದಲ್ಲಿ 'ನಾನು' ಪ್ರತ್ಯೇಕವಾಗಿ ಬರುವುದಿಲ್ಲ.", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 55, "d": "आगच्छामि", "k": "ಆಗಚ್ಛಾಮಿ", "m": "ಬರುತ್ತೇನೆ", "mod": 5, "split": "ಆ · ಗ · ಚ್ಛಾ · ಮಿ", "tip": "ಕೊನೆಯ '-ಮಿ' ಎಂಬುದೇ 'ನಾನು' ಎಂಬ ಅರ್ಥ ಕೊಡುತ್ತದೆ, ಕನ್ನಡದ '-ಏನೆ' ಯಂತೆ. ಹಾಗಾಗಿ ಅರ್ಥದಲ್ಲಿ 'ನಾನು' ಪ್ರತ್ಯೇಕವಾಗಿ ಬರುವುದಿಲ್ಲ.", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 56, "d": "पठामि", "k": "ಪಠಾಮಿ", "m": "ಓದುತ್ತೇನೆ", "mod": 5, "split": "ಪ · ಠಾ · ಮಿ", "tip": "ಕೊನೆಯ '-ಮಿ' ಎಂಬುದೇ 'ನಾನು' ಎಂಬ ಅರ್ಥ ಕೊಡುತ್ತದೆ, ಕನ್ನಡದ '-ಏನೆ' ಯಂತೆ. ಹಾಗಾಗಿ ಅರ್ಥದಲ್ಲಿ 'ನಾನು' ಪ್ರತ್ಯೇಕವಾಗಿ ಬರುವುದಿಲ್ಲ.", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 57, "d": "लिखामि", "k": "ಲಿಖಾಮಿ", "m": "ಬರೆಯುತ್ತೇನೆ", "mod": 5, "split": "ಲಿ · ಖಾ · ಮಿ", "tip": "ಕೊನೆಯ '-ಮಿ' ಎಂಬುದೇ 'ನಾನು' ಎಂಬ ಅರ್ಥ ಕೊಡುತ್ತದೆ, ಕನ್ನಡದ '-ಏನೆ' ಯಂತೆ. ಹಾಗಾಗಿ ಅರ್ಥದಲ್ಲಿ 'ನಾನು' ಪ್ರತ್ಯೇಕವಾಗಿ ಬರುವುದಿಲ್ಲ.", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 58, "d": "वदामि", "k": "ವದಾಮಿ", "m": "ಮಾತನಾಡುತ್ತೇನೆ", "mod": 5, "split": "ವ · ದಾ · ಮಿ", "tip": "ಕೊನೆಯ '-ಮಿ' ಎಂಬುದೇ 'ನಾನು' ಎಂಬ ಅರ್ಥ ಕೊಡುತ್ತದೆ, ಕನ್ನಡದ '-ಏನೆ' ಯಂತೆ. ಹಾಗಾಗಿ ಅರ್ಥದಲ್ಲಿ 'ನಾನು' ಪ್ರತ್ಯೇಕವಾಗಿ ಬರುವುದಿಲ್ಲ.", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 59, "d": "खादामि", "k": "ಖಾದಾಮಿ", "m": "ತಿನ್ನುತ್ತೇನೆ", "mod": 5, "split": "ಖಾ · ದಾ · ಮಿ", "tip": "ಕೊನೆಯ '-ಮಿ' ಎಂಬುದೇ 'ನಾನು' ಎಂಬ ಅರ್ಥ ಕೊಡುತ್ತದೆ, ಕನ್ನಡದ '-ಏನೆ' ಯಂತೆ. ಹಾಗಾಗಿ ಅರ್ಥದಲ್ಲಿ 'ನಾನು' ಪ್ರತ್ಯೇಕವಾಗಿ ಬರುವುದಿಲ್ಲ.", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 60, "d": "पिबामि", "k": "ಪಿಬಾಮಿ", "m": "ಕುಡಿಯುತ್ತೇನೆ", "mod": 5, "split": "ಪಿ · ಬಾ · ಮಿ", "tip": "ಕೊನೆಯ '-ಮಿ' ಎಂಬುದೇ 'ನಾನು' ಎಂಬ ಅರ್ಥ ಕೊಡುತ್ತದೆ, ಕನ್ನಡದ '-ಏನೆ' ಯಂತೆ. ಹಾಗಾಗಿ ಅರ್ಥದಲ್ಲಿ 'ನಾನು' ಪ್ರತ್ಯೇಕವಾಗಿ ಬರುವುದಿಲ್ಲ.", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 61, "d": "पश्यामि", "k": "ಪಶ್ಯಾಮಿ", "m": "ನೋಡುತ್ತೇನೆ", "mod": 5, "split": "ಪ · ಶ್ಯಾ · ಮಿ", "tip": "ಕೊನೆಯ '-ಮಿ' ಎಂಬುದೇ 'ನಾನು' ಎಂಬ ಅರ್ಥ ಕೊಡುತ್ತದೆ, ಕನ್ನಡದ '-ಏನೆ' ಯಂತೆ. ಹಾಗಾಗಿ ಅರ್ಥದಲ್ಲಿ 'ನಾನು' ಪ್ರತ್ಯೇಕವಾಗಿ ಬರುವುದಿಲ್ಲ.", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 62, "d": "शृणोमि", "k": "ಶೃಣೋಮಿ", "m": "ಕೇಳುತ್ತೇನೆ (ಆಲಿಸುತ್ತೇನೆ)", "mod": 5, "split": "ಶೃ · ಣೋ · ಮಿ", "tip": "ಕೊನೆಯ '-ಮಿ' ಎಂಬುದೇ 'ನಾನು' ಎಂಬ ಅರ್ಥ ಕೊಡುತ್ತದೆ, ಕನ್ನಡದ '-ಏನೆ' ಯಂತೆ. ಹಾಗಾಗಿ ಅರ್ಥದಲ್ಲಿ 'ನಾನು' ಪ್ರತ್ಯೇಕವಾಗಿ ಬರುವುದಿಲ್ಲ.", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 63, "d": "करोमि", "k": "ಕರೋಮಿ", "m": "ಮಾಡುತ್ತೇನೆ", "mod": 5, "split": "ಕ · ರೋ · ಮಿ", "tip": "ಕೊನೆಯ '-ಮಿ' ಎಂಬುದೇ 'ನಾನು' ಎಂಬ ಅರ್ಥ ಕೊಡುತ್ತದೆ, ಕನ್ನಡದ '-ಏನೆ' ಯಂತೆ. ಹಾಗಾಗಿ ಅರ್ಥದಲ್ಲಿ 'ನಾನು' ಪ್ರತ್ಯೇಕವಾಗಿ ಬರುವುದಿಲ್ಲ.", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 64, "d": "भोजनम्", "k": "ಭೋಜನಮ್", "m": "ಊಟ", "mod": 6, "split": "ಭೋ · ಜ · ನಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 65, "d": "अन्नम्", "k": "ಅನ್ನಮ್", "m": "ಅನ್ನ", "mod": 6, "split": "ಅ · ನ್ನಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 66, "d": "फलम्", "k": "ಫಲಮ್", "m": "ಹಣ್ಣು", "mod": 6, "split": "ಫ · ಲಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 67, "d": "दुग्धम्", "k": "ದುಗ್ಧಮ್", "m": "ಹಾಲು", "mod": 6, "split": "ದು · ಗ್ಧಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 68, "d": "शाकम्", "k": "ಶಾಕಮ್", "m": "ತರಕಾರಿ", "mod": 6, "split": "ಶಾ · ಕಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 69, "d": "लवणम्", "k": "ಲವಣಮ್", "m": "ಉಪ್ಪು", "mod": 6, "split": "ಲ · ವ · ಣಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 70, "d": "मधु", "k": "ಮಧು", "m": "ಜೇನು", "mod": 6, "split": "ಮ · ಧು", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 71, "d": "तैलम्", "k": "ತೈಲಮ್", "m": "ಎಣ್ಣೆ", "mod": 6, "split": "ತೈ · ಲಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 72, "d": "घृतम्", "k": "ಘೃತಮ್", "m": "ತುಪ್ಪ", "mod": 6, "split": "ಘೃ · ತಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 73, "d": "पानीयम्", "k": "ಪಾನೀಯಮ್", "m": "ಕುಡಿಯುವ ನೀರು", "mod": 6, "split": "ಪಾ · ನೀ · ಯಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 74, "d": "समयः", "k": "ಸಮಯಃ", "m": "ಸಮಯ", "mod": 7, "split": "ಸ · ಮ · ಯಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 75, "d": "दिनम्", "k": "ದಿನಮ್", "m": "ದಿನ", "mod": 7, "split": "ದಿ · ನಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 76, "d": "रात्रिः", "k": "ರಾತ್ರಿಃ", "m": "ರಾತ್ರಿ", "mod": 7, "split": "ರಾ · ತ್ರಿಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 77, "d": "प्रातः", "k": "ಪ್ರಾತಃ", "m": "ಬೆಳಿಗ್ಗೆ", "mod": 7, "split": "ಪ್ರಾ · ತಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 78, "d": "सायम्", "k": "ಸಾಯಮ್", "m": "ಸಂಜೆ", "mod": 7, "split": "ಸಾ · ಯಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 79, "d": "अद्य", "k": "ಅದ್ಯ", "m": "ಇಂದು", "mod": 7, "split": "ಅ · ದ್ಯ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 80, "d": "श्वः", "k": "ಶ್ವಃ", "m": "ನಾಳೆ", "mod": 7, "split": "ಶ್ವಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 81, "d": "ह्यः", "k": "ಹ್ಯಃ", "m": "ನಿನ್ನೆ", "mod": 7, "split": "ಹ್ಯಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 82, "d": "मासः", "k": "ಮಾಸಃ", "m": "ತಿಂಗಳು", "mod": 7, "split": "ಮಾ · ಸಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 83, "d": "वर्षम्", "k": "ವರ್ಷಮ್", "m": "ವರ್ಷ", "mod": 7, "split": "ವ · ರ್ಷಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 84, "d": "सूर्यः", "k": "ಸೂರ್ಯಃ", "m": "ಸೂರ್ಯ", "mod": 7, "split": "ಸೂ · ರ್ಯಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 85, "d": "चन्द्रः", "k": "ಚನ್ದ್ರಃ", "m": "ಚಂದ್ರ", "mod": 7, "split": "ಚ · ನ್ದ್ರಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 86, "d": "वृक्षः", "k": "ವೃಕ್ಷಃ", "m": "ಮರ", "mod": 7, "split": "ವೃ · ಕ್ಷಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 87, "d": "पुष्पम्", "k": "ಪುಷ್ಪಮ್", "m": "ಹೂವು", "mod": 7, "split": "ಪು · ಷ್ಪಮ್", "tip": "ಷ — ನಾಲಿಗೆ ಮೇಲ್ಮುಟ್ಟಿ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 88, "d": "नदी", "k": "ನದೀ", "m": "ನದಿ", "mod": 7, "split": "ನ · ದೀ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 89, "d": "आकाशः", "k": "ಆಕಾಶಃ", "m": "ಆಕಾಶ", "mod": 7, "split": "ಆ · ಕಾ · ಶಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 90, "d": "एकम्", "k": "ಏಕಮ್", "m": "ಒಂದು", "mod": 8, "split": "ಏ · ಕಮ್", "tip": "ए ಸದಾ ದೀರ್ಘ ಏ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 91, "d": "द्वे", "k": "ದ್ವೇ", "m": "ಎರಡು", "mod": 8, "split": "ದ್ವೇ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 92, "d": "त्रीणि", "k": "ತ್ರೀಣಿ", "m": "ಮೂರು", "mod": 8, "split": "ತ್ರೀ · ಣಿ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 93, "d": "चत्वारि", "k": "ಚತ್ವಾರಿ", "m": "ನಾಲ್ಕು", "mod": 8, "split": "ಚ · ತ್ವಾ · ರಿ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 94, "d": "पञ्च", "k": "ಪಞ್ಚ", "m": "ಐದು", "mod": 8, "split": "ಪ · ಞ್ಚ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 95, "d": "षट्", "k": "ಷಟ್", "m": "ಆರು", "mod": 8, "split": "ಷಟ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 96, "d": "सप्त", "k": "ಸಪ್ತ", "m": "ಏಳು", "mod": 8, "split": "ಸ · ಪ್ತ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 97, "d": "अष्टौ", "k": "ಅಷ್ಟೌ", "m": "ಎಂಟು", "mod": 8, "split": "ಅ · ಷ್ಟೌ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 98, "d": "नव", "k": "ನವ", "m": "ಒಂಬತ್ತು", "mod": 8, "split": "ನ · ವ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 99, "d": "दश", "k": "ದಶ", "m": "ಹತ್ತು", "mod": 8, "split": "ದ · ಶ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 100, "d": "किम्", "k": "ಕಿಮ್", "m": "ಏನು", "mod": 9, "split": "ಕಿಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 101, "d": "कुत्र", "k": "ಕುತ್ರ", "m": "ಎಲ್ಲಿ", "mod": 9, "split": "ಕು · ತ್ರ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 102, "d": "कदा", "k": "ಕದಾ", "m": "ಯಾವಾಗ", "mod": 9, "split": "ಕ · ದಾ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 103, "d": "कथम्", "k": "ಕಥಮ್", "m": "ಹೇಗೆ", "mod": 9, "split": "ಕ · ಥಮ್", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 104, "d": "कः", "k": "ಕಃ", "m": "ಯಾರು (ಪುರುಷ)", "mod": 9, "split": "ಕಃ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 105, "d": "कति", "k": "ಕತಿ", "m": "ಎಷ್ಟು", "mod": 9, "split": "ಕ · ತಿ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 106, "d": "अत्र", "k": "ಅತ್ರ", "m": "ಇಲ್ಲಿ", "mod": 9, "split": "ಅ · ತ್ರ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 107, "d": "तत्र", "k": "ತತ್ರ", "m": "ಅಲ್ಲಿ", "mod": 9, "split": "ತ · ತ್ರ", "tip": null, "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null}
];

// ಹಂತ 2 — ವಾಕ್ಯಗಳು. parts = ಪದಚ್ಛೇದ [ಪದ, ಅಕ್ಷರಶಃ ಅರ್ಥ]
export const SENTENCES = [
  {"id": 1, "d": "नमस्ते।", "k": "ನಮಸ್ತೇ", "m": "ನಮಸ್ಕಾರ", "mod": 1, "parts": [["नमस्ते", "ನಮಸ್ಕಾರ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 2, "d": "भवते नमः।", "k": "ಭವತೇ ನಮಃ", "m": "ನಿಮಗೆ ನಮಸ್ಕಾರ", "mod": 1, "parts": [["भवते", "ನಿಮಗೆ"], ["नमः", "ನಮಸ್ಕಾರ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 3, "d": "धन्यवादः।", "k": "ಧನ್ಯವಾದಃ", "m": "ಧನ್ಯವಾದ", "mod": 1, "parts": [["धन्यवादः", "ಧನ್ಯವಾದ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 4, "d": "पुनः मिलामः।", "k": "ಪುನಃ ಮಿಲಾಮಃ", "m": "ಮತ್ತೆ ಸಿಗುತ್ತೇವೆ", "mod": 1, "parts": [["पुनः", "ಮತ್ತೆ"], ["मिलामः", "ಸಿಗುತ್ತೇವೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 5, "d": "शुभं भवतु।", "k": "ಶುಭಂ ಭವತು", "m": "ಒಳ್ಳೆಯದಾಗಲಿ", "mod": 1, "parts": [["शुभम्", "ಒಳಿತು"], ["भवतु", "ಆಗಲಿ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 6, "d": "मम नाम गुरुदत्तः अस्ति।", "k": "ಮಮ ನಾಮ ಗುರುದತ್ತಃ ಅಸ್ತಿ", "m": "ನನ್ನ ಹೆಸರು ಗುರುದತ್ತ", "mod": 2, "parts": [["मम", "ನನ್ನ"], ["नाम", "ಹೆಸರು"], ["गुरुदत्तः", "ಗುರುದತ್ತ"], ["अस्ति", "ಇದೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 7, "d": "भवतः नाम किम्?", "k": "ಭವತಃ ನಾಮ ಕಿಮ್?", "m": "ನಿಮ್ಮ ಹೆಸರೇನು? (ಪುರುಷರಿಗೆ)", "mod": 2, "parts": [["भवतः", "ನಿಮ್ಮ"], ["नाम", "ಹೆಸರು"], ["किम्", "ಏನು"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 8, "d": "भवत्याः नाम किम्?", "k": "ಭವತ್ಯಾಃ ನಾಮ ಕಿಮ್?", "m": "ನಿಮ್ಮ ಹೆಸರೇನು? (ಸ್ತ್ರೀಯರಿಗೆ)", "mod": 2, "parts": [["भवत्याः", "ನಿಮ್ಮ"], ["नाम", "ಹೆಸರು"], ["किम्", "ಏನು"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 9, "d": "अहं छात्रः अस्मि।", "k": "ಅಹಂ ಛಾತ್ರಃ ಅಸ್ಮಿ", "m": "ನಾನು ವಿದ್ಯಾರ್ಥಿ", "mod": 2, "parts": [["अहम्", "ನಾನು"], ["छात्रः", "ವಿದ್ಯಾರ್ಥಿ"], ["अस्मि", "ಇದ್ದೇನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 10, "d": "सः मम मित्रम् अस्ति।", "k": "ಸಃ ಮಮ ಮಿತ್ರಮ್ ಅಸ್ತಿ", "m": "ಅವನು ನನ್ನ ಸ್ನೇಹಿತ", "mod": 2, "parts": [["सः", "ಅವನು"], ["मम", "ನನ್ನ"], ["मित्रम्", "ಸ್ನೇಹಿತ"], ["अस्ति", "ಇದ್ದಾನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 11, "d": "एषा मम माता अस्ति।", "k": "ಏಷಾ ಮಮ ಮಾತಾ ಅಸ್ತಿ", "m": "ಇವರು ನನ್ನ ತಾಯಿ", "mod": 3, "parts": [["एषा", "ಇವಳು (ಇವರು)"], ["मम", "ನನ್ನ"], ["माता", "ತಾಯಿ"], ["अस्ति", "ಇದ್ದಾಳೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 12, "d": "एषः मम पिता अस्ति।", "k": "ಏಷಃ ಮಮ ಪಿತಾ ಅಸ್ತಿ", "m": "ಇವರು ನನ್ನ ತಂದೆ", "mod": 3, "parts": [["एषः", "ಇವನು (ಇವರು)"], ["मम", "ನನ್ನ"], ["पिता", "ತಂದೆ"], ["अस्ति", "ಇದ್ದಾನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 13, "d": "मम भगिनी पठति।", "k": "ಮಮ ಭಗಿನೀ ಪಠತಿ", "m": "ನನ್ನ ಸಹೋದರಿ ಓದುತ್ತಾಳೆ", "mod": 3, "parts": [["मम", "ನನ್ನ"], ["भगिनी", "ಸಹೋದರಿ"], ["पठति", "ಓದುತ್ತಾಳೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 14, "d": "मम भ्राता लिखति।", "k": "ಮಮ ಭ್ರಾತಾ ಲಿಖತಿ", "m": "ನನ್ನ ಸಹೋದರ ಬರೆಯುತ್ತಾನೆ", "mod": 3, "parts": [["मम", "ನನ್ನ"], ["भ्राता", "ಸಹೋದರ"], ["लिखति", "ಬರೆಯುತ್ತಾನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 15, "d": "मम परिवारः अत्र अस्ति।", "k": "ಮಮ ಪರಿವಾರಃ ಅತ್ರ ಅಸ್ತಿ", "m": "ನನ್ನ ಕುಟುಂಬ ಇಲ್ಲಿದೆ", "mod": 3, "parts": [["मम", "ನನ್ನ"], ["परिवारः", "ಕುಟುಂಬ"], ["अत्र", "ಇಲ್ಲಿ"], ["अस्ति", "ಇದೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 16, "d": "एतत् मम गृहम्।", "k": "ಏತತ್ ಮಮ ಗೃಹಮ್", "m": "ಇದು ನನ್ನ ಮನೆ", "mod": 4, "parts": [["एतत्", "ಇದು"], ["मम", "ನನ್ನ"], ["गृहम्", "ಮನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 17, "d": "एतत् पुस्तकम् अस्ति।", "k": "ಏತತ್ ಪುಸ್ತಕಮ್ ಅಸ್ತಿ", "m": "ಇದು ಪುಸ್ತಕ", "mod": 4, "parts": [["एतत्", "ಇದು"], ["पुस्तकम्", "ಪುಸ್ತಕ"], ["अस्ति", "ಇದೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 18, "d": "भवतः गृहं कुत्र अस्ति?", "k": "ಭವತಃ ಗೃಹಂ ಕುತ್ರ ಅಸ್ತಿ?", "m": "ನಿಮ್ಮ ಮನೆ ಎಲ್ಲಿದೆ?", "mod": 4, "parts": [["भवतः", "ನಿಮ್ಮ"], ["गृहम्", "ಮನೆ"], ["कुत्र", "ಎಲ್ಲಿ"], ["अस्ति", "ಇದೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 19, "d": "मम गृहं ग्रामे अस्ति।", "k": "ಮಮ ಗೃಹಂ ಗ್ರಾಮೇ ಅಸ್ತಿ", "m": "ನನ್ನ ಮನೆ ಹಳ್ಳಿಯಲ್ಲಿದೆ", "mod": 4, "parts": [["मम", "ನನ್ನ"], ["गृहम्", "ಮನೆ"], ["ग्रामे", "ಹಳ್ಳಿಯಲ್ಲಿ"], ["अस्ति", "ಇದೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 20, "d": "जलं कुत्र अस्ति?", "k": "ಜಲಂ ಕುತ್ರ ಅಸ್ತಿ?", "m": "ನೀರು ಎಲ್ಲಿದೆ?", "mod": 4, "parts": [["जलम्", "ನೀರು"], ["कुत्र", "ಎಲ್ಲಿ"], ["अस्ति", "ಇದೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 21, "d": "अत्र जलम् अस्ति।", "k": "ಅತ್ರ ಜಲಮ್ ಅಸ್ತಿ", "m": "ಇಲ್ಲಿ ನೀರಿದೆ", "mod": 4, "parts": [["अत्र", "ಇಲ್ಲಿ"], ["जलम्", "ನೀರು"], ["अस्ति", "ಇದೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 22, "d": "अहं गृहं गच्छामि।", "k": "ಅಹಂ ಗೃಹಂ ಗಚ್ಛಾಮಿ", "m": "ನಾನು ಮನೆಗೆ ಹೋಗುತ್ತೇನೆ", "mod": 5, "parts": [["अहम्", "ನಾನು"], ["गृहम्", "ಮನೆಗೆ"], ["गच्छामि", "ಹೋಗುತ್ತೇನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 23, "d": "भवान् कुत्र गच्छति?", "k": "ಭವಾನ್ ಕುತ್ರ ಗಚ್ಛತಿ?", "m": "ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತೀರಿ?", "mod": 5, "parts": [["भवान्", "ನೀವು"], ["कुत्र", "ಎಲ್ಲಿಗೆ"], ["गच्छति", "ಹೋಗುತ್ತೀರಿ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 24, "d": "अहं पुस्तकं पठामि।", "k": "ಅಹಂ ಪುಸ್ತಕಂ ಪಠಾಮಿ", "m": "ನಾನು ಪುಸ್ತಕ ಓದುತ್ತೇನೆ", "mod": 5, "parts": [["अहम्", "ನಾನು"], ["पुस्तकम्", "ಪುಸ್ತಕ"], ["पठामि", "ಓದುತ್ತೇನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 25, "d": "अहं संस्कृतं पठामि।", "k": "ಅಹಂ ಸಂಸ್ಕೃತಂ ಪಠಾಮಿ", "m": "ನಾನು ಸಂಸ್ಕೃತ ಓದುತ್ತೇನೆ", "mod": 5, "parts": [["अहम्", "ನಾನು"], ["संस्कृतम्", "ಸಂಸ್ಕೃತ"], ["पठामि", "ಓದುತ್ತೇನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 26, "d": "वयं संस्कृतं पठामः।", "k": "ವಯಂ ಸಂಸ್ಕೃತಂ ಪಠಾಮಃ", "m": "ನಾವು ಸಂಸ್ಕೃತ ಓದುತ್ತೇವೆ", "mod": 5, "parts": [["वयम्", "ನಾವು"], ["संस्कृतम्", "ಸಂಸ್ಕೃತ"], ["पठामः", "ಓದುತ್ತೇವೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 27, "d": "भवान् किं करोति?", "k": "ಭವಾನ್ ಕಿಂ ಕರೋತಿ?", "m": "ನೀವು ಏನು ಮಾಡುತ್ತೀರಿ?", "mod": 5, "parts": [["भवान्", "ನೀವು"], ["किम्", "ಏನು"], ["करोति", "ಮಾಡುತ್ತೀರಿ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 28, "d": "अहं लिखामि।", "k": "ಅಹಂ ಲಿಖಾಮಿ", "m": "ನಾನು ಬರೆಯುತ್ತೇನೆ", "mod": 5, "parts": [["अहम्", "ನಾನು"], ["लिखामि", "ಬರೆಯುತ್ತೇನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 29, "d": "सः वदति।", "k": "ಸಃ ವದತಿ", "m": "ಅವನು ಮಾತನಾಡುತ್ತಾನೆ", "mod": 5, "parts": [["सः", "ಅವನು"], ["वदति", "ಮಾತನಾಡುತ್ತಾನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 30, "d": "अहं जलं पिबामि।", "k": "ಅಹಂ ಜಲಂ ಪಿಬಾಮಿ", "m": "ನಾನು ನೀರು ಕುಡಿಯುತ್ತೇನೆ", "mod": 6, "parts": [["अहम्", "ನಾನು"], ["जलम्", "ನೀರು"], ["पिबामि", "ಕುಡಿಯುತ್ತೇನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 31, "d": "सा फलं खादति।", "k": "ಸಾ ಫಲಂ ಖಾದತಿ", "m": "ಅವಳು ಹಣ್ಣು ತಿನ್ನುತ್ತಾಳೆ", "mod": 6, "parts": [["सा", "ಅವಳು"], ["फलम्", "ಹಣ್ಣು"], ["खादति", "ತಿನ್ನುತ್ತಾಳೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 32, "d": "भोजनं सिद्धम् अस्ति।", "k": "ಭೋಜನಂ ಸಿದ್ಧಮ್ ಅಸ್ತಿ", "m": "ಊಟ ಸಿದ್ಧವಾಗಿದೆ", "mod": 6, "parts": [["भोजनम्", "ಊಟ"], ["सिद्धम्", "ಸಿದ್ಧ"], ["अस्ति", "ಇದೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 33, "d": "जलम् आनयतु।", "k": "ಜಲಮ್ ಆನಯತು", "m": "ನೀರು ತನ್ನಿ", "mod": 6, "parts": [["जलम्", "ನೀರು"], ["आनयतु", "ತನ್ನಿ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 34, "d": "दुग्धं पिबतु।", "k": "ದುಗ್ಧಂ ಪಿಬತು", "m": "ಹಾಲು ಕುಡಿಯಿರಿ", "mod": 6, "parts": [["दुग्धम्", "ಹಾಲು"], ["पिबतु", "ಕುಡಿಯಿರಿ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 35, "d": "अद्य अहं गृहे अस्मि।", "k": "ಅದ್ಯ ಅಹಂ ಗೃಹೇ ಅಸ್ಮಿ", "m": "ಇಂದು ನಾನು ಮನೆಯಲ್ಲಿದ್ದೇನೆ", "mod": 7, "parts": [["अद्य", "ಇಂದು"], ["अहम्", "ನಾನು"], ["गृहे", "ಮನೆಯಲ್ಲಿ"], ["अस्मि", "ಇದ್ದೇನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 36, "d": "श्वः अहम् आगच्छामि।", "k": "ಶ್ವಃ ಅಹಮ್ ಆಗಚ್ಛಾಮಿ", "m": "ನಾಳೆ ನಾನು ಬರುತ್ತೇನೆ", "mod": 7, "parts": [["श्वः", "ನಾಳೆ"], ["अहम्", "ನಾನು"], ["आगच्छामि", "ಬರುತ್ತೇನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 37, "d": "कः समयः?", "k": "ಕಃ ಸಮಯಃ?", "m": "ಸಮಯ ಎಷ್ಟು?", "mod": 7, "parts": [["कः", "ಯಾವ"], ["समयः", "ಸಮಯ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 38, "d": "सूर्यः उदेति।", "k": "ಸೂರ್ಯಃ ಉದೇತಿ", "m": "ಸೂರ್ಯ ಉದಯಿಸುತ್ತಾನೆ", "mod": 7, "parts": [["सूर्यः", "ಸೂರ್ಯ"], ["उदेति", "ಉದಯಿಸುತ್ತಾನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 39, "d": "पुष्पं सुन्दरम् अस्ति।", "k": "ಪುಷ್ಪಂ ಸುನ್ದರಮ್ ಅಸ್ತಿ", "m": "ಹೂವು ಸುಂದರವಾಗಿದೆ", "mod": 7, "parts": [["पुष्पम्", "ಹೂವು"], ["सुन्दरम्", "ಸುಂದರ"], ["अस्ति", "ಇದೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 40, "d": "तत्र वृक्षः अस्ति।", "k": "ತತ್ರ ವೃಕ್ಷಃ ಅಸ್ತಿ", "m": "ಅಲ್ಲಿ ಮರವಿದೆ", "mod": 7, "parts": [["तत्र", "ಅಲ್ಲಿ"], ["वृक्षः", "ಮರ"], ["अस्ति", "ಇದೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 41, "d": "एतत् किम्?", "k": "ಏತತ್ ಕಿಮ್?", "m": "ಇದು ಏನು?", "mod": 9, "parts": [["एतत्", "ಇದು"], ["किम्", "ಏನು"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 42, "d": "एषः कः?", "k": "ಏಷಃ ಕಃ?", "m": "ಇವನು ಯಾರು?", "mod": 9, "parts": [["एषः", "ಇವನು"], ["कः", "ಯಾರು"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 43, "d": "एषा का?", "k": "ಏಷಾ ಕಾ?", "m": "ಇವಳು ಯಾರು?", "mod": 9, "parts": [["एषा", "ಇವಳು"], ["का", "ಯಾರು"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 44, "d": "भवान् कुत्र वसति?", "k": "ಭವಾನ್ ಕುತ್ರ ವಸತಿ?", "m": "ನೀವು ಎಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಿ?", "mod": 9, "parts": [["भवान्", "ನೀವು"], ["कुत्र", "ಎಲ್ಲಿ"], ["वसति", "ವಾಸಿಸುತ್ತೀರಿ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 45, "d": "अहं नगरे वसामि।", "k": "ಅಹಂ ನಗರೇ ವಸಾಮಿ", "m": "ನಾನು ನಗರದಲ್ಲಿ ವಾಸಿಸುತ್ತೇನೆ", "mod": 9, "parts": [["अहम्", "ನಾನು"], ["नगरे", "ನಗರದಲ್ಲಿ"], ["वसामि", "ವಾಸಿಸುತ್ತೇನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 46, "d": "कति पुस्तकानि सन्ति?", "k": "ಕತಿ ಪುಸ್ತಕಾನಿ ಸನ್ತಿ?", "m": "ಎಷ್ಟು ಪುಸ್ತಕಗಳಿವೆ?", "mod": 9, "parts": [["कति", "ಎಷ್ಟು"], ["पुस्तकानि", "ಪುಸ್ತಕಗಳು"], ["सन्ति", "ಇವೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 47, "d": "कृपया आगच्छतु।", "k": "ಕೃಪಯಾ ಆಗಚ್ಛತು", "m": "ದಯವಿಟ್ಟು ಬನ್ನಿ", "mod": 10, "parts": [["कृपया", "ದಯವಿಟ್ಟು"], ["आगच्छतु", "ಬನ್ನಿ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 48, "d": "उपविशतु।", "k": "ಉಪವಿಶತು", "m": "ಕುಳಿತುಕೊಳ್ಳಿ", "mod": 10, "parts": [["उपविशतु", "ಕುಳಿತುಕೊಳ್ಳಿ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 49, "d": "क्षम्यताम्।", "k": "ಕ್ಷಮ್ಯತಾಮ್", "m": "ಕ್ಷಮಿಸಿ", "mod": 10, "parts": [["क्षम्यताम्", "ಕ್ಷಮಿಸಿ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 50, "d": "आम्, अहं जानामि।", "k": "ಆಮ್ ಅಹಂ ಜಾನಾಮಿ", "m": "ಹೌದು, ನನಗೆ ಗೊತ್ತು", "mod": 10, "parts": [["आम्", "ಹೌದು"], ["अहम्", "ನಾನು"], ["जानामि", "ಬಲ್ಲೆ (ಗೊತ್ತು)"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 51, "d": "न, अहं न जानामि।", "k": "ನ ಅಹಂ ನ ಜಾನಾಮಿ", "m": "ಇಲ್ಲ, ನನಗೆ ಗೊತ್ತಿಲ್ಲ", "mod": 10, "parts": [["न", "ಇಲ್ಲ"], ["अहम्", "ನಾನು"], ["न जानामि", "ಗೊತ್ತಿಲ್ಲ (ನ + ಜಾನಾಮಿ)"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 52, "d": "संस्कृतं सह पठामः।", "k": "ಸಂಸ್ಕೃತಂ ಸಹ ಪಠಾಮಃ", "m": "ಸಂಸ್ಕೃತವನ್ನು ಒಟ್ಟಿಗೆ ಓದುತ್ತೇವೆ", "mod": 10, "parts": [["संस्कृतम्", "ಸಂಸ್ಕೃತ"], ["सह", "ಒಟ್ಟಿಗೆ"], ["पठामः", "ಓದುತ್ತೇವೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null}
];

// ಹಂತ 3 — ಸಂವಾದಗಳು. lines = [ಮಾತನಾಡುವವರು, ದೇವನಾಗರಿ, ಕನ್ನಡ ಲಿಪಿ, ಅರ್ಥ]
export const DIALOGUES = [
  {"id": 1, "t": "ಪರಿಚಯ", "lines": [["ಅ", "नमस्ते।", "ನಮಸ್ತೇ", "ನಮಸ್ಕಾರ"], ["ಬ", "नमस्ते। भवतः नाम किम्?", "ನಮಸ್ತೇ. ಭವತಃ ನಾಮ ಕಿಮ್?", "ನಮಸ್ಕಾರ. ನಿಮ್ಮ ಹೆಸರೇನು?"], ["ಅ", "मम नाम रामः अस्ति। भवत्याः नाम किम्?", "ಮಮ ನಾಮ ರಾಮಃ ಅಸ್ತಿ. ಭವತ್ಯಾಃ ನಾಮ ಕಿಮ್?", "ನನ್ನ ಹೆಸರು ರಾಮ. ನಿಮ್ಮ ಹೆಸರೇನು?"], ["ಬ", "मम नाम सीता अस्ति।", "ಮಮ ನಾಮ ಸೀತಾ ಅಸ್ತಿ", "ನನ್ನ ಹೆಸರು ಸೀತಾ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 2, "t": "ಎಲ್ಲಿ ವಾಸ?", "lines": [["ಅ", "भवान् कुत्र वसति?", "ಭವಾನ್ ಕುತ್ರ ವಸತಿ?", "ನೀವು ಎಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಿ?"], ["ಬ", "अहं नगरे वसामि। भवती कुत्र वसति?", "ಅಹಂ ನಗರೇ ವಸಾಮಿ. ಭವತೀ ಕುತ್ರ ವಸತಿ?", "ನಾನು ನಗರದಲ್ಲಿ ವಾಸಿಸುತ್ತೇನೆ. ನೀವು ಎಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಿ?"], ["ಅ", "अहं ग्रामे वसामि।", "ಅಹಂ ಗ್ರಾಮೇ ವಸಾಮಿ", "ನಾನು ಹಳ್ಳಿಯಲ್ಲಿ ವಾಸಿಸುತ್ತೇನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 3, "t": "ಕುಟುಂಬ", "lines": [["ಅ", "एषा का?", "ಏಷಾ ಕಾ?", "ಇವರು ಯಾರು? (ಸ್ತ್ರೀ)"], ["ಬ", "एषा मम माता अस्ति।", "ಏಷಾ ಮಮ ಮಾತಾ ಅಸ್ತಿ", "ಇವರು ನನ್ನ ತಾಯಿ"], ["ಅ", "एषः कः?", "ಏಷಃ ಕಃ?", "ಇವರು ಯಾರು? (ಪುರುಷ)"], ["ಬ", "एषः मम भ्राता अस्ति। सः पठति।", "ಏಷಃ ಮಮ ಭ್ರಾತಾ ಅಸ್ತಿ. ಸಃ ಪಠತಿ", "ಇವನು ನನ್ನ ಸಹೋದರ. ಅವನು ಓದುತ್ತಾನೆ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 4, "t": "ಊಟ", "lines": [["ಅ", "भोजनं सिद्धम् अस्ति।", "ಭೋಜನಂ ಸಿದ್ಧಮ್ ಅಸ್ತಿ", "ಊಟ ಸಿದ್ಧವಾಗಿದೆ"], ["ಬ", "अस्तु। जलम् आनयतु।", "ಅಸ್ತು. ಜಲಮ್ ಆನಯತು", "ಆಗಲಿ. ನೀರು ತನ್ನಿ"], ["ಅ", "एतत् जलम्। दुग्धं पिबतु।", "ಏತತ್ ಜಲಮ್. ದುಗ್ಧಂ ಪಿಬತು", "ಇದು ನೀರು. ಹಾಲು ಕುಡಿಯಿರಿ"], ["ಬ", "धन्यवादः।", "ಧನ್ಯವಾದಃ", "ಧನ್ಯವಾದ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 5, "t": "ಬೀಳ್ಕೊಡುಗೆ", "lines": [["ಅ", "अहं गृहं गच्छामि।", "ಅಹಂ ಗೃಹಂ ಗಚ್ಛಾಮಿ", "ನಾನು ಮನೆಗೆ ಹೋಗುತ್ತೇನೆ"], ["ಬ", "अस्तु। श्वः आगच्छतु।", "ಅಸ್ತು. ಶ್ವಃ ಆಗಚ್ಛತು", "ಆಗಲಿ. ನಾಳೆ ಬನ್ನಿ"], ["ಅ", "आम्। पुनः मिलामः।", "ಆಮ್. ಪುನಃ ಮಿಲಾಮಃ", "ಹೌದು. ಮತ್ತೆ ಸಿಗುತ್ತೇವೆ"], ["ಬ", "शुभं भवतु।", "ಶುಭಂ ಭವತು", "ಒಳ್ಳೆಯದಾಗಲಿ"]], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null}
];

// ಸಪ್ತಾಹದ ಸವಾಲುಗಳು — ವಾರಕ್ಕೊಂದು, ಸರದಿಯಲ್ಲಿ
export const CHALLENGES = [
  "ಈ ವಾರ ಮನೆಯಲ್ಲಿ ಎಲ್ಲರಿಗೂ 'ನಮಸ್ತೇ' ಎಂದು ಹೇಳಿ.",
  "ಕಲಿತ ಐದು ಪದಗಳನ್ನು ಒಬ್ಬರಿಗೆ ಕಲಿಸಿ.",
  "ದಿನಕ್ಕೊಮ್ಮೆ 'ಧನ್ಯವಾದಃ' ಎಂದು ಸಂಸ್ಕೃತದಲ್ಲೇ ಹೇಳಿ.",
  "'ಅಹಂ ಸಂಸ್ಕೃತಂ ಪಠಾಮಿ' ಎಂದು ಒಬ್ಬರಿಗೆ ಹೇಳಿ.",
  "ಮನೆಯ ಐದು ವಸ್ತುಗಳ ಸಂಸ್ಕೃತ ಹೆಸರನ್ನು ನೆನಪಿಸಿಕೊಳ್ಳಿ.",
  "ಕುಟುಂಬದವರ ಸಂಬಂಧಗಳನ್ನು ಸಂಸ್ಕೃತದಲ್ಲಿ ಹೇಳಿ.",
  "ಊಟದ ಸಮಯದಲ್ಲಿ 'ಜಲಮ್ ಆನಯತು' ಎಂದು ಕೇಳಿ.",
  "ಒಂದರಿಂದ ಹತ್ತರವರೆಗೆ ಸಂಸ್ಕೃತದಲ್ಲಿ ದಿನಕ್ಕೊಮ್ಮೆ ಎಣಿಸಿ.",
  "ಮನೆಗೆ ಯಾರಾದರೂ ಬಂದಾಗ 'ಸುಸ್ವಾಗತಮ್' ಎಂದು ಸ್ವಾಗತಿಸಿ.",
  "ಬೀಳ್ಕೊಡುವಾಗ 'ಪುನಃ ಮಿಲಾಮಃ' ಎಂದು ಹೇಳಿ.",
  "ದೇಹದ ಐದು ಅಂಗಗಳನ್ನು ತೋರಿಸುತ್ತಾ ಅವುಗಳ ಸಂಸ್ಕೃತ ಹೆಸರು ಹೇಳಿ.",
  "ಒಂದು ಸಂವಾದವನ್ನು ಮನೆಯವರೊಬ್ಬರ ಜೊತೆ ಅಭಿನಯಿಸಿ."
];

