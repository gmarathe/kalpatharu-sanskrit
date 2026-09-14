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
  "ಒಂದು ಸಂವಾದವನ್ನು ಮನೆಯವರೊಬ್ಬರ ಜೊತೆ ಅಭಿನಯಿಸಿ.",
  "ಒಂದು ಸುಭಾಷಿತವನ್ನು ಕಂಠಪಾಠ ಮಾಡಿ, ಮನೆಯವರಿಗೆ ಅರ್ಥ ಹೇಳಿ.",
  "ಹಂತ 6 ರ ಒಂದು ವಾಚನವನ್ನು ಗಟ್ಟಿಯಾಗಿ ಓದಿ."
];

/* ═══════════════════════════════════════════════════════════════
   ಹಂತ 4 — ಸರಳವ್ಯಾಕರಣಮ್
   intro = ಕನ್ನಡ ವಿವರಣೆ (ಪ್ಯಾರಾಗಳು)
   rows  = [ಗುರುತು, ದೇವನಾಗರಿ, ಕನ್ನಡ ಲಿಪಿ, ಅರ್ಥ]
   qs    = ಪ್ರಶ್ನೆಗಳು: q = ದೇವನಾಗರಿ (___ ಖಾಲಿ), k = ಕನ್ನಡ ಲಿಪಿ,
           h = ಸುಳಿವು/ಅರ್ಥ, o = ಆಯ್ಕೆಗಳು [ದೇವನಾಗರಿ, ಕನ್ನಡ] — ಮೊದಲನೆಯದೇ ಸರಿ
   ═══════════════════════════════════════════════════════════════ */
export const GRAMMAR = [
  {"id": 1, "t": "ಕ್ರಿಯಾಪದ — ನಾನು, ನೀನು, ಅವನು", "d": "क्रियापदम् — एकवचनम्",
    "intro": ["ಸಂಸ್ಕೃತದಲ್ಲಿ ಕ್ರಿಯಾಪದದ ಕೊನೆಯ ಅಕ್ಷರವೇ 'ಯಾರು ಮಾಡುತ್ತಾರೆ' ಎಂದು ಹೇಳುತ್ತದೆ. -ಮಿ = ನಾನು, -ಸಿ = ನೀನು, -ತಿ = ಅವನು / ಅವಳು / ಅದು.", "ಹಾಗಾಗಿ 'ಅಹಂ' ಹೇಳದಿದ್ದರೂ 'ಪಠಾಮಿ' ಎಂದರೆ 'ನಾನು ಓದುತ್ತೇನೆ' ಎಂದೇ ಅರ್ಥ. ಭವಾನ್ / ಭವತೀ (ನೀವು, ಗೌರವ) ಜೊತೆ -ತಿ ರೂಪವೇ ಬರುತ್ತದೆ."],
    "rows": [["ನಾನು", "अहं पठामि", "ಅಹಂ ಪಠಾಮಿ", "ನಾನು ಓದುತ್ತೇನೆ"], ["ನೀನು", "त्वं पठसि", "ತ್ವಂ ಪಠಸಿ", "ನೀನು ಓದುತ್ತೀಯೆ"], ["ಅವನು", "सः पठति", "ಸಃ ಪಠತಿ", "ಅವನು ಓದುತ್ತಾನೆ"], ["ಅವಳು", "सा पठति", "ಸಾ ಪಠತಿ", "ಅವಳು ಓದುತ್ತಾಳೆ"], ["ನೀವು (ಗೌರವ)", "भवान् पठति", "ಭವಾನ್ ಪಠತಿ", "ನೀವು ಓದುತ್ತೀರಿ"], ["ನಾನು", "अहं गच्छामि", "ಅಹಂ ಗಚ್ಛಾಮಿ", "ನಾನು ಹೋಗುತ್ತೇನೆ"], ["ನೀನು", "त्वं गच्छसि", "ತ್ವಂ ಗಚ್ಛಸಿ", "ನೀನು ಹೋಗುತ್ತೀಯೆ"], ["ಅವನು", "सः गच्छति", "ಸಃ ಗಚ್ಛತಿ", "ಅವನು ಹೋಗುತ್ತಾನೆ"], ["ನಾನು", "अहं खादामि", "ಅಹಂ ಖಾದಾಮಿ", "ನಾನು ತಿನ್ನುತ್ತೇನೆ"], ["ಅವಳು", "सा खादति", "ಸಾ ಖಾದತಿ", "ಅವಳು ತಿನ್ನುತ್ತಾಳೆ"]],
    "tip": "ಕನ್ನಡದಲ್ಲೂ ಹೀಗೆಯೇ: ಓದುತ್ತ-ೇನೆ, ಓದುತ್ತ-ೀಯೆ, ಓದುತ್ತ-ಾನೆ. ಕೊನೆಯ ಭಾಗ ಬದಲಾದರೆ ಕರ್ತೃ ಬದಲಾಗುತ್ತಾನೆ.",
    "qs": [
      {"q": "अहं पुस्तकं ___ ।", "k": "ಅಹಂ ಪುಸ್ತಕಂ ___", "h": "ನಾನು ಪುಸ್ತಕ ಓದುತ್ತೇನೆ", "o": [["पठामि", "ಪಠಾಮಿ"], ["पठसि", "ಪಠಸಿ"], ["पठति", "ಪಠತಿ"]]},
      {"q": "त्वं गृहं ___ ।", "k": "ತ್ವಂ ಗೃಹಂ ___", "h": "ನೀನು ಮನೆಗೆ ಹೋಗುತ್ತೀಯೆ", "o": [["गच्छसि", "ಗಚ್ಛಸಿ"], ["गच्छामि", "ಗಚ್ಛಾಮಿ"], ["गच्छति", "ಗಚ್ಛತಿ"]]},
      {"q": "सः पत्रं ___ ।", "k": "ಸಃ ಪತ್ರಂ ___", "h": "ಅವನು ಪತ್ರ ಬರೆಯುತ್ತಾನೆ", "o": [["लिखति", "ಲಿಖತಿ"], ["लिखामि", "ಲಿಖಾಮಿ"], ["लिखसि", "ಲಿಖಸಿ"]]},
      {"q": "भवान् किं ___ ?", "k": "ಭವಾನ್ ಕಿಂ ___ ?", "h": "ನೀವು ಏನು ಮಾಡುತ್ತೀರಿ?", "o": [["करोति", "ಕರೋತಿ"], ["करोमि", "ಕರೋಮಿ"], ["करोषि", "ಕರೋಷಿ"]]},
      {"q": "सा जलं ___ ।", "k": "ಸಾ ಜಲಂ ___", "h": "ಅವಳು ನೀರು ಕುಡಿಯುತ್ತಾಳೆ", "o": [["पिबति", "ಪಿಬತಿ"], ["पिबामि", "ಪಿಬಾಮಿ"], ["पिबसि", "ಪಿಬಸಿ"]]}
    ], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},

  {"id": 2, "t": "ಕ್ರಿಯಾಪದ — ನಾವು, ನೀವು, ಅವರು", "d": "क्रियापदम् — बहुवचनम्",
    "intro": ["ಅನೇಕರು ಮಾಡಿದರೆ ಕ್ರಿಯಾಪದದ ಕೊನೆ ಬದಲಾಗುತ್ತದೆ. -ಮಃ = ನಾವು, -ಥ = ನೀವು (ಅನೇಕರು), -ನ್ತಿ = ಅವರು.", "ಸಂಸ್ಕೃತದಲ್ಲಿ ಇಬ್ಬರಿಗೆ ಬೇರೆಯೇ ರೂಪ (ದ್ವಿವಚನ) ಇದೆ: पठावः, पठथः, पठतः. ಈಗ ಪರಿಚಯ ಸಾಕು; ಏಕವಚನ ಮತ್ತು ಬಹುವಚನ ಕಲಿಯೋಣ."],
    "rows": [["ನಾವು", "वयं पठामः", "ವಯಂ ಪಠಾಮಃ", "ನಾವು ಓದುತ್ತೇವೆ"], ["ನೀವು (ಅನೇಕರು)", "यूयं पठथ", "ಯೂಯಂ ಪಠಥ", "ನೀವು ಓದುತ್ತೀರಿ"], ["ಅವರು", "ते पठन्ति", "ತೇ ಪಠನ್ತಿ", "ಅವರು ಓದುತ್ತಾರೆ"], ["ಅವರು (ಸ್ತ್ರೀ.)", "ताः पठन्ति", "ತಾಃ ಪಠನ್ತಿ", "ಅವರು ಓದುತ್ತಾರೆ"], ["ಹುಡುಗರು", "बालकाः गच्छन्ति", "ಬಾಲಕಾಃ ಗಚ್ಛನ್ತಿ", "ಹುಡುಗರು ಹೋಗುತ್ತಾರೆ"], ["ನಾವು", "वयं खादामः", "ವಯಂ ಖಾದಾಮಃ", "ನಾವು ತಿನ್ನುತ್ತೇವೆ"], ["ಅವರು", "ते वदन्ति", "ತೇ ವದನ್ತಿ", "ಅವರು ಮಾತನಾಡುತ್ತಾರೆ"], ["ಇಬ್ಬರು (ದ್ವಿವಚನ)", "बालकौ पठतः", "ಬಾಲಕೌ ಪಠತಃ", "ಇಬ್ಬರು ಹುಡುಗರು ಓದುತ್ತಾರೆ"]],
    "tip": "ಒಬ್ಬರು → -ತಿ, ಅನೇಕರು → -ನ್ತಿ. ಪಠತಿ / ಪಠನ್ತಿ, ಗಚ್ಛತಿ / ಗಚ್ಛನ್ತಿ.",
    "qs": [
      {"q": "वयं संस्कृतं ___ ।", "k": "ವಯಂ ಸಂಸ್ಕೃತಂ ___", "h": "ನಾವು ಸಂಸ್ಕೃತ ಓದುತ್ತೇವೆ", "o": [["पठामः", "ಪಠಾಮಃ"], ["पठामि", "ಪಠಾಮಿ"], ["पठन्ति", "ಪಠನ್ತಿ"]]},
      {"q": "ते गृहं ___ ।", "k": "ತೇ ಗೃಹಂ ___", "h": "ಅವರು ಮನೆಗೆ ಹೋಗುತ್ತಾರೆ", "o": [["गच्छन्ति", "ಗಚ್ಛನ್ತಿ"], ["गच्छति", "ಗಚ್ಛತಿ"], ["गच्छामः", "ಗಚ್ಛಾಮಃ"]]},
      {"q": "बालकाः फलानि ___ ।", "k": "ಬಾಲಕಾಃ ಫಲಾನಿ ___", "h": "ಹುಡುಗರು ಹಣ್ಣುಗಳನ್ನು ತಿನ್ನುತ್ತಾರೆ", "o": [["खादन्ति", "ಖಾದನ್ತಿ"], ["खादति", "ಖಾದತಿ"], ["खादामि", "ಖಾದಾಮಿ"]]},
      {"q": "यूयं किं ___ ?", "k": "ಯೂಯಂ ಕಿಂ ___ ?", "h": "ನೀವು (ಅನೇಕರು) ಏನು ಓದುತ್ತೀರಿ?", "o": [["पठथ", "ಪಠಥ"], ["पठसि", "ಪಠಸಿ"], ["पठामः", "ಪಠಾಮಃ"]]},
      {"q": "वयं सह ___ ।", "k": "ವಯಂ ಸಹ ___", "h": "ನಾವು ಒಟ್ಟಿಗೆ ಮಾತನಾಡುತ್ತೇವೆ", "o": [["वदामः", "ವದಾಮಃ"], ["वदामि", "ವದಾಮಿ"], ["वदन्ति", "ವದನ್ತಿ"]]}
    ], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},

  {"id": 3, "t": "ಲಿಂಗ — ಪುಲ್ಲಿಂಗ, ಸ್ತ್ರೀಲಿಂಗ, ನಪುಂಸಕಲಿಂಗ", "d": "लिङ्गम्",
    "intro": ["ಸಂಸ್ಕೃತದ ಪ್ರತಿ ನಾಮಪದಕ್ಕೂ ಒಂದು ಲಿಂಗ ಇದೆ. ಪದದ ಕೊನೆ ನೋಡಿದರೆ ಹೆಚ್ಚಾಗಿ ಗೊತ್ತಾಗುತ್ತದೆ: -ಃ ಪುಲ್ಲಿಂಗ, -ಆ / -ಈ ಸ್ತ್ರೀಲಿಂಗ, -ಮ್ ನಪುಂಸಕಲಿಂಗ.", "ಲಿಂಗ ವ್ಯಾಕರಣದ್ದು, ಸ್ವಾಭಾವಿಕವಲ್ಲ. ನದೀ ಸ್ತ್ರೀಲಿಂಗ, ವೃಕ್ಷಃ ಪುಲ್ಲಿಂಗ, ಮಿತ್ರಮ್ (ಸ್ನೇಹಿತ) ನಪುಂಸಕಲಿಂಗ! ಸರ್ವನಾಮ (ಇವನು / ಇವಳು / ಇದು) ಲಿಂಗಕ್ಕೆ ಹೊಂದಬೇಕು."],
    "rows": [["ಪುಲ್ಲಿಂಗ (-ಃ)", "बालकः · रामः · वृक्षः", "ಬಾಲಕಃ · ರಾಮಃ · ವೃಕ್ಷಃ", "ಹುಡುಗ · ರಾಮ · ಮರ"], ["ಸ್ತ್ರೀಲಿಂಗ (-ಆ, -ಈ)", "बालिका · सीता · नदी", "ಬಾಲಿಕಾ · ಸೀತಾ · ನದೀ", "ಹುಡುಗಿ · ಸೀತೆ · ನದಿ"], ["ನಪುಂಸಕಲಿಂಗ (-ಮ್)", "फलम् · गृहम् · मित्रम्", "ಫಲಮ್ · ಗೃಹಮ್ · ಮಿತ್ರಮ್", "ಹಣ್ಣು · ಮನೆ · ಸ್ನೇಹಿತ"], ["ಇವನು / ಇವಳು / ಇದು", "एषः · एषा · एतत्", "ಏಷಃ · ಏಷಾ · ಏತತ್", "ಇವನು · ಇವಳು · ಇದು"], ["ಅವನು / ಅವಳು / ಅದು", "सः · सा · तत्", "ಸಃ · ಸಾ · ತತ್", "ಅವನು · ಅವಳು · ಅದು"], ["ವಾಕ್ಯ", "एषः बालकः अस्ति।", "ಏಷಃ ಬಾಲಕಃ ಅಸ್ತಿ", "ಇವನು ಹುಡುಗ"], ["ವಾಕ್ಯ", "एषा बालिका अस्ति।", "ಏಷಾ ಬಾಲಿಕಾ ಅಸ್ತಿ", "ಇವಳು ಹುಡುಗಿ"], ["ವಾಕ್ಯ", "एतत् फलम् अस्ति।", "ಏತತ್ ಫಲಮ್ ಅಸ್ತಿ", "ಇದು ಹಣ್ಣು"]],
    "tip": "ಸುಲಭ ಸೂತ್ರ: ಃ → ಪು., ಆ / ಈ → ಸ್ತ್ರೀ., ಮ್ → ನ. ಅಪವಾದಗಳು ಇವೆ (ಉದಾ: ಪಿತಾ ಪುಲ್ಲಿಂಗ), ಆದರೆ ಆರಂಭಕ್ಕೆ ಇದು ಸಾಕು.",
    "qs": [
      {"q": "___ बालकः अस्ति।", "k": "___ ಬಾಲಕಃ ಅಸ್ತಿ", "h": "ಇವನು ಹುಡುಗ", "o": [["एषः", "ಏಷಃ"], ["एषा", "ಏಷಾ"], ["एतत्", "ಏತತ್"]]},
      {"q": "___ बालिका अस्ति।", "k": "___ ಬಾಲಿಕಾ ಅಸ್ತಿ", "h": "ಇವಳು ಹುಡುಗಿ", "o": [["एषा", "ಏಷಾ"], ["एषः", "ಏಷಃ"], ["एतत्", "ಏತತ್"]]},
      {"q": "___ पुस्तकम् अस्ति।", "k": "___ ಪುಸ್ತಕಮ್ ಅಸ್ತಿ", "h": "ಇದು ಪುಸ್ತಕ", "o": [["एतत्", "ಏತತ್"], ["एषः", "ಏಷಃ"], ["एषा", "ಏಷಾ"]]},
      {"q": "___ फलं खादति।", "k": "___ ಫಲಂ ಖಾದತಿ", "h": "ಅವಳು ಹಣ್ಣು ತಿನ್ನುತ್ತಾಳೆ", "o": [["सा", "ಸಾ"], ["सः", "ಸಃ"], ["तत्", "ತತ್"]]},
      {"q": "मित्रम् — ಯಾವ ಲಿಂಗ?", "k": "ಮಿತ್ರಮ್ — ಯಾವ ಲಿಂಗ?", "h": "ಕೊನೆ ನೋಡಿ: -ಮ್", "o": [["नपुंसकलिङ्गम्", "ನಪುಂಸಕಲಿಂಗ"], ["पुल्लिङ्गम्", "ಪುಲ್ಲಿಂಗ"], ["स्त्रीलिङ्गम्", "ಸ್ತ್ರೀಲಿಂಗ"]]}
    ], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},

  {"id": 4, "t": "ವಚನ — ಒಂದು, ಎರಡು, ಅನೇಕ", "d": "वचनम्",
    "intro": ["ಕನ್ನಡದಲ್ಲಿ ಏಕವಚನ, ಬಹುವಚನ ಎರಡೇ. ಸಂಸ್ಕೃತದಲ್ಲಿ ಮೂರು: ಏಕವಚನ (ಒಂದು), ದ್ವಿವಚನ (ಎರಡು), ಬಹುವಚನ (ಮೂರು ಅಥವಾ ಹೆಚ್ಚು).", "ನಾಮಪದದ ಕೊನೆ ಬದಲಾಗುತ್ತದೆ, ಕ್ರಿಯಾಪದವೂ ಅದಕ್ಕೆ ಹೊಂದಿಕೊಳ್ಳುತ್ತದೆ."],
    "rows": [["ಒಂದು (ಪು.)", "बालकः", "ಬಾಲಕಃ", "ಒಬ್ಬ ಹುಡುಗ"], ["ಎರಡು", "बालकौ", "ಬಾಲಕೌ", "ಇಬ್ಬರು ಹುಡುಗರು"], ["ಅನೇಕ", "बालकाः", "ಬಾಲಕಾಃ", "ಹುಡುಗರು"], ["ಒಂದು (ನ.)", "फलम्", "ಫಲಮ್", "ಒಂದು ಹಣ್ಣು"], ["ಎರಡು", "फले", "ಫಲೇ", "ಎರಡು ಹಣ್ಣುಗಳು"], ["ಅನೇಕ", "फलानि", "ಫಲಾನಿ", "ಹಣ್ಣುಗಳು"], ["ಒಂದು (ಸ್ತ್ರೀ.)", "बालिका", "ಬಾಲಿಕಾ", "ಒಬ್ಬ ಹುಡುಗಿ"], ["ಎರಡು", "बालिके", "ಬಾಲಿಕೇ", "ಇಬ್ಬರು ಹುಡುಗಿಯರು"], ["ಅನೇಕ", "बालिकाः", "ಬಾಲಿಕಾಃ", "ಹುಡುಗಿಯರು"], ["ವಾಕ್ಯ", "बालकः पठति।", "ಬಾಲಕಃ ಪಠತಿ", "ಹುಡುಗ ಓದುತ್ತಾನೆ"], ["ವಾಕ್ಯ", "बालकौ पठतः।", "ಬಾಲಕೌ ಪಠತಃ", "ಇಬ್ಬರು ಹುಡುಗರು ಓದುತ್ತಾರೆ"], ["ವಾಕ್ಯ", "बालकाः पठन्ति।", "ಬಾಲಕಾಃ ಪಠನ್ತಿ", "ಹುಡುಗರು ಓದುತ್ತಾರೆ"]],
    "tip": "ಃ → ಔ → ಆಃ (ಪುಲ್ಲಿಂಗ); ಮ್ → ಏ → ಆನಿ (ನಪುಂಸಕ); ಆ → ಏ → ಆಃ (ಸ್ತ್ರೀಲಿಂಗ).",
    "qs": [
      {"q": "द्वौ ___ पठतः।", "k": "ದ್ವೌ ___ ಪಠತಃ", "h": "ಇಬ್ಬರು ಹುಡುಗರು ಓದುತ್ತಾರೆ (बालकः)", "o": [["बालकौ", "ಬಾಲಕೌ"], ["बालकः", "ಬಾಲಕಃ"], ["बालकाः", "ಬಾಲಕಾಃ"]]},
      {"q": "कति ___ सन्ति?", "k": "ಕತಿ ___ ಸನ್ತಿ?", "h": "ಎಷ್ಟು ಪುಸ್ತಕಗಳಿವೆ? (पुस्तकम्)", "o": [["पुस्तकानि", "ಪುಸ್ತಕಾನಿ"], ["पुस्तकम्", "ಪುಸ್ತಕಮ್"], ["पुस्तके", "ಪುಸ್ತಕೇ"]]},
      {"q": "एका ___ गच्छति।", "k": "ಏಕಾ ___ ಗಚ್ಛತಿ", "h": "ಒಬ್ಬ ಹುಡುಗಿ ಹೋಗುತ್ತಾಳೆ", "o": [["बालिका", "ಬಾಲಿಕಾ"], ["बालिके", "ಬಾಲಿಕೇ"], ["बालिकाः", "ಬಾಲಿಕಾಃ"]]},
      {"q": "त्रीणि ___ सन्ति।", "k": "ತ್ರೀಣಿ ___ ಸನ್ತಿ", "h": "ಮೂರು ಹಣ್ಣುಗಳಿವೆ (फलम्)", "o": [["फलानि", "ಫಲಾನಿ"], ["फले", "ಫಲೇ"], ["फलम्", "ಫಲಮ್"]]},
      {"q": "बालिकाः ___ ।", "k": "ಬಾಲಿಕಾಃ ___", "h": "ಹುಡುಗಿಯರು ಹೋಗುತ್ತಾರೆ", "o": [["गच्छन्ति", "ಗಚ್ಛನ್ತಿ"], ["गच्छति", "ಗಚ್ಛತಿ"], ["गच्छतः", "ಗಚ್ಛತಃ"]]}
    ], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},

  {"id": 5, "t": "ಕರ್ಮ — 'ಅನ್ನು' (ದ್ವಿತೀಯಾ ವಿಭಕ್ತಿ)", "d": "द्वितीया विभक्तिः",
    "intro": ["ಕ್ರಿಯೆ ಯಾವುದರ ಮೇಲೆ ನಡೆಯುತ್ತದೋ ಅದು ಕರ್ಮ. ಕನ್ನಡದಲ್ಲಿ '-ಅನ್ನು' ಸೇರಿಸುತ್ತೇವೆ (ಹಣ್ಣನ್ನು, ರಾಮನನ್ನು). ಸಂಸ್ಕೃತದಲ್ಲಿ ಪದದ ಕೊನೆ -ಮ್ ಆಗುತ್ತದೆ.", "ರಾಮಃ → ರಾಮಮ್; ಬಾಲಿಕಾ → ಬಾಲಿಕಾಮ್; ನದೀ → ನದೀಮ್. ನಪುಂಸಕಲಿಂಗ ಪದ (ಫಲಮ್) ಬದಲಾಗುವುದಿಲ್ಲ. 'ಎಲ್ಲಿಗೆ ಹೋಗುವುದು' ಎಂಬ ಸ್ಥಳಕ್ಕೂ ಇದೇ ರೂಪ: ಗೃಹಂ ಗಚ್ಛಾಮಿ."],
    "rows": [["ಪುಲ್ಲಿಂಗ", "रामः → रामम्", "ರಾಮಃ → ರಾಮಮ್", "ರಾಮ → ರಾಮನನ್ನು"], ["ಸ್ತ್ರೀಲಿಂಗ (-ಆ)", "बालिका → बालिकाम्", "ಬಾಲಿಕಾ → ಬಾಲಿಕಾಮ್", "ಹುಡುಗಿ → ಹುಡುಗಿಯನ್ನು"], ["ಸ್ತ್ರೀಲಿಂಗ (-ಈ)", "नदी → नदीम्", "ನದೀ → ನದೀಮ್", "ನದಿ → ನದಿಯನ್ನು"], ["ನಪುಂಸಕ", "फलम् → फलम्", "ಫಲಮ್ → ಫಲಮ್", "ಹಣ್ಣು → ಹಣ್ಣನ್ನು (ಬದಲಾಗದು)"], ["ವಾಕ್ಯ", "रामः फलं खादति।", "ರಾಮಃ ಫಲಂ ಖಾದತಿ", "ರಾಮ ಹಣ್ಣನ್ನು ತಿನ್ನುತ್ತಾನೆ"], ["ವಾಕ್ಯ", "सीता रामं पश्यति।", "ಸೀತಾ ರಾಮಂ ಪಶ್ಯತಿ", "ಸೀತೆ ರಾಮನನ್ನು ನೋಡುತ್ತಾಳೆ"], ["ವಾಕ್ಯ", "अहं नदीं पश्यामि।", "ಅಹಂ ನದೀಂ ಪಶ್ಯಾಮಿ", "ನಾನು ನದಿಯನ್ನು ನೋಡುತ್ತೇನೆ"], ["ವಾಕ್ಯ (ಎಲ್ಲಿಗೆ)", "सः गृहं गच्छति।", "ಸಃ ಗೃಹಂ ಗಚ್ಛತಿ", "ಅವನು ಮನೆಗೆ ಹೋಗುತ್ತಾನೆ"]],
    "tip": "ಮುಂದಿನ ಪದ ವ್ಯಂಜನದಿಂದ ಆರಂಭವಾದರೆ -ಮ್ ಅನ್ನು -ಂ ಎಂದು ಬರೆಯುತ್ತೇವೆ: ರಾಮಂ ಪಶ್ಯತಿ.",
    "qs": [
      {"q": "अहं ___ पठामि।", "k": "ಅಹಂ ___ ಪಠಾಮಿ", "h": "ನಾನು ಪುಸ್ತಕವನ್ನು ಓದುತ್ತೇನೆ (पुस्तकम्)", "o": [["पुस्तकं", "ಪುಸ್ತಕಂ"], ["पुस्तकः", "ಪುಸ್ತಕಃ"], ["पुस्तके", "ಪುಸ್ತಕೇ"]]},
      {"q": "सः ___ पश्यति।", "k": "ಸಃ ___ ಪಶ್ಯತಿ", "h": "ಅವನು ಹುಡುಗನನ್ನು ನೋಡುತ್ತಾನೆ (बालकः)", "o": [["बालकं", "ಬಾಲಕಂ"], ["बालकः", "ಬಾಲಕಃ"], ["बालकाः", "ಬಾಲಕಾಃ"]]},
      {"q": "सा ___ पश्यति।", "k": "ಸಾ ___ ಪಶ್ಯತಿ", "h": "ಅವಳು ನದಿಯನ್ನು ನೋಡುತ್ತಾಳೆ (नदी)", "o": [["नदीं", "ನದೀಂ"], ["नदी", "ನದೀ"], ["नद्याम्", "ನದ್ಯಾಮ್"]]},
      {"q": "ते ___ गच्छन्ति।", "k": "ತೇ ___ ಗಚ್ಛನ್ತಿ", "h": "ಅವರು ಹಳ್ಳಿಗೆ ಹೋಗುತ್ತಾರೆ (ग्रामः)", "o": [["ग्रामं", "ಗ್ರಾಮಂ"], ["ग्रामः", "ಗ್ರಾಮಃ"], ["ग्रामे", "ಗ್ರಾಮೇ"]]},
      {"q": "अहं ___ पश्यामि।", "k": "ಅಹಂ ___ ಪಶ್ಯಾಮಿ", "h": "ನಾನು ಹುಡುಗಿಯನ್ನು ನೋಡುತ್ತೇನೆ (बालिका)", "o": [["बालिकां", "ಬಾಲಿಕಾಂ"], ["बालिका", "ಬಾಲಿಕಾ"], ["बालिकाः", "ಬಾಲಿಕಾಃ"]]}
    ], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},

  {"id": 6, "t": "ಸ್ಥಳ — 'ಅಲ್ಲಿ' (ಸಪ್ತಮೀ ವಿಭಕ್ತಿ)", "d": "सप्तमी विभक्तिः",
    "intro": ["'ಎಲ್ಲಿ' ಎಂಬುದಕ್ಕೆ ಕನ್ನಡದಲ್ಲಿ '-ಅಲ್ಲಿ' (ಮನೆಯಲ್ಲಿ, ಹಳ್ಳಿಯಲ್ಲಿ). ಸಂಸ್ಕೃತದಲ್ಲಿ ಪುಲ್ಲಿಂಗ ಮತ್ತು ನಪುಂಸಕ ಪದಗಳ ಕೊನೆ -ಏ ಆಗುತ್ತದೆ: ಗೃಹಮ್ → ಗೃಹೇ, ಗ್ರಾಮಃ → ಗ್ರಾಮೇ.", "ಸ್ತ್ರೀಲಿಂಗದಲ್ಲಿ -ಆಯಾಮ್ / -ಯಾಮ್: ಬಾಲಿಕಾಯಾಮ್, ನದ್ಯಾಮ್."],
    "rows": [["ಪುಲ್ಲಿಂಗ", "ग्रामः → ग्रामे", "ಗ್ರಾಮಃ → ಗ್ರಾಮೇ", "ಹಳ್ಳಿ → ಹಳ್ಳಿಯಲ್ಲಿ"], ["ನಪುಂಸಕ", "गृहम् → गृहे", "ಗೃಹಮ್ → ಗೃಹೇ", "ಮನೆ → ಮನೆಯಲ್ಲಿ"], ["ಸ್ತ್ರೀಲಿಂಗ (-ಆ)", "बालिका → बालिकायाम्", "ಬಾಲಿಕಾ → ಬಾಲಿಕಾಯಾಮ್", "ಹುಡುಗಿ → ಹುಡುಗಿಯಲ್ಲಿ"], ["ಸ್ತ್ರೀಲಿಂಗ (-ಈ)", "नदी → नद्याम्", "ನದೀ → ನದ್ಯಾಮ್", "ನದಿ → ನದಿಯಲ್ಲಿ"], ["ವಾಕ್ಯ", "अहं ग्रामे वसामि।", "ಅಹಂ ಗ್ರಾಮೇ ವಸಾಮಿ", "ನಾನು ಹಳ್ಳಿಯಲ್ಲಿ ವಾಸಿಸುತ್ತೇನೆ"], ["ವಾಕ್ಯ", "पुस्तकं गृहे अस्ति।", "ಪುಸ್ತಕಂ ಗೃಹೇ ಅಸ್ತಿ", "ಪುಸ್ತಕ ಮನೆಯಲ್ಲಿದೆ"], ["ವಾಕ್ಯ", "जलं पात्रे अस्ति।", "ಜಲಂ ಪಾತ್ರೇ ಅಸ್ತಿ", "ನೀರು ಪಾತ್ರೆಯಲ್ಲಿದೆ"], ["ವಾಕ್ಯ", "खगः वृक्षे अस्ति।", "ಖಗಃ ವೃಕ್ಷೇ ಅಸ್ತಿ", "ಹಕ್ಕಿ ಮರದಲ್ಲಿದೆ"], ["ವಾಕ್ಯ", "मत्स्याः नद्यां सन्ति।", "ಮತ್ಸ್ಯಾಃ ನದ್ಯಾಂ ಸನ್ತಿ", "ಮೀನುಗಳು ನದಿಯಲ್ಲಿವೆ"]],
    "tip": "ಸಮಯಕ್ಕೂ ಇದೇ ರೂಪ: ಪ್ರಾತಃಕಾಲೇ (ಬೆಳಗಿನಲ್ಲಿ), ಮಧ್ಯಾಹ್ನೇ (ಮಧ್ಯಾಹ್ನದಲ್ಲಿ).",
    "qs": [
      {"q": "अहं ___ वसामि।", "k": "ಅಹಂ ___ ವಸಾಮಿ", "h": "ನಾನು ನಗರದಲ್ಲಿ ವಾಸಿಸುತ್ತೇನೆ (नगरम्)", "o": [["नगरे", "ನಗರೇ"], ["नगरं", "ನಗರಂ"], ["नगरस्य", "ನಗರಸ್ಯ"]]},
      {"q": "सः ___ पठति।", "k": "ಸಃ ___ ಪಠತಿ", "h": "ಅವನು ಶಾಲೆಯಲ್ಲಿ ಓದುತ್ತಾನೆ (विद्यालयः)", "o": [["विद्यालये", "ವಿದ್ಯಾಲಯೇ"], ["विद्यालयं", "ವಿದ್ಯಾಲಯಂ"], ["विद्यालयः", "ವಿದ್ಯಾಲಯಃ"]]},
      {"q": "पुष्पं ___ अस्ति।", "k": "ಪುಷ್ಪಂ ___ ಅಸ್ತಿ", "h": "ಹೂವು ಮರದಲ್ಲಿದೆ (वृक्षः)", "o": [["वृक्षे", "ವೃಕ್ಷೇ"], ["वृक्षं", "ವೃಕ್ಷಂ"], ["वृक्षाः", "ವೃಕ್ಷಾಃ"]]},
      {"q": "जलं ___ अस्ति।", "k": "ಜಲಂ ___ ಅಸ್ತಿ", "h": "ನೀರು ನದಿಯಲ್ಲಿದೆ (नदी)", "o": [["नद्याम्", "ನದ್ಯಾಮ್"], ["नदीम्", "ನದೀಮ್"], ["नदी", "ನದೀ"]]},
      {"q": "दीपः ___ अस्ति।", "k": "ದೀಪಃ ___ ಅಸ್ತಿ", "h": "ದೀಪ ಮನೆಯಲ್ಲಿದೆ (गृहम्)", "o": [["गृहे", "ಗೃಹೇ"], ["गृहं", "ಗೃಹಂ"], ["गृहस्य", "ಗೃಹಸ್ಯ"]]}
    ], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},

  {"id": 7, "t": "ಸಂಬಂಧ — 'ನನ್ನ, ನಿನ್ನ, ಅವನ' (ಷಷ್ಠೀ ವಿಭಕ್ತಿ)", "d": "षष्ठी विभक्तिः",
    "intro": ["'ಯಾರದು' ಎಂಬುದಕ್ಕೆ ಷಷ್ಠೀ ವಿಭಕ್ತಿ. ಸರ್ವನಾಮಗಳ ರೂಪ ನೆನಪಿಡಿ: ಮಮ (ನನ್ನ), ತವ (ನಿನ್ನ), ತಸ್ಯ (ಅವನ), ತಸ್ಯಾಃ (ಅವಳ), ಭವತಃ / ಭವತ್ಯಾಃ (ನಿಮ್ಮ).", "ನಾಮಪದಗಳಲ್ಲಿ: ಪುಲ್ಲಿಂಗ ಮತ್ತು ನಪುಂಸಕ -ಸ್ಯ (ರಾಮಸ್ಯ, ಗೃಹಸ್ಯ); ಸ್ತ್ರೀಲಿಂಗ -ಆಯಾಃ (ಸೀತಾಯಾಃ)."],
    "rows": [["ನನ್ನ", "मम", "ಮಮ", "ನನ್ನ"], ["ನಿನ್ನ", "तव", "ತವ", "ನಿನ್ನ"], ["ನಿಮ್ಮ (ಪು.)", "भवतः", "ಭವತಃ", "ನಿಮ್ಮ"], ["ನಿಮ್ಮ (ಸ್ತ್ರೀ.)", "भवत्याः", "ಭವತ್ಯಾಃ", "ನಿಮ್ಮ"], ["ಅವನ", "तस्य", "ತಸ್ಯ", "ಅವನ"], ["ಅವಳ", "तस्याः", "ತಸ್ಯಾಃ", "ಅವಳ"], ["ಪುಲ್ಲಿಂಗ", "रामः → रामस्य", "ರಾಮಃ → ರಾಮಸ್ಯ", "ರಾಮ → ರಾಮನ"], ["ನಪುಂಸಕ", "गृहम् → गृहस्य", "ಗೃಹಮ್ → ಗೃಹಸ್ಯ", "ಮನೆ → ಮನೆಯ"], ["ಸ್ತ್ರೀಲಿಂಗ", "सीता → सीतायाः", "ಸೀತಾ → ಸೀತಾಯಾಃ", "ಸೀತೆ → ಸೀತೆಯ"], ["ವಾಕ್ಯ", "रामस्य पुस्तकम् अस्ति।", "ರಾಮಸ್ಯ ಪುಸ್ತಕಮ್ ಅಸ್ತಿ", "ರಾಮನ ಪುಸ್ತಕ ಇದೆ"], ["ವಾಕ್ಯ", "तस्य नाम गोपालः।", "ತಸ್ಯ ನಾಮ ಗೋಪಾಲಃ", "ಅವನ ಹೆಸರು ಗೋಪಾಲ"], ["ವಾಕ್ಯ", "गृहस्य द्वारं विशालम्।", "ಗೃಹಸ್ಯ ದ್ವಾರಂ ವಿಶಾಲಮ್", "ಮನೆಯ ಬಾಗಿಲು ವಿಶಾಲ"]],
    "tip": "ಸಂಬಂಧದ ಪದ ಮೊದಲು, ವಸ್ತು ನಂತರ: ರಾಮಸ್ಯ ಪುಸ್ತಕಮ್ = ರಾಮನ ಪುಸ್ತಕ.",
    "qs": [
      {"q": "___ नाम रामः।", "k": "___ ನಾಮ ರಾಮಃ", "h": "ನನ್ನ ಹೆಸರು ರಾಮ", "o": [["मम", "ಮಮ"], ["तव", "ತವ"], ["तस्य", "ತಸ್ಯ"]]},
      {"q": "___ नाम किम्?", "k": "___ ನಾಮ ಕಿಮ್?", "h": "ನಿನ್ನ ಹೆಸರೇನು?", "o": [["तव", "ತವ"], ["मम", "ಮಮ"], ["तस्याः", "ತಸ್ಯಾಃ"]]},
      {"q": "एतत् ___ गृहम्।", "k": "ಏತತ್ ___ ಗೃಹಮ್", "h": "ಇದು ಸೀತೆಯ ಮನೆ (सीता)", "o": [["सीतायाः", "ಸೀತಾಯಾಃ"], ["सीता", "ಸೀತಾ"], ["सीताम्", "ಸೀತಾಮ್"]]},
      {"q": "___ माता अत्र अस्ति।", "k": "___ ಮಾತಾ ಅತ್ರ ಅಸ್ತಿ", "h": "ಅವನ ತಾಯಿ ಇಲ್ಲಿದ್ದಾಳೆ", "o": [["तस्य", "ತಸ್ಯ"], ["सः", "ಸಃ"], ["तम्", "ತಮ್"]]},
      {"q": "___ पुस्तकं कुत्र अस्ति?", "k": "___ ಪುಸ್ತಕಂ ಕುತ್ರ ಅಸ್ತಿ?", "h": "ರಾಮನ ಪುಸ್ತಕ ಎಲ್ಲಿದೆ? (रामः)", "o": [["रामस्य", "ರಾಮಸ್ಯ"], ["रामः", "ರಾಮಃ"], ["रामम्", "ರಾಮಮ್"]]}
    ], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},

  {"id": 8, "t": "ಪ್ರಶ್ನೆ ಮತ್ತು ಉತ್ತರ", "d": "प्रश्नः उत्तरं च",
    "intro": ["ಪ್ರಶ್ನೆ ಪದಗಳು ಹೆಚ್ಚಾಗಿ ಕ-ಕಾರದಿಂದ ಆರಂಭ: ಕಿಮ್, ಕಃ, ಕಾ, ಕುತ್ರ, ಕದಾ, ಕತಿ, ಕಥಮ್. ಉತ್ತರದಲ್ಲಿ ಪ್ರಶ್ನೆಪದದ ಜಾಗಕ್ಕೆ ಉತ್ತರ ಇಡಿ — ವಾಕ್ಯದ ಉಳಿದ ಭಾಗ ಹಾಗೆಯೇ.", "ಹೌದು / ಇಲ್ಲ ಪ್ರಶ್ನೆಗೆ ವಾಕ್ಯದ ಮೊದಲು 'ಕಿಮ್' ಇಟ್ಟರೆ ಸಾಕು: ಕಿಂ ಭವಾನ್ ಛಾತ್ರಃ? → ಆಮ್, ಅಹಂ ಛಾತ್ರಃ."],
    "rows": [["ಏನು", "किम्", "ಕಿಮ್", "ಏನು (ವಸ್ತು)"], ["ಯಾರು (ಪು.)", "कः", "ಕಃ", "ಯಾರು"], ["ಯಾರು (ಸ್ತ್ರೀ.)", "का", "ಕಾ", "ಯಾರು"], ["ಎಲ್ಲಿ", "कुत्र", "ಕುತ್ರ", "ಎಲ್ಲಿ"], ["ಯಾವಾಗ", "कदा", "ಕದಾ", "ಯಾವಾಗ"], ["ಎಷ್ಟು", "कति", "ಕತಿ", "ಎಷ್ಟು"], ["ಹೇಗೆ", "कथम्", "ಕಥಮ್", "ಹೇಗೆ"], ["ಏಕೆ", "किमर्थम्", "ಕಿಮರ್ಥಮ್", "ಏಕೆ"], ["ಪ್ರಶ್ನೆ → ಉತ್ತರ", "एषः कः? → एषः रामः।", "ಏಷಃ ಕಃ? → ಏಷಃ ರಾಮಃ", "ಇವನು ಯಾರು? → ಇವನು ರಾಮ"], ["ಪ್ರಶ್ನೆ → ಉತ್ತರ", "एतत् किम्? → एतत् फलम्।", "ಏತತ್ ಕಿಮ್? → ಏತತ್ ಫಲಮ್", "ಇದು ಏನು? → ಇದು ಹಣ್ಣು"], ["ಪ್ರಶ್ನೆ → ಉತ್ತರ", "भवान् कुत्र गच्छति? → अहं गृहं गच्छामि।", "ಭವಾನ್ ಕುತ್ರ ಗಚ್ಛತಿ? → ಅಹಂ ಗೃಹಂ ಗಚ್ಛಾಮಿ", "ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತೀರಿ? → ನಾನು ಮನೆಗೆ ಹೋಗುತ್ತೇನೆ"], ["ಹೌದು / ಇಲ್ಲ", "किं भवान् छात्रः? → आम्, अहं छात्रः।", "ಕಿಂ ಭವಾನ್ ಛಾತ್ರಃ? → ಆಮ್, ಅಹಂ ಛಾತ್ರಃ", "ನೀವು ವಿದ್ಯಾರ್ಥಿಯೇ? → ಹೌದು, ನಾನು ವಿದ್ಯಾರ್ಥಿ"]],
    "tip": "ಕಃ ಪುರುಷರಿಗೆ, ಕಾ ಸ್ತ್ರೀಯರಿಗೆ, ಕಿಮ್ ವಸ್ತುಗಳಿಗೆ — ಲಿಂಗಕ್ಕೆ ಹೊಂದಿ.",
    "qs": [
      {"q": "एषा ___ ? — एषा सीता।", "k": "ಏಷಾ ___ ? — ಏಷಾ ಸೀತಾ", "h": "ಇವಳು ಯಾರು? — ಇವಳು ಸೀತೆ", "o": [["का", "ಕಾ"], ["कः", "ಕಃ"], ["किम्", "ಕಿಮ್"]]},
      {"q": "एतत् ___ ? — एतत् पुस्तकम्।", "k": "ಏತತ್ ___ ? — ಏತತ್ ಪುಸ್ತಕಮ್", "h": "ಇದು ಏನು? — ಇದು ಪುಸ್ತಕ", "o": [["किम्", "ಕಿಮ್"], ["कः", "ಕಃ"], ["कुत्र", "ಕುತ್ರ"]]},
      {"q": "भवान् ___ वसति? — अहं ग्रामे वसामि।", "k": "ಭವಾನ್ ___ ವಸತಿ? — ಅಹಂ ಗ್ರಾಮೇ ವಸಾಮಿ", "h": "ನೀವು ಎಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಿ?", "o": [["कुत्र", "ಕುತ್ರ"], ["कदा", "ಕದಾ"], ["कति", "ಕತಿ"]]},
      {"q": "___ फलानि सन्ति? — त्रीणि।", "k": "___ ಫಲಾನಿ ಸನ್ತಿ? — ತ್ರೀಣಿ", "h": "ಎಷ್ಟು ಹಣ್ಣುಗಳಿವೆ? — ಮೂರು", "o": [["कति", "ಕತಿ"], ["कथम्", "ಕಥಮ್"], ["कुत्र", "ಕುತ್ರ"]]},
      {"q": "भवान् ___ आगच्छति? — श्वः।", "k": "ಭವಾನ್ ___ ಆಗಚ್ಛತಿ? — ಶ್ವಃ", "h": "ನೀವು ಯಾವಾಗ ಬರುತ್ತೀರಿ? — ನಾಳೆ", "o": [["कदा", "ಕದಾ"], ["कुत्र", "ಕುತ್ರ"], ["किम्", "ಕಿಮ್"]]}
    ], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},

  {"id": 9, "t": "ವಿನಂತಿ ಮತ್ತು ಆಜ್ಞೆ — 'ಬನ್ನಿ, ಕುಳಿತುಕೊಳ್ಳಿ'", "d": "लोट् लकारः",
    "intro": ["ಯಾರಿಗಾದರೂ ಗೌರವದಿಂದ 'ಮಾಡಿ' ಎನ್ನಲು ಕ್ರಿಯಾಪದದ ಕೊನೆ -ತು: ಆಗಚ್ಛತು (ಬನ್ನಿ), ಉಪವಿಶತು (ಕುಳಿತುಕೊಳ್ಳಿ), ಪಠತು (ಓದಿ).", "ಅನೇಕರಿಗೆ -ನ್ತು: ಆಗಚ್ಛನ್ತು, ಉಪವಿಶನ್ತು. ಆಪ್ತರಿಗೆ / ಮಕ್ಕಳಿಗೆ ಧಾತು ಮಾತ್ರ: ಆಗಚ್ಛ (ಬಾ), ಪಠ (ಓದು). 'ಕೃಪಯಾ' (ದಯವಿಟ್ಟು) ಸೇರಿಸಿದರೆ ಇನ್ನೂ ವಿನಯ."],
    "rows": [["ಬನ್ನಿ", "आगच्छतु", "ಆಗಚ್ಛತು", "ಬನ್ನಿ"], ["ಕುಳಿತುಕೊಳ್ಳಿ", "उपविशतु", "ಉಪವಿಶತು", "ಕುಳಿತುಕೊಳ್ಳಿ"], ["ಓದಿ", "पठतु", "ಪಠತು", "ಓದಿ"], ["ಬರೆಯಿರಿ", "लिखतु", "ಲಿಖತು", "ಬರೆಯಿರಿ"], ["ಕುಡಿಯಿರಿ", "पिबतु", "ಪಿಬತು", "ಕುಡಿಯಿರಿ"], ["ತನ್ನಿ", "आनयतु", "ಆನಯತು", "ತನ್ನಿ"], ["ಹೇಳಿ", "वदतु", "ವದತು", "ಹೇಳಿ"], ["ಕೇಳಿ (ಆಲಿಸಿ)", "शृणोतु", "ಶೃಣೋತು", "ಕೇಳಿ"], ["ಹೋಗಿ", "गच्छतु", "ಗಚ್ಛತು", "ಹೋಗಿ"], ["ಅನೇಕರಿಗೆ", "आगच्छन्तु · उपविशन्तु", "ಆಗಚ್ಛನ್ತು · ಉಪವಿಶನ್ತು", "ಬನ್ನಿ · ಕುಳಿತುಕೊಳ್ಳಿ (ಎಲ್ಲರೂ)"], ["ಆಪ್ತರಿಗೆ", "आगच्छ · पठ", "ಆಗಚ್ಛ · ಪಠ", "ಬಾ · ಓದು"], ["ವಾಕ್ಯ", "कृपया जलम् आनयतु।", "ಕೃಪಯಾ ಜಲಮ್ ಆನಯತು", "ದಯವಿಟ್ಟು ನೀರು ತನ್ನಿ"]],
    "tip": "ಸಂವಾದದಲ್ಲಿ ಕಲಿತ 'ಉಪವಿಶತು', 'ಆನಯತು', 'ಪಿಬತು' ಎಲ್ಲವೂ ಇದೇ ರೂಪ.",
    "qs": [
      {"q": "कृपया ___ ।", "k": "ಕೃಪಯಾ ___", "h": "ದಯವಿಟ್ಟು ಬನ್ನಿ", "o": [["आगच्छतु", "ಆಗಚ್ಛತು"], ["आगच्छति", "ಆಗಚ್ಛತಿ"], ["आगच्छामि", "ಆಗಚ್ಛಾಮಿ"]]},
      {"q": "दुग्धं ___ ।", "k": "ದುಗ್ಧಂ ___", "h": "ಹಾಲು ಕುಡಿಯಿರಿ", "o": [["पिबतु", "ಪಿಬತು"], ["पिबति", "ಪಿಬತಿ"], ["पिबामि", "ಪಿಬಾಮಿ"]]},
      {"q": "पुस्तकं ___ ।", "k": "ಪುಸ್ತಕಂ ___", "h": "ಪುಸ್ತಕ ಓದಿ", "o": [["पठतु", "ಪಠತು"], ["पठति", "ಪಠತಿ"], ["पठसि", "ಪಠಸಿ"]]},
      {"q": "अत्र ___ ।", "k": "ಅತ್ರ ___", "h": "ಇಲ್ಲಿ ಕುಳಿತುಕೊಳ್ಳಿ", "o": [["उपविशतु", "ಉಪವಿಶತು"], ["उपविशति", "ಉಪವಿಶತಿ"], ["उपविशामि", "ಉಪವಿಶಾಮಿ"]]},
      {"q": "सर्वे ___ ।", "k": "ಸರ್ವೇ ___", "h": "ಎಲ್ಲರೂ ಬನ್ನಿ", "o": [["आगच्छन्तु", "ಆಗಚ್ಛನ್ತು"], ["आगच्छतु", "ಆಗಚ್ಛತು"], ["आगच्छन्ति", "ಆಗಚ್ಛನ್ತಿ"]]}
    ], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},

  {"id": 10, "t": "ಸಂಧಿ ಪರಿಚಯ — ಮ್ ಮತ್ತು ಂ", "d": "सन्धिः — परिचयः",
    "intro": ["ಪದಗಳು ಸೇರುವಾಗ ಧ್ವನಿ ಸ್ವಲ್ಪ ಬದಲಾಗುತ್ತದೆ. ಇದೇ ಸಂಧಿ. ಆರಂಭಕ್ಕೆ ಒಂದೇ ನಿಯಮ ಸಾಕು: ಪದದ ಕೊನೆಯ ಮ್ ನಂತರ ವ್ಯಂಜನ ಬಂದರೆ ಅದನ್ನು ಅನುಸ್ವಾರ (ಂ) ಎಂದು ಬರೆಯುತ್ತೇವೆ.", "ಸ್ವರ ಬಂದರೆ ಅಥವಾ ವಾಕ್ಯ ಮುಗಿದರೆ ಮ್ ಹಾಗೆಯೇ ಉಳಿಯುತ್ತದೆ: ಜಲಮ್ ಆನಯತು, ಏತತ್ ಮಮ ಗೃಹಮ್."],
    "rows": [["ಮ್ + ವ್ಯಂಜನ → ಂ", "गृहम् + गच्छामि → गृहं गच्छामि", "ಗೃಹಮ್ + ಗಚ್ಛಾಮಿ → ಗೃಹಂ ಗಚ್ಛಾಮಿ", "ಮನೆಗೆ ಹೋಗುತ್ತೇನೆ"], ["ಮ್ + ವ್ಯಂಜನ → ಂ", "फलम् + खादामि → फलं खादामि", "ಫಲಮ್ + ಖಾದಾಮಿ → ಫಲಂ ಖಾದಾಮಿ", "ಹಣ್ಣು ತಿನ್ನುತ್ತೇನೆ"], ["ಮ್ + ಸ್ವರ → ಮ್ ಉಳಿಯುತ್ತದೆ", "जलम् + आनयतु → जलम् आनयतु", "ಜಲಮ್ + ಆನಯತು → ಜಲಮ್ ಆನಯತು", "ನೀರು ತನ್ನಿ"], ["ವಾಕ್ಯದ ಕೊನೆಯಲ್ಲಿ ಮ್", "एतत् मम गृहम्।", "ಏತತ್ ಮಮ ಗೃಹಮ್", "ಇದು ನನ್ನ ಮನೆ"], ["ಃ + ಕ / ಪ → ಃ ಉಳಿಯುತ್ತದೆ", "रामः + पठति → रामः पठति", "ರಾಮಃ + ಪಠತಿ → ರಾಮಃ ಪಠತಿ", "ರಾಮ ಓದುತ್ತಾನೆ"], ["ಃ + ಗ / ದ / ವ ಮುಂತಾದ ಮೃದು ವ್ಯಂಜನ → ಓ", "रामः + गच्छति → रामो गच्छति", "ರಾಮಃ + ಗಚ್ಛತಿ → ರಾಮೋ ಗಚ್ಛತಿ", "ರಾಮ ಹೋಗುತ್ತಾನೆ (ಆರಂಭಕ್ಕೆ 'ರಾಮಃ ಗಚ್ಛತಿ' ಎಂದು ಬಿಡಿಸಿ ಬರೆದರೂ ಸರಿ)"], ["ಃ + ಅ → ಓಽ", "रामः + अस्ति → रामोऽस्ति", "ರಾಮಃ + ಅಸ್ತಿ → ರಾಮೋಽಸ್ತಿ", "ರಾಮ ಇದ್ದಾನೆ (ಆರಂಭಕ್ಕೆ 'ರಾಮಃ ಅಸ್ತಿ' ಎಂದೂ ಸರಿ)"]],
    "tip": "ಈ ಆ್ಯಪ್‌ನ ವಾಕ್ಯಗಳಲ್ಲಿ ಗೃಹಂ ಗಚ್ಛಾಮಿ, ಜಲಂ ಪಿಬಾಮಿ — ಇವೆಲ್ಲ ಇದೇ ನಿಯಮ.",
    "qs": [
      {"q": "अहं फल___ खादामि।", "k": "ಅಹಂ ಫಲ___ ಖಾದಾಮಿ", "h": "ಮುಂದೆ ವ್ಯಂಜನ (ಖ)", "o": [["फलं", "ಫಲಂ"], ["फलम्", "ಫಲಮ್"], ["फलः", "ಫಲಃ"]]},
      {"q": "जल___ आनयतु।", "k": "ಜಲ___ ಆನಯತು", "h": "ಮುಂದೆ ಸ್ವರ (ಆ)", "o": [["जलम्", "ಜಲಮ್"], ["जलं", "ಜಲಂ"], ["जलः", "ಜಲಃ"]]},
      {"q": "एतत् मम पुस्तक___ ।", "k": "ಏತತ್ ಮಮ ಪುಸ್ತಕ___", "h": "ವಾಕ್ಯದ ಕೊನೆ", "o": [["पुस्तकम्", "ಪುಸ್ತಕಮ್"], ["पुस्तकं", "ಪುಸ್ತಕಂ"], ["पुस्तकः", "ಪುಸ್ತಕಃ"]]},
      {"q": "सः गृह___ गच्छति।", "k": "ಸಃ ಗೃಹ___ ಗಚ್ಛತಿ", "h": "ಮುಂದೆ ವ್ಯಂಜನ (ಗ)", "o": [["गृहं", "ಗೃಹಂ"], ["गृहम्", "ಗೃಹಮ್"], ["गृहे", "ಗೃಹೇ"]]},
      {"q": "अहं संस्कृत___ पठामि।", "k": "ಅಹಂ ಸಂಸ್ಕೃತ___ ಪಠಾಮಿ", "h": "ಮುಂದೆ ವ್ಯಂಜನ (ಪ)", "o": [["संस्कृतं", "ಸಂಸ್ಕೃತಂ"], ["संस्कृतम्", "ಸಂಸ್ಕೃತಮ್"], ["संस्कृते", "ಸಂಸ್ಕೃತೇ"]]}
    ], "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null}
];

/* ═══════════════════════════════════════════════════════════════
   ಹಂತ 5 — ಸುಭಾಷಿತಮ್
   lines = [ದೇವನಾಗರಿ ಪಾದ, ಕನ್ನಡ ಲಿಪಿ]; m = ಅರ್ಥ; parts = [ಪದ, ಅರ್ಥ];
   g = ಸಾರ (ಒಂದು ಸಾಲು); from = ಮೂಲ ಗ್ರಂಥ
   ═══════════════════════════════════════════════════════════════ */
export const SUBHASHITAS = [
  {"id": 1, "t": "ವಿದ್ಯೆ ವಿನಯವನ್ನು ಕೊಡುತ್ತದೆ", "lines": [["विद्या ददाति विनयं", "ವಿದ್ಯಾ ದದಾತಿ ವಿನಯಂ"], ["विनयाद्याति पात्रताम् ।", "ವಿನಯಾದ್ಯಾತಿ ಪಾತ್ರತಾಮ್"], ["पात्रत्वाद्धनमाप्नोति", "ಪಾತ್ರತ್ವಾದ್ಧನಮಾಪ್ನೋತಿ"], ["धनाद्धर्मं ततः सुखम् ॥", "ಧನಾದ್ಧರ್ಮಂ ತತಃ ಸುಖಮ್"]],
    "m": "ವಿದ್ಯೆ ವಿನಯವನ್ನು ಕೊಡುತ್ತದೆ. ವಿನಯದಿಂದ ಯೋಗ್ಯತೆ ಬರುತ್ತದೆ. ಯೋಗ್ಯತೆಯಿಂದ ಧನ ಸಿಗುತ್ತದೆ. ಧನದಿಂದ ಧರ್ಮ, ಅದರಿಂದ ಸುಖ.",
    "parts": [["विद्या", "ವಿದ್ಯೆ"], ["ददाति", "ಕೊಡುತ್ತದೆ"], ["विनयम्", "ವಿನಯವನ್ನು"], ["विनयात्", "ವಿನಯದಿಂದ"], ["याति", "ಹೊಂದುತ್ತದೆ"], ["पात्रताम्", "ಯೋಗ್ಯತೆಯನ್ನು"], ["पात्रत्वात्", "ಯೋಗ್ಯತೆಯಿಂದ"], ["धनम्", "ಧನವನ್ನು"], ["आप्नोति", "ಪಡೆಯುತ್ತಾನೆ"], ["धनात्", "ಧನದಿಂದ"], ["धर्मम्", "ಧರ್ಮವನ್ನು"], ["ततः", "ಅದರಿಂದ"], ["सुखम्", "ಸುಖವನ್ನು"]],
    "g": "ವಿದ್ಯೆಯಿಂದ ವಿನಯ, ವಿನಯದಿಂದ ಸುಖದವರೆಗಿನ ಸರಪಳಿ", "from": "ಹಿತೋಪದೇಶ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 2, "t": "ಪ್ರಯತ್ನದಿಂದಲೇ ಕೆಲಸ", "lines": [["उद्यमेन हि सिध्यन्ति", "ಉದ್ಯಮೇನ ಹಿ ಸಿಧ್ಯನ್ತಿ"], ["कार्याणि न मनोरथैः ।", "ಕಾರ್ಯಾಣಿ ನ ಮನೋರಥೈಃ"], ["न हि सुप्तस्य सिंहस्य", "ನ ಹಿ ಸುಪ್ತಸ್ಯ ಸಿಂಹಸ್ಯ"], ["प्रविशन्ति मुखे मृगाः ॥", "ಪ್ರವಿಶನ್ತಿ ಮುಖೇ ಮೃಗಾಃ"]],
    "m": "ಕೆಲಸಗಳು ಪ್ರಯತ್ನದಿಂದ ಸಿದ್ಧಿಸುತ್ತವೆ, ಬಯಕೆಗಳಿಂದ ಅಲ್ಲ. ಮಲಗಿದ ಸಿಂಹದ ಬಾಯಿಗೆ ಜಿಂಕೆಗಳು ತಾವಾಗಿ ಬರುವುದಿಲ್ಲ.",
    "parts": [["उद्यमेन", "ಪ್ರಯತ್ನದಿಂದ"], ["हि", "ನಿಜವಾಗಿ"], ["सिध्यन्ति", "ಸಿದ್ಧಿಸುತ್ತವೆ"], ["कार्याणि", "ಕೆಲಸಗಳು"], ["न", "ಅಲ್ಲ"], ["मनोरथैः", "ಬಯಕೆಗಳಿಂದ"], ["सुप्तस्य", "ಮಲಗಿದ"], ["सिंहस्य", "ಸಿಂಹದ"], ["प्रविशन्ति", "ಪ್ರವೇಶಿಸುತ್ತವೆ"], ["मुखे", "ಬಾಯಿಯಲ್ಲಿ"], ["मृगाः", "ಜಿಂಕೆಗಳು"]],
    "g": "ಪ್ರಯತ್ನವಿಲ್ಲದೆ ಫಲವಿಲ್ಲ", "from": "ಹಿತೋಪದೇಶ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 3, "t": "ಸತ್ಯವೂ ಪ್ರಿಯವೂ", "lines": [["सत्यं ब्रूयात् प्रियं ब्रूयात्", "ಸತ್ಯಂ ಬ್ರೂಯಾತ್ ಪ್ರಿಯಂ ಬ್ರೂಯಾತ್"], ["न ब्रूयात् सत्यमप्रियम् ।", "ನ ಬ್ರೂಯಾತ್ ಸತ್ಯಮಪ್ರಿಯಮ್"], ["प्रियं च नानृतं ब्रूयात्", "ಪ್ರಿಯಂ ಚ ನಾನೃತಂ ಬ್ರೂಯಾತ್"], ["एष धर्मः सनातनः ॥", "ಏಷ ಧರ್ಮಃ ಸನಾತನಃ"]],
    "m": "ಸತ್ಯವನ್ನು ಹೇಳಬೇಕು, ಪ್ರಿಯವಾದದ್ದನ್ನು ಹೇಳಬೇಕು. ಅಪ್ರಿಯವಾದ ಸತ್ಯವನ್ನು ಹೇಳಬಾರದು. ಪ್ರಿಯವಾದ ಸುಳ್ಳನ್ನೂ ಹೇಳಬಾರದು. ಇದು ಸನಾತನ ಧರ್ಮ.",
    "parts": [["सत्यम्", "ಸತ್ಯವನ್ನು"], ["ब्रूयात्", "ಹೇಳಬೇಕು"], ["प्रियम्", "ಪ್ರಿಯವಾದದ್ದನ್ನು"], ["न ब्रूयात्", "ಹೇಳಬಾರದು"], ["अप्रियम्", "ಅಪ್ರಿಯವಾದದ್ದನ್ನು"], ["च", "ಮತ್ತು"], ["अनृतम्", "ಸುಳ್ಳನ್ನು"], ["एषः", "ಇದು"], ["धर्मः", "ಧರ್ಮ"], ["सनातनः", "ಸನಾತನ, ಶಾಶ್ವತ"]],
    "g": "ಸತ್ಯವೂ ಪ್ರಿಯವೂ ಆದ ಮಾತು", "from": "ಮನುಸ್ಮೃತಿ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 4, "t": "ಭೂಮಿಯೇ ಒಂದು ಕುಟುಂಬ", "lines": [["अयं निजः परो वेति", "ಅಯಂ ನಿಜಃ ಪರೋ ವೇತಿ"], ["गणना लघुचेतसाम् ।", "ಗಣನಾ ಲಘುಚೇತಸಾಮ್"], ["उदारचरितानां तु", "ಉದಾರಚರಿತಾನಾಂ ತು"], ["वसुधैव कुटुम्बकम् ॥", "ವಸುಧೈವ ಕುಟುಮ್ಬಕಮ್"]],
    "m": "'ಇವನು ನನ್ನವನು, ಇವನು ಪರಕೀಯ' ಎಂಬ ಲೆಕ್ಕ ಸಣ್ಣ ಮನಸ್ಸಿನವರದು. ಉದಾರ ಸ್ವಭಾವದವರಿಗೆ ಭೂಮಿಯೇ ಒಂದು ಕುಟುಂಬ.",
    "parts": [["अयम्", "ಇವನು"], ["निजः", "ನನ್ನವನು"], ["परः", "ಪರಕೀಯ"], ["वा", "ಅಥವಾ"], ["इति", "ಎಂದು"], ["गणना", "ಲೆಕ್ಕ"], ["लघुचेतसाम्", "ಸಣ್ಣ ಮನಸ್ಸಿನವರದು"], ["उदारचरितानाम्", "ಉದಾರ ಸ್ವಭಾವದವರಿಗೆ"], ["तु", "ಆದರೆ"], ["वसुधा", "ಭೂಮಿ"], ["एव", "ಯೇ"], ["कुटुम्बकम्", "ಕುಟುಂಬ"]],
    "g": "ಜಗತ್ತೇ ಒಂದು ಕುಟುಂಬ", "from": "ಹಿತೋಪದೇಶ / ಮಹೋಪನಿಷತ್", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 5, "t": "ಕಾಗೆ ಮತ್ತು ಕೋಗಿಲೆ", "lines": [["काकः कृष्णः पिकः कृष्णः", "ಕಾಕಃ ಕೃಷ್ಣಃ ಪಿಕಃ ಕೃಷ್ಣಃ"], ["को भेदः पिककाकयोः ।", "ಕೋ ಭೇದಃ ಪಿಕಕಾಕಯೋಃ"], ["वसन्तसमये प्राप्ते", "ವಸನ್ತಸಮಯೇ ಪ್ರಾಪ್ತೇ"], ["काकः काकः पिकः पिकः ॥", "ಕಾಕಃ ಕಾಕಃ ಪಿಕಃ ಪಿಕಃ"]],
    "m": "ಕಾಗೆ ಕಪ್ಪು, ಕೋಗಿಲೆಯೂ ಕಪ್ಪು. ಕೋಗಿಲೆ–ಕಾಗೆಗಳಲ್ಲಿ ಭೇದವೇನು? ವಸಂತಕಾಲ ಬಂದಾಗ ಕಾಗೆ ಕಾಗೆಯೇ, ಕೋಗಿಲೆ ಕೋಗಿಲೆಯೇ.",
    "parts": [["काकः", "ಕಾಗೆ"], ["कृष्णः", "ಕಪ್ಪು"], ["पिकः", "ಕೋಗಿಲೆ"], ["कः (को)", "ಯಾವ, ಏನು"], ["भेदः", "ಭೇದ"], ["पिककाकयोः", "ಕೋಗಿಲೆ–ಕಾಗೆಗಳಲ್ಲಿ"], ["वसन्तसमये", "ವಸಂತಕಾಲವು"], ["प्राप्ते", "ಬಂದಾಗ"]],
    "g": "ನಿಜವಾದ ಗುಣ ಸಮಯ ಬಂದಾಗ ತಿಳಿಯುತ್ತದೆ", "from": "ಸುಭಾಷಿತರತ್ನಭಾಂಡಾಗಾರ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 6, "t": "ವಿದ್ಯೆಯೇ ಶ್ರೇಷ್ಠ ಧನ", "lines": [["न चोरहार्यं न च राजहार्यं", "ನ ಚೋರಹಾರ್ಯಂ ನ ಚ ರಾಜಹಾರ್ಯಂ"], ["न भ्रातृभाज्यं न च भारकारि ।", "ನ ಭ್ರಾತೃಭಾಜ್ಯಂ ನ ಚ ಭಾರಕಾರಿ"], ["व्यये कृते वर्धत एव नित्यं", "ವ್ಯಯೇ ಕೃತೇ ವರ್ಧತ ಏವ ನಿತ್ಯಂ"], ["विद्याधनं सर्वधनप्रधानम् ॥", "ವಿದ್ಯಾಧನಂ ಸರ್ವಧನಪ್ರಧಾನಮ್"]],
    "m": "ಕಳ್ಳರು ಕದಿಯಲಾರರು, ರಾಜನೂ ಕಸಿಯಲಾರ, ಸಹೋದರರು ಪಾಲು ಕೇಳಲಾರರು, ಹೊರೆಯೂ ಅಲ್ಲ. ಖರ್ಚು ಮಾಡಿದಷ್ಟೂ ನಿತ್ಯ ಬೆಳೆಯುತ್ತದೆ. ವಿದ್ಯಾಧನವೇ ಎಲ್ಲ ಧನಗಳಲ್ಲಿ ಶ್ರೇಷ್ಠ.",
    "parts": [["न चोरहार्यम्", "ಕಳ್ಳರಿಂದ ಕದಿಯಲಾಗದು"], ["न च राजहार्यम्", "ರಾಜನಿಂದಲೂ ಕಸಿಯಲಾಗದು"], ["न भ्रातृभाज्यम्", "ಸಹೋದರರಲ್ಲಿ ಪಾಲಾಗದು"], ["न च भारकारि", "ಹೊರೆಯೂ ಅಲ್ಲ"], ["व्यये कृते", "ಖರ್ಚು ಮಾಡಿದಾಗ"], ["वर्धते एव", "ಬೆಳೆಯುತ್ತಲೇ ಇದೆ"], ["नित्यम्", "ಯಾವಾಗಲೂ"], ["विद्याधनम्", "ವಿದ್ಯೆ ಎಂಬ ಧನ"], ["सर्वधनप्रधानम्", "ಎಲ್ಲ ಧನಗಳಲ್ಲಿ ಶ್ರೇಷ್ಠ"]],
    "g": "ವಿದ್ಯೆಯೇ ಶ್ರೇಷ್ಠ ಧನ", "from": "ಸುಭಾಷಿತರತ್ನಭಾಂಡಾಗಾರ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 7, "t": "ಪರೋಪಕಾರಕ್ಕಾಗಿ", "lines": [["परोपकाराय फलन्ति वृक्षाः", "ಪರೋಪಕಾರಾಯ ಫಲನ್ತಿ ವೃಕ್ಷಾಃ"], ["परोपकाराय वहन्ति नद्यः ।", "ಪರೋಪಕಾರಾಯ ವಹನ್ತಿ ನದ್ಯಃ"], ["परोपकाराय दुहन्ति गावः", "ಪರೋಪಕಾರಾಯ ದುಹನ್ತಿ ಗಾವಃ"], ["परोपकारार्थमिदं शरीरम् ॥", "ಪರೋಪಕಾರಾರ್ಥಮಿದಂ ಶರೀರಮ್"]],
    "m": "ಮರಗಳು ಪರೋಪಕಾರಕ್ಕಾಗಿ ಫಲ ಕೊಡುತ್ತವೆ. ನದಿಗಳು ಪರೋಪಕಾರಕ್ಕಾಗಿ ಹರಿಯುತ್ತವೆ. ಹಸುಗಳು ಪರೋಪಕಾರಕ್ಕಾಗಿ ಹಾಲು ಕೊಡುತ್ತವೆ. ಈ ಶರೀರವೂ ಪರೋಪಕಾರಕ್ಕಾಗಿಯೇ.",
    "parts": [["परोपकाराय", "ಪರೋಪಕಾರಕ್ಕಾಗಿ"], ["फलन्ति", "ಫಲ ಕೊಡುತ್ತವೆ"], ["वृक्षाः", "ಮರಗಳು"], ["वहन्ति", "ಹರಿಯುತ್ತವೆ"], ["नद्यः", "ನದಿಗಳು"], ["दुहन्ति", "ಹಾಲು ಕೊಡುತ್ತವೆ"], ["गावः", "ಹಸುಗಳು"], ["परोपकारार्थम्", "ಪರೋಪಕಾರಕ್ಕಾಗಿ"], ["इदम्", "ಈ"], ["शरीरम्", "ಶರೀರ"]],
    "g": "ಬದುಕು ಪರೋಪಕಾರಕ್ಕಾಗಿ", "from": "ಸುಭಾಷಿತರತ್ನಭಾಂಡಾಗಾರ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 8, "t": "ಮಕ್ಕಳಿಗೆ ವಿದ್ಯೆ", "lines": [["माता शत्रुः पिता वैरी", "ಮಾತಾ ಶತ್ರುಃ ಪಿತಾ ವೈರೀ"], ["येन बालो न पाठितः ।", "ಯೇನ ಬಾಲೋ ನ ಪಾಠಿತಃ"], ["न शोभते सभामध्ये", "ನ ಶೋಭತೇ ಸಭಾಮಧ್ಯೇ"], ["हंसमध्ये बको यथा ॥", "ಹಂಸಮಧ್ಯೇ ಬಕೋ ಯಥಾ"]],
    "m": "ಮಗುವಿಗೆ ಓದಿಸದ ತಾಯಿ ಶತ್ರು, ತಂದೆ ವೈರಿ. ಹಂಸಗಳ ನಡುವೆ ಬಕದಂತೆ ಅವನು ಸಭೆಯ ನಡುವೆ ಶೋಭಿಸುವುದಿಲ್ಲ.",
    "parts": [["माता", "ತಾಯಿ"], ["शत्रुः", "ಶತ್ರು"], ["पिता", "ತಂದೆ"], ["वैरी", "ವೈರಿ"], ["येन", "ಯಾರಿಂದ"], ["बालः", "ಮಗು"], ["न पाठितः", "ಓದಿಸಲ್ಪಡಲಿಲ್ಲವೋ"], ["न शोभते", "ಶೋಭಿಸುವುದಿಲ್ಲ"], ["सभामध्ये", "ಸಭೆಯ ನಡುವೆ"], ["हंसमध्ये", "ಹಂಸಗಳ ನಡುವೆ"], ["बकः", "ಬಕ (ಕೊಕ್ಕರೆ)"], ["यथा", "ಹೇಗೋ ಹಾಗೆ"]],
    "g": "ಮಕ್ಕಳಿಗೆ ವಿದ್ಯೆ ಕೊಡುವುದು ಪೋಷಕರ ಕರ್ತವ್ಯ", "from": "ಚಾಣಕ್ಯನೀತಿ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 9, "t": "ಗುರುವಂದನೆ", "lines": [["गुरुर्ब्रह्मा गुरुर्विष्णुः", "ಗುರುರ್ಬ್ರಹ್ಮಾ ಗುರುರ್ವಿಷ್ಣುಃ"], ["गुरुर्देवो महेश्वरः ।", "ಗುರುರ್ದೇವೋ ಮಹೇಶ್ವರಃ"], ["गुरुः साक्षात् परब्रह्म", "ಗುರುಃ ಸಾಕ್ಷಾತ್ ಪರಬ್ರಹ್ಮ"], ["तस्मै श्रीगुरवे नमः ॥", "ತಸ್ಮೈ ಶ್ರೀಗುರವೇ ನಮಃ"]],
    "m": "ಗುರುವೇ ಬ್ರಹ್ಮ, ಗುರುವೇ ವಿಷ್ಣು, ಗುರುವೇ ಮಹೇಶ್ವರ ದೇವ. ಗುರುವು ಸಾಕ್ಷಾತ್ ಪರಬ್ರಹ್ಮ. ಆ ಶ್ರೀಗುರುವಿಗೆ ನಮಸ್ಕಾರ.",
    "parts": [["गुरुः", "ಗುರು"], ["ब्रह्मा", "ಬ್ರಹ್ಮ"], ["विष्णुः", "ವಿಷ್ಣು"], ["देवः", "ದೇವ"], ["महेश्वरः", "ಮಹೇಶ್ವರ"], ["साक्षात्", "ಸಾಕ್ಷಾತ್"], ["परब्रह्म", "ಪರಬ್ರಹ್ಮ"], ["तस्मै", "ಅವನಿಗೆ"], ["श्रीगुरवे", "ಶ್ರೀಗುರುವಿಗೆ"], ["नमः", "ನಮಸ್ಕಾರ"]],
    "g": "ಗುರುವಂದನೆ", "from": "ಗುರುಸ್ತೋತ್ರ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 10, "t": "ಸೋಮಾರಿತನವೇ ಶತ್ರು", "lines": [["आलस्यं हि मनुष्याणां", "ಆಲಸ್ಯಂ ಹಿ ಮನುಷ್ಯಾಣಾಂ"], ["शरीरस्थो महान् रिपुः ।", "ಶರೀರಸ್ಥೋ ಮಹಾನ್ ರಿಪುಃ"], ["नास्त्युद्यमसमो बन्धुः", "ನಾಸ್ತ್ಯುದ್ಯಮಸಮೋ ಬನ್ಧುಃ"], ["कृत्वा यं नावसीदति ॥", "ಕೃತ್ವಾ ಯಂ ನಾವಸೀದತಿ"]],
    "m": "ಸೋಮಾರಿತನ ಮನುಷ್ಯರ ಶರೀರದಲ್ಲೇ ಇರುವ ದೊಡ್ಡ ಶತ್ರು. ಪ್ರಯತ್ನಕ್ಕೆ ಸಮನಾದ ಬಂಧು ಇಲ್ಲ; ಅದನ್ನು ಮಾಡಿದವನು ಎಂದೂ ಕುಗ್ಗುವುದಿಲ್ಲ.",
    "parts": [["आलस्यम्", "ಸೋಮಾರಿತನ"], ["हि", "ನಿಜವಾಗಿ"], ["मनुष्याणाम्", "ಮನುಷ್ಯರ"], ["शरीरस्थः", "ಶರೀರದಲ್ಲಿರುವ"], ["महान्", "ದೊಡ್ಡ"], ["रिपुः", "ಶತ್ರು"], ["न अस्ति", "ಇಲ್ಲ"], ["उद्यमसमः", "ಪ್ರಯತ್ನಕ್ಕೆ ಸಮನಾದ"], ["बन्धुः", "ಬಂಧು"], ["कृत्वा", "ಮಾಡಿ"], ["यम्", "ಯಾವುದನ್ನು"], ["न अवसीदति", "ಕುಗ್ಗುವುದಿಲ್ಲ"]],
    "g": "ಸೋಮಾರಿತನವೇ ಶತ್ರು, ಪ್ರಯತ್ನವೇ ಬಂಧು", "from": "ಚಾಣಕ್ಯನೀತಿ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 11, "t": "ಎಲ್ಲರೂ ಸುಖಿಗಳಾಗಲಿ", "lines": [["सर्वे भवन्तु सुखिनः", "ಸರ್ವೇ ಭವನ್ತು ಸುಖಿನಃ"], ["सर्वे सन्तु निरामयाः ।", "ಸರ್ವೇ ಸನ್ತು ನಿರಾಮಯಾಃ"], ["सर्वे भद्राणि पश्यन्तु", "ಸರ್ವೇ ಭದ್ರಾಣಿ ಪಶ್ಯನ್ತು"], ["मा कश्चिद्दुःखभाग्भवेत् ॥", "ಮಾ ಕಶ್ಚಿದ್ದುಃಖಭಾಗ್ಭವೇತ್"]],
    "m": "ಎಲ್ಲರೂ ಸುಖಿಗಳಾಗಲಿ. ಎಲ್ಲರೂ ರೋಗರಹಿತರಾಗಲಿ. ಎಲ್ಲರೂ ಮಂಗಳವನ್ನೇ ಕಾಣಲಿ. ಯಾರೂ ದುಃಖಕ್ಕೆ ಪಾಲಾಗದಿರಲಿ.",
    "parts": [["सर्वे", "ಎಲ್ಲರೂ"], ["भवन्तु", "ಆಗಲಿ"], ["सुखिनः", "ಸುಖಿಗಳು"], ["सन्तु", "ಇರಲಿ"], ["निरामयाः", "ರೋಗರಹಿತರು"], ["भद्राणि", "ಮಂಗಳಗಳನ್ನು"], ["पश्यन्तु", "ನೋಡಲಿ"], ["मा", "ಬೇಡ"], ["कश्चित्", "ಯಾರೂ"], ["दुःखभाक्", "ದುಃಖಕ್ಕೆ ಪಾಲಾದವನು"], ["भवेत्", "ಆಗಲಿ"]],
    "g": "ಎಲ್ಲರ ಒಳಿತಿಗಾಗಿ ಪ್ರಾರ್ಥನೆ", "from": "ಶಾಂತಿಮಂತ್ರ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 12, "t": "ಮನಸ್ಸು, ಮಾತು, ಕೃತಿ", "lines": [["यथा चित्तं तथा वाचो", "ಯಥಾ ಚಿತ್ತಂ ತಥಾ ವಾಚೋ"], ["यथा वाचस्तथा क्रियाः ।", "ಯಥಾ ವಾಚಸ್ತಥಾ ಕ್ರಿಯಾಃ"], ["चित्ते वाचि क्रियायां च", "ಚಿತ್ತೇ ವಾಚಿ ಕ್ರಿಯಾಯಾಂ ಚ"], ["साधूनामेकरूपता ॥", "ಸಾಧೂನಾಮೇಕರೂಪತಾ"]],
    "m": "ಮನಸ್ಸಿನಲ್ಲಿ ಹೇಗೋ ಹಾಗೆ ಮಾತು, ಮಾತಿನಲ್ಲಿ ಹೇಗೋ ಹಾಗೆ ಕೃತಿ. ಮನಸ್ಸು, ಮಾತು, ಕೃತಿ — ಮೂರರಲ್ಲೂ ಸಜ್ಜನರಿಗೆ ಒಂದೇ ರೂಪ.",
    "parts": [["यथा", "ಹೇಗೋ"], ["चित्तम्", "ಮನಸ್ಸು"], ["तथा", "ಹಾಗೆ"], ["वाचः", "ಮಾತುಗಳು"], ["क्रियाः", "ಕೃತಿಗಳು"], ["चित्ते", "ಮನಸ್ಸಿನಲ್ಲಿ"], ["वाचि", "ಮಾತಿನಲ್ಲಿ"], ["क्रियायाम्", "ಕೃತಿಯಲ್ಲಿ"], ["च", "ಮತ್ತು"], ["साधूनाम्", "ಸಜ್ಜನರಿಗೆ"], ["एकरूपता", "ಒಂದೇ ರೂಪ"]],
    "g": "ಮನಸ್ಸು, ಮಾತು, ಕೃತಿ ಒಂದಾಗಿರಲಿ", "from": "ಸುಭಾಷಿತರತ್ನಭಾಂಡಾಗಾರ", "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null}
];

/* ═══════════════════════════════════════════════════════════════
   ಹಂತ 6 — ವಾಚನಮ್ (ಸರಳ ಗದ್ಯ)
   lines = [ದೇವನಾಗರಿ, ಕನ್ನಡ ಲಿಪಿ, ಅರ್ಥ]; words = ಹೊಸ ಪದಗಳು [ದೇವನಾಗರಿ, ಕನ್ನಡ, ಅರ್ಥ]
   qs = ಗ್ರಹಿಕೆಯ ಪ್ರಶ್ನೆಗಳು: q = ಪ್ರಶ್ನೆ, o = ಆಯ್ಕೆಗಳು — ಮೊದಲನೆಯದೇ ಸರಿ
   ═══════════════════════════════════════════════════════════════ */
export const READINGS = [
  {"id": 1, "t": "ಮಮ ಪರಿಚಯಃ", "d": "मम परिचयः",
    "lines": [["मम नाम रामः।", "ಮಮ ನಾಮ ರಾಮಃ", "ನನ್ನ ಹೆಸರು ರಾಮ"], ["अहं छात्रः अस्मि।", "ಅಹಂ ಛಾತ್ರಃ ಅಸ್ಮಿ", "ನಾನು ವಿದ್ಯಾರ್ಥಿ"], ["अहं ग्रामे वसामि।", "ಅಹಂ ಗ್ರಾಮೇ ವಸಾಮಿ", "ನಾನು ಹಳ್ಳಿಯಲ್ಲಿ ವಾಸಿಸುತ್ತೇನೆ"], ["मम गृहे माता पिता भगिनी च सन्ति।", "ಮಮ ಗೃಹೇ ಮಾತಾ ಪಿತಾ ಭಗಿನೀ ಚ ಸನ್ತಿ", "ನನ್ನ ಮನೆಯಲ್ಲಿ ತಾಯಿ, ತಂದೆ ಮತ್ತು ಸಹೋದರಿ ಇದ್ದಾರೆ"], ["अहं प्रतिदिनं विद्यालयं गच्छामि।", "ಅಹಂ ಪ್ರತಿದಿನಂ ವಿದ್ಯಾಲಯಂ ಗಚ್ಛಾಮಿ", "ನಾನು ಪ್ರತಿದಿನ ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ"], ["अहं संस्कृतं पठामि।", "ಅಹಂ ಸಂಸ್ಕೃತಂ ಪಠಾಮಿ", "ನಾನು ಸಂಸ್ಕೃತ ಓದುತ್ತೇನೆ"], ["संस्कृतं मम प्रिया भाषा।", "ಸಂಸ್ಕೃತಂ ಮಮ ಪ್ರಿಯಾ ಭಾಷಾ", "ಸಂಸ್ಕೃತ ನನ್ನ ಪ್ರಿಯ ಭಾಷೆ"]],
    "words": [["च", "ಚ", "ಮತ್ತು"], ["प्रतिदिनम्", "ಪ್ರತಿದಿನಮ್", "ಪ್ರತಿದಿನ"], ["विद्यालयः", "ವಿದ್ಯಾಲಯಃ", "ಶಾಲೆ"], ["प्रिया", "ಪ್ರಿಯಾ", "ಪ್ರಿಯವಾದ (ಸ್ತ್ರೀ.)"], ["भाषा", "ಭಾಷಾ", "ಭಾಷೆ"]],
    "qs": [{"q": "ರಾಮ ಎಲ್ಲಿ ವಾಸಿಸುತ್ತಾನೆ?", "o": ["ಹಳ್ಳಿಯಲ್ಲಿ", "ನಗರದಲ್ಲಿ", "ಶಾಲೆಯಲ್ಲಿ"]}, {"q": "ರಾಮನ ಮನೆಯಲ್ಲಿ ಯಾರಿದ್ದಾರೆ?", "o": ["ತಾಯಿ, ತಂದೆ, ಸಹೋದರಿ", "ತಾಯಿ, ತಂದೆ, ಸಹೋದರ", "ಗುರು ಮತ್ತು ಸ್ನೇಹಿತ"]}, {"q": "'प्रतिदिनम्' ಎಂದರೆ?", "o": ["ಪ್ರತಿದಿನ", "ಇಂದು", "ನಾಳೆ"]}],
    "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 2, "t": "ಮಮ ಗೃಹಮ್", "d": "मम गृहम्",
    "lines": [["एतत् मम गृहम्।", "ಏತತ್ ಮಮ ಗೃಹಮ್", "ಇದು ನನ್ನ ಮನೆ"], ["गृहं सुन्दरम् अस्ति।", "ಗೃಹಂ ಸುನ್ದರಮ್ ಅಸ್ತಿ", "ಮನೆ ಸುಂದರವಾಗಿದೆ"], ["गृहे चत्वारि कोष्ठानि सन्ति।", "ಗೃಹೇ ಚತ್ವಾರಿ ಕೋಷ್ಠಾನಿ ಸನ್ತಿ", "ಮನೆಯಲ್ಲಿ ನಾಲ್ಕು ಕೋಣೆಗಳಿವೆ"], ["गृहस्य पुरतः एकः वृक्षः अस्ति।", "ಗೃಹಸ್ಯ ಪುರತಃ ಏಕಃ ವೃಕ್ಷಃ ಅಸ್ತಿ", "ಮನೆಯ ಮುಂದೆ ಒಂದು ಮರವಿದೆ"], ["वृक्षे खगाः वसन्ति।", "ವೃಕ್ಷೇ ಖಗಾಃ ವಸನ್ತಿ", "ಮರದಲ್ಲಿ ಹಕ್ಕಿಗಳು ವಾಸಿಸುತ್ತವೆ"], ["गृहस्य पृष्ठतः उद्यानम् अस्ति।", "ಗೃಹಸ್ಯ ಪೃಷ್ಠತಃ ಉದ್ಯಾನಮ್ ಅಸ್ತಿ", "ಮನೆಯ ಹಿಂದೆ ತೋಟವಿದೆ"], ["उद्याने मम माता पुष्पाणि पश्यति।", "ಉದ್ಯಾನೇ ಮಮ ಮಾತಾ ಪುಷ್ಪಾಣಿ ಪಶ್ಯತಿ", "ತೋಟದಲ್ಲಿ ನನ್ನ ತಾಯಿ ಹೂವುಗಳನ್ನು ನೋಡುತ್ತಾಳೆ"], ["मम गृहं मह्यं रोचते।", "ಮಮ ಗೃಹಂ ಮಹ್ಯಂ ರೋಚತೇ", "ನನಗೆ ನನ್ನ ಮನೆ ಇಷ್ಟ"]],
    "words": [["कोष्ठम्", "ಕೋಷ್ಠಮ್", "ಕೋಣೆ"], ["पुरतः", "ಪುರತಃ", "ಮುಂದೆ"], ["पृष्ठतः", "ಪೃಷ್ಠತಃ", "ಹಿಂದೆ"], ["खगः", "ಖಗಃ", "ಹಕ್ಕಿ"], ["उद्यानम्", "ಉದ್ಯಾನಮ್", "ತೋಟ"], ["मह्यं रोचते", "ಮಹ್ಯಂ ರೋಚತೇ", "ನನಗೆ ಇಷ್ಟ"]],
    "qs": [{"q": "ಮನೆಯಲ್ಲಿ ಎಷ್ಟು ಕೋಣೆಗಳಿವೆ?", "o": ["ನಾಲ್ಕು", "ಮೂರು", "ಎರಡು"]}, {"q": "ಮರ ಎಲ್ಲಿದೆ?", "o": ["ಮನೆಯ ಮುಂದೆ", "ಮನೆಯ ಹಿಂದೆ", "ತೋಟದಲ್ಲಿ"]}, {"q": "ತೋಟದಲ್ಲಿ ತಾಯಿ ಏನು ನೋಡುತ್ತಾಳೆ?", "o": ["ಹೂವುಗಳನ್ನು", "ಹಕ್ಕಿಗಳನ್ನು", "ಮರಗಳನ್ನು"]}],
    "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 3, "t": "ಪ್ರಾತಃಕಾಲಃ", "d": "प्रातःकालः",
    "lines": [["सूर्यः उदेति।", "ಸೂರ್ಯಃ ಉದೇತಿ", "ಸೂರ್ಯ ಉದಯಿಸುತ್ತಾನೆ"], ["अहं प्रातः उत्तिष्ठामि।", "ಅಹಂ ಪ್ರಾತಃ ಉತ್ತಿಷ್ಠಾಮಿ", "ನಾನು ಬೆಳಿಗ್ಗೆ ಏಳುತ್ತೇನೆ"], ["अहं मुखं प्रक्षालयामि।", "ಅಹಂ ಮುಖಂ ಪ್ರಕ್ಷಾಲಯಾಮಿ", "ನಾನು ಮುಖ ತೊಳೆಯುತ್ತೇನೆ"], ["ततः अहं दुग्धं पिबामि।", "ತತಃ ಅಹಂ ದುಗ್ಧಂ ಪಿಬಾಮಿ", "ಆಮೇಲೆ ನಾನು ಹಾಲು ಕುಡಿಯುತ್ತೇನೆ"], ["माता भोजनं पचति।", "ಮಾತಾ ಭೋಜನಂ ಪಚತಿ", "ತಾಯಿ ಅಡುಗೆ ಮಾಡುತ್ತಾಳೆ"], ["पिता पत्रिकां पठति।", "ಪಿತಾ ಪತ್ರಿಕಾಂ ಪಠತಿ", "ತಂದೆ ಪತ್ರಿಕೆ ಓದುತ್ತಾರೆ"], ["वयं सह भोजनं कुर्मः।", "ವಯಂ ಸಹ ಭೋಜನಂ ಕುರ್ಮಃ", "ನಾವು ಒಟ್ಟಿಗೆ ಊಟ ಮಾಡುತ್ತೇವೆ"], ["ततः अहं विद्यालयं गच्छामि।", "ತತಃ ಅಹಂ ವಿದ್ಯಾಲಯಂ ಗಚ್ಛಾಮಿ", "ಆಮೇಲೆ ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ"]],
    "words": [["उत्तिष्ठामि", "ಉತ್ತಿಷ್ಠಾಮಿ", "ಏಳುತ್ತೇನೆ"], ["प्रक्षालयामि", "ಪ್ರಕ್ಷಾಲಯಾಮಿ", "ತೊಳೆಯುತ್ತೇನೆ"], ["ततः", "ತತಃ", "ಆಮೇಲೆ"], ["पचति", "ಪಚತಿ", "ಅಡುಗೆ ಮಾಡುತ್ತಾಳೆ"], ["पत्रिका", "ಪತ್ರಿಕಾ", "ಪತ್ರಿಕೆ"], ["कुर्मः", "ಕುರ್ಮಃ", "ಮಾಡುತ್ತೇವೆ"]],
    "qs": [{"q": "ಎದ್ದ ಮೇಲೆ ಮೊದಲು ಏನು ಮಾಡುತ್ತಾನೆ?", "o": ["ಮುಖ ತೊಳೆಯುತ್ತಾನೆ", "ಹಾಲು ಕುಡಿಯುತ್ತಾನೆ", "ಶಾಲೆಗೆ ಹೋಗುತ್ತಾನೆ"]}, {"q": "ತಂದೆ ಏನು ಮಾಡುತ್ತಾರೆ?", "o": ["ಪತ್ರಿಕೆ ಓದುತ್ತಾರೆ", "ಅಡುಗೆ ಮಾಡುತ್ತಾರೆ", "ಹಾಲು ಕುಡಿಯುತ್ತಾರೆ"]}, {"q": "'ततः' ಎಂದರೆ?", "o": ["ಆಮೇಲೆ", "ಅಲ್ಲಿ", "ಇಂದು"]}],
    "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 4, "t": "ವಿದ್ಯಾಲಯಃ", "d": "विद्यालयः",
    "lines": [["एषः मम विद्यालयः।", "ಏಷಃ ಮಮ ವಿದ್ಯಾಲಯಃ", "ಇದು ನನ್ನ ಶಾಲೆ"], ["विद्यालये बहवः छात्राः सन्ति।", "ವಿದ್ಯಾಲಯೇ ಬಹವಃ ಛಾತ್ರಾಃ ಸನ್ತಿ", "ಶಾಲೆಯಲ್ಲಿ ಅನೇಕ ವಿದ್ಯಾರ್ಥಿಗಳಿದ್ದಾರೆ"], ["आचार्यः पाठं पाठयति।", "ಆಚಾರ್ಯಃ ಪಾಠಂ ಪಾಠಯತಿ", "ಆಚಾರ್ಯರು ಪಾಠ ಮಾಡುತ್ತಾರೆ"], ["छात्राः पाठं शृण्वन्ति।", "ಛಾತ್ರಾಃ ಪಾಠಂ ಶೃಣ್ವನ್ತಿ", "ವಿದ್ಯಾರ್ಥಿಗಳು ಪಾಠ ಕೇಳುತ್ತಾರೆ"], ["ते पुस्तकानि पठन्ति।", "ತೇ ಪುಸ್ತಕಾನಿ ಪಠನ್ತಿ", "ಅವರು ಪುಸ್ತಕಗಳನ್ನು ಓದುತ್ತಾರೆ"], ["ते लेखन्या लिखन्ति।", "ತೇ ಲೇಖನ್ಯಾ ಲಿಖನ್ತಿ", "ಅವರು ಲೇಖನಿಯಿಂದ ಬರೆಯುತ್ತಾರೆ"], ["मध्याह्ने वयं फलानि खादामः।", "ಮಧ್ಯಾಹ್ನೇ ವಯಂ ಫಲಾನಿ ಖಾದಾಮಃ", "ಮಧ್ಯಾಹ್ನ ನಾವು ಹಣ್ಣುಗಳನ್ನು ತಿನ್ನುತ್ತೇವೆ"], ["सायं वयं गृहं गच्छामः।", "ಸಾಯಂ ವಯಂ ಗೃಹಂ ಗಚ್ಛಾಮಃ", "ಸಂಜೆ ನಾವು ಮನೆಗೆ ಹೋಗುತ್ತೇವೆ"]],
    "words": [["बहवः", "ಬಹವಃ", "ಅನೇಕ"], ["पाठः", "ಪಾಠಃ", "ಪಾಠ"], ["पाठयति", "ಪಾಠಯತಿ", "ಪಾಠ ಮಾಡುತ್ತಾರೆ"], ["शृण्वन्ति", "ಶೃಣ್ವನ್ತಿ", "ಕೇಳುತ್ತಾರೆ"], ["लेखन्या", "ಲೇಖನ್ಯಾ", "ಲೇಖನಿಯಿಂದ"], ["मध्याह्ने", "ಮಧ್ಯಾಹ್ನೇ", "ಮಧ್ಯಾಹ್ನದಲ್ಲಿ"]],
    "qs": [{"q": "ಪಾಠ ಮಾಡುವವರು ಯಾರು?", "o": ["ಆಚಾರ್ಯರು", "ವಿದ್ಯಾರ್ಥಿಗಳು", "ತಂದೆ"]}, {"q": "ವಿದ್ಯಾರ್ಥಿಗಳು ಯಾವುದರಿಂದ ಬರೆಯುತ್ತಾರೆ?", "o": ["ಲೇಖನಿಯಿಂದ", "ಪುಸ್ತಕದಿಂದ", "ಕೈಯಿಂದ"]}, {"q": "ಮಧ್ಯಾಹ್ನ ಏನು ತಿನ್ನುತ್ತಾರೆ?", "o": ["ಹಣ್ಣುಗಳನ್ನು", "ಅನ್ನವನ್ನು", "ಹಾಲನ್ನು"]}],
    "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 5, "t": "ಉದ್ಯಾನಮ್", "d": "उद्यानम्",
    "lines": [["ग्रामे एकम् उद्यानम् अस्ति।", "ಗ್ರಾಮೇ ಏಕಮ್ ಉದ್ಯಾನಮ್ ಅಸ್ತಿ", "ಹಳ್ಳಿಯಲ್ಲಿ ಒಂದು ತೋಟವಿದೆ"], ["उद्याने वृक्षाः पुष्पाणि च सन्ति।", "ಉದ್ಯಾನೇ ವೃಕ್ಷಾಃ ಪುಷ್ಪಾಣಿ ಚ ಸನ್ತಿ", "ತೋಟದಲ್ಲಿ ಮರಗಳೂ ಹೂವುಗಳೂ ಇವೆ"], ["बालकाः बालिकाः च तत्र क्रीडन्ति।", "ಬಾಲಕಾಃ ಬಾಲಿಕಾಃ ಚ ತತ್ರ ಕ್ರೀಡನ್ತಿ", "ಹುಡುಗರೂ ಹುಡುಗಿಯರೂ ಅಲ್ಲಿ ಆಡುತ್ತಾರೆ"], ["एका बालिका पुष्पं पश्यति।", "ಏಕಾ ಬಾಲಿಕಾ ಪುಷ್ಪಂ ಪಶ್ಯತಿ", "ಒಬ್ಬ ಹುಡುಗಿ ಹೂವನ್ನು ನೋಡುತ್ತಾಳೆ"], ["पुष्पं सुन्दरम् अस्ति इति सा वदति।", "ಪುಷ್ಪಂ ಸುನ್ದರಮ್ ಅಸ್ತಿ ಇತಿ ಸಾ ವದತಿ", "'ಹೂವು ಸುಂದರವಾಗಿದೆ' ಎಂದು ಅವಳು ಹೇಳುತ್ತಾಳೆ"], ["एकः बालकः वृक्षस्य अधः उपविशति।", "ಏಕಃ ಬಾಲಕಃ ವೃಕ್ಷಸ್ಯ ಅಧಃ ಉಪವಿಶತಿ", "ಒಬ್ಬ ಹುಡುಗ ಮರದ ಕೆಳಗೆ ಕುಳಿತುಕೊಳ್ಳುತ್ತಾನೆ"], ["सः पुस्तकं पठति।", "ಸಃ ಪುಸ್ತಕಂ ಪಠತಿ", "ಅವನು ಪುಸ್ತಕ ಓದುತ್ತಾನೆ"], ["सायं सर्वे गृहं गच्छन्ति।", "ಸಾಯಂ ಸರ್ವೇ ಗೃಹಂ ಗಚ್ಛನ್ತಿ", "ಸಂಜೆ ಎಲ್ಲರೂ ಮನೆಗೆ ಹೋಗುತ್ತಾರೆ"]],
    "words": [["एकः / एका / एकम्", "ಏಕಃ / ಏಕಾ / ಏಕಮ್", "ಒಂದು (ಪು. / ಸ್ತ್ರೀ. / ನ.)"], ["क्रीडन्ति", "ಕ್ರೀಡನ್ತಿ", "ಆಡುತ್ತಾರೆ"], ["इति", "ಇತಿ", "ಎಂದು (ಮಾತು ಮುಗಿದ ಗುರುತು)"], ["अधः", "ಅಧಃ", "ಕೆಳಗೆ"], ["उपविशति", "ಉಪವಿಶತಿ", "ಕುಳಿತುಕೊಳ್ಳುತ್ತಾನೆ"], ["सर्वे", "ಸರ್ವೇ", "ಎಲ್ಲರೂ"]],
    "qs": [{"q": "ತೋಟ ಎಲ್ಲಿದೆ?", "o": ["ಹಳ್ಳಿಯಲ್ಲಿ", "ನಗರದಲ್ಲಿ", "ಶಾಲೆಯಲ್ಲಿ"]}, {"q": "ಹುಡುಗ ಎಲ್ಲಿ ಕುಳಿತುಕೊಳ್ಳುತ್ತಾನೆ?", "o": ["ಮರದ ಕೆಳಗೆ", "ಮನೆಯ ಮುಂದೆ", "ನದಿಯ ಬಳಿ"]}, {"q": "ಹುಡುಗಿ ಏನು ಹೇಳುತ್ತಾಳೆ?", "o": ["ಹೂವು ಸುಂದರವಾಗಿದೆ", "ಮರ ದೊಡ್ಡದಾಗಿದೆ", "ನಾನು ಮನೆಗೆ ಹೋಗುತ್ತೇನೆ"]}],
    "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 6, "t": "ನದೀ", "d": "नदी",
    "lines": [["मम ग्रामस्य समीपे एका नदी अस्ति।", "ಮಮ ಗ್ರಾಮಸ್ಯ ಸಮೀಪೇ ಏಕಾ ನದೀ ಅಸ್ತಿ", "ನನ್ನ ಹಳ್ಳಿಯ ಸಮೀಪ ಒಂದು ನದಿ ಇದೆ"], ["नद्याः जलं शीतलम् अस्ति।", "ನದ್ಯಾಃ ಜಲಂ ಶೀತಲಮ್ ಅಸ್ತಿ", "ನದಿಯ ನೀರು ತಂಪಾಗಿದೆ"], ["जनाः नद्यां स्नानं कुर्वन्ति।", "ಜನಾಃ ನದ್ಯಾಂ ಸ್ನಾನಂ ಕುರ್ವನ್ತಿ", "ಜನರು ನದಿಯಲ್ಲಿ ಸ್ನಾನ ಮಾಡುತ್ತಾರೆ"], ["कृषकाः जलेन क्षेत्राणि सिञ्चन्ति।", "ಕೃಷಕಾಃ ಜಲೇನ ಕ್ಷೇತ್ರಾಣಿ ಸಿಞ್ಚನ್ತಿ", "ರೈತರು ನೀರಿನಿಂದ ಹೊಲಗಳಿಗೆ ನೀರುಣಿಸುತ್ತಾರೆ"], ["नद्यां मत्स्याः सन्ति।", "ನದ್ಯಾಂ ಮತ್ಸ್ಯಾಃ ಸನ್ತಿ", "ನದಿಯಲ್ಲಿ ಮೀನುಗಳಿವೆ"], ["सायं बालकाः नदीतीरे क्रीडन्ति।", "ಸಾಯಂ ಬಾಲಕಾಃ ನದೀತೀರೇ ಕ್ರೀಡನ್ತಿ", "ಸಂಜೆ ಹುಡುಗರು ನದಿಯ ದಡದಲ್ಲಿ ಆಡುತ್ತಾರೆ"], ["नदी ग्रामस्य माता इव अस्ति।", "ನದೀ ಗ್ರಾಮಸ್ಯ ಮಾತಾ ಇವ ಅಸ್ತಿ", "ನದಿ ಹಳ್ಳಿಗೆ ತಾಯಿಯಂತೆ ಇದೆ"]],
    "words": [["समीपे", "ಸಮೀಪೇ", "ಸಮೀಪದಲ್ಲಿ"], ["शीतलम्", "ಶೀತಲಮ್", "ತಂಪು"], ["जनाः", "ಜನಾಃ", "ಜನರು"], ["स्नानम्", "ಸ್ನಾನಮ್", "ಸ್ನಾನ"], ["कृषकः", "ಕೃಷಕಃ", "ರೈತ"], ["क्षेत्रम्", "ಕ್ಷೇತ್ರಮ್", "ಹೊಲ"], ["सिञ्चन्ति", "ಸಿಞ್ಚನ್ತಿ", "ನೀರುಣಿಸುತ್ತಾರೆ"], ["मत्स्यः", "ಮತ್ಸ್ಯಃ", "ಮೀನು"], ["तीरम्", "ತೀರಮ್", "ದಡ"], ["इव", "ಇವ", "ಹಾಗೆ, ಅಂತೆ"]],
    "qs": [{"q": "ನದಿಯ ನೀರು ಹೇಗಿದೆ?", "o": ["ತಂಪಾಗಿದೆ", "ಬಿಸಿಯಾಗಿದೆ", "ಕೊಳಕಾಗಿದೆ"]}, {"q": "ರೈತರು ನೀರನ್ನು ಯಾವುದಕ್ಕೆ ಬಳಸುತ್ತಾರೆ?", "o": ["ಹೊಲಗಳಿಗೆ ನೀರುಣಿಸಲು", "ಸ್ನಾನಕ್ಕೆ", "ಕುಡಿಯಲು"]}, {"q": "ನದಿಯನ್ನು ಯಾರಿಗೆ ಹೋಲಿಸಲಾಗಿದೆ?", "o": ["ತಾಯಿಗೆ", "ತಂದೆಗೆ", "ಗುರುವಿಗೆ"]}],
    "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null},
  {"id": 7, "t": "ಸಿಂಹಃ ಮೂಷಕಃ ಚ", "d": "सिंहः मूषकः च",
    "lines": [["एकस्मिन् वने एकः सिंहः निद्रां करोति।", "ಏಕಸ್ಮಿನ್ ವನೇ ಏಕಃ ಸಿಂಹಃ ನಿದ್ರಾಂ ಕರೋತಿ", "ಒಂದು ಕಾಡಿನಲ್ಲಿ ಒಂದು ಸಿಂಹ ನಿದ್ರೆ ಮಾಡುತ್ತಿದೆ"], ["एकः मूषकः तस्य उपरि क्रीडति।", "ಏಕಃ ಮೂಷಕಃ ತಸ್ಯ ಉಪರಿ ಕ್ರೀಡತಿ", "ಒಂದು ಇಲಿ ಅದರ ಮೇಲೆ ಆಡುತ್ತದೆ"], ["सिंहः उत्तिष्ठति, मूषकं गृह्णाति।", "ಸಿಂಹಃ ಉತ್ತಿಷ್ಠತಿ, ಮೂಷಕಂ ಗೃಹ್ಣಾತಿ", "ಸಿಂಹ ಎದ್ದು ಇಲಿಯನ್ನು ಹಿಡಿಯುತ್ತದೆ"], ["मां मुञ्चतु, अहं भवतः साहाय्यं करिष्यामि इति मूषकः वदति।", "ಮಾಂ ಮುಞ್ಚತು, ಅಹಂ ಭವತಃ ಸಾಹಾಯ್ಯಂ ಕರಿಷ್ಯಾಮಿ ಇತಿ ಮೂಷಕಃ ವದತಿ", "'ನನ್ನನ್ನು ಬಿಡಿ, ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ' ಎಂದು ಇಲಿ ಹೇಳುತ್ತದೆ"], ["सिंहः हसति, मूषकं मुञ्चति।", "ಸಿಂಹಃ ಹಸತಿ, ಮೂಷಕಂ ಮುಞ್ಚತಿ", "ಸಿಂಹ ನಗುತ್ತದೆ, ಇಲಿಯನ್ನು ಬಿಡುತ್ತದೆ"], ["एकदा सिंहः जाले पतति।", "ಏಕದಾ ಸಿಂಹಃ ಜಾಲೇ ಪತತಿ", "ಒಂದು ದಿನ ಸಿಂಹ ಬಲೆಯಲ್ಲಿ ಬೀಳುತ್ತದೆ"], ["मूषकः आगच्छति, जालं कृन्तति।", "ಮೂಷಕಃ ಆಗಚ್ಛತಿ, ಜಾಲಂ ಕೃನ್ತತಿ", "ಇಲಿ ಬಂದು ಬಲೆಯನ್ನು ಕತ್ತರಿಸುತ್ತದೆ"], ["सिंहः मुक्तः भवति।", "ಸಿಂಹಃ ಮುಕ್ತಃ ಭವತಿ", "ಸಿಂಹ ಬಿಡುಗಡೆಯಾಗುತ್ತದೆ"], ["लघु मित्रम् अपि महत् साहाय्यं करोति।", "ಲಘು ಮಿತ್ರಮ್ ಅಪಿ ಮಹತ್ ಸಾಹಾಯ್ಯಂ ಕರೋತಿ", "ಸಣ್ಣ ಸ್ನೇಹಿತನೂ ದೊಡ್ಡ ಸಹಾಯ ಮಾಡುತ್ತಾನೆ"]],
    "words": [["वनम्", "ವನಮ್", "ಕಾಡು"], ["सिंहः", "ಸಿಂಹಃ", "ಸಿಂಹ"], ["मूषकः", "ಮೂಷಕಃ", "ಇಲಿ"], ["निद्रा", "ನಿದ್ರಾ", "ನಿದ್ರೆ"], ["उपरि", "ಉಪರಿ", "ಮೇಲೆ"], ["गृह्णाति", "ಗೃಹ್ಣಾತಿ", "ಹಿಡಿಯುತ್ತದೆ"], ["मुञ्चतु", "ಮುಞ್ಚತು", "ಬಿಡಿ"], ["साहाय्यम्", "ಸಾಹಾಯ್ಯಮ್", "ಸಹಾಯ"], ["करिष्यामि", "ಕರಿಷ್ಯಾಮಿ", "ಮಾಡುತ್ತೇನೆ (ಮುಂದೆ)"], ["इति", "ಇತಿ", "ಎಂದು"], ["हसति", "ಹಸತಿ", "ನಗುತ್ತದೆ"], ["एकदा", "ಏಕದಾ", "ಒಂದು ದಿನ"], ["जालम्", "ಜಾಲಮ್", "ಬಲೆ"], ["पतति", "ಪತತಿ", "ಬೀಳುತ್ತದೆ"], ["कृन्तति", "ಕೃನ್ತತಿ", "ಕತ್ತರಿಸುತ್ತದೆ"], ["मुक्तः", "ಮುಕ್ತಃ", "ಬಿಡುಗಡೆಯಾದ"], ["लघु", "ಲಘು", "ಸಣ್ಣ"], ["अपि", "ಅಪಿ", "ಕೂಡ"], ["महत्", "ಮಹತ್", "ದೊಡ್ಡ"]],
    "qs": [{"q": "ಇಲಿ ಎಲ್ಲಿ ಆಡುತ್ತಿತ್ತು?", "o": ["ಸಿಂಹದ ಮೇಲೆ", "ಮರದ ಮೇಲೆ", "ಬಲೆಯಲ್ಲಿ"]}, {"q": "ಸಿಂಹ ಇಲಿಯನ್ನು ಏಕೆ ಬಿಟ್ಟಿತು?", "o": ["ಇಲಿ ಸಹಾಯದ ಮಾತು ಹೇಳಿತು, ಸಿಂಹ ನಕ್ಕು ಬಿಟ್ಟಿತು", "ಇಲಿ ಓಡಿಹೋಯಿತು", "ಸಿಂಹಕ್ಕೆ ಹಸಿವಿರಲಿಲ್ಲ"]}, {"q": "ಕಥೆಯ ನೀತಿ ಏನು?", "o": ["ಸಣ್ಣ ಸ್ನೇಹಿತನೂ ದೊಡ್ಡ ಸಹಾಯ ಮಾಡಬಲ್ಲ", "ಸಿಂಹ ಬಲಶಾಲಿ", "ಇಲಿ ಚತುರ"]}],
    "status": "REVIEW_REQUIRED", "src": null, "reviewedBy": null, "reviewedOn": null}
];

