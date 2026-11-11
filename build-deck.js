// Builds the Payment Guard pitch deck. Content from Adnan's slides (pitch/), colours from frontend/src/index.css.
const pptxgen = require("pptxgenjs");

const OUT = process.argv[2] || "payment-guard-pitch.pptx";

const C = {
  sand: "E8E1D1",
  raised: "F1EBDD",
  white: "FFFFFF",
  ink: "1C2B2D",
  muted: "5B6B67",
  rule: "D2C8AC",
  teal: "0F5257",
  tealDark: "0A3B3F",
  tealSoft: "2C6C71",
  hold: "A63D2F",
  holdTint: "F3DDD7",
  review: "C98A2A",
  reviewTint: "F6E9CF",
  safe: "3F7A52",
  safeTint: "E2EBDD",
};
const FONT = "Arial";
const W = 10;
const H = 5.625;
const M = 0.55; // outer margin

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Payment Guard: check it before you pay";
pres.author = "Ahmed · Javo · Adnan";

// ---------- helpers ----------

function text(slide, value, opts) {
  slide.addText(value, { fontFace: FONT, color: C.ink, margin: 0, valign: "top", ...opts });
}

function arabic(slide, value, opts) {
  text(slide, value, { rtlMode: true, lang: "ar-AE", align: "right", ...opts });
}

/** The seal logo: a filled circle, a dashed inner ring and a tick, as in the app. */
function seal(slide, x, y, d, fill, ink) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 } });
  const inset = d * 0.12;
  slide.addShape(pres.shapes.OVAL, {
    x: x + inset, y: y + inset, w: d - 2 * inset, h: d - 2 * inset,
    fill: { type: "none" }, line: { color: ink, width: Math.max(1, d * 1.6), dashType: "sysDash" },
  });
  // Tick as a custom path, so it doesn't depend on a symbol font.
  const s = d / 32;
  slide.addShape(pres.shapes.CUSTOM_GEOMETRY, {
    x: x + 10.5 * s, y: y + 12.3 * s, w: 11.2 * s, h: 8 * s,
    points: [{ x: 0, y: 4.2 * s }, { x: 3.8 * s, y: 8 * s }, { x: 11.2 * s, y: 0 }],
    line: { color: ink, width: Math.max(1.5, d * 3.2), cap: "round" },
    fill: { type: "none" },
  });
}

function eyebrow(slide, value, color = C.teal) {
  text(slide, value, { x: M, y: 0.45, w: 7, h: 0.3, fontSize: 12, bold: true, color, charSpacing: 1 });
}

function title(slide, value, opts = {}) {
  text(slide, value, { x: M, y: 0.78, w: W - 2 * M, h: 0.75, fontSize: 32, bold: true, ...opts });
}

function backupTag(slide) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: W - M - 0.95, y: 0.4, w: 0.95, h: 0.32, rectRadius: 0.08,
    fill: { color: C.raised }, line: { color: C.rule, width: 0.75 },
  });
  text(slide, "BACKUP", { x: W - M - 0.95, y: 0.4, w: 0.95, h: 0.32, fontSize: 10, bold: true, color: C.muted, align: "center", valign: "middle", charSpacing: 1 });
}

function card(slide, x, y, w, h, fill = C.white) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: C.rule, width: 0.75 },
  });
}

function numberDot(slide, n, x, y, d = 0.36, fill = C.teal) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 } });
  text(slide, String(n), { x, y, w: d, h: d, fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle" });
}

function chip(slide, label, x, y, fill, color = C.white, w = 0.55) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.3, rectRadius: 0.08, fill: { color: fill }, line: { color: fill, width: 0 } });
  text(slide, label, { x, y, w, h: 0.3, fontSize: 11, bold: true, color, align: "center", valign: "middle" });
}

// ---------- 1. Cover ----------
{
  const s = pres.addSlide();
  s.background = { color: C.teal };
  seal(s, M, 0.62, 0.85, C.sand, C.teal);
  text(s, "UAE HACKATHON 2026  ·  CHALLENGE #29  ·  CYBER RESILIENCE FOR SMEs", {
    x: M, y: 1.75, w: W - 2 * M, h: 0.3, fontSize: 11, bold: true, color: "B7D0CC", charSpacing: 1,
  });
  text(s, "Payment Guard", { x: M, y: 2.05, w: W - 2 * M, h: 0.95, fontSize: 54, bold: true, color: C.white });
  text(s, "Check it before you pay.", { x: M, y: 3.0, w: 6, h: 0.5, fontSize: 24, color: C.sand });
  arabic(s, "تحقق قبل أن تدفع", { x: W - M - 3.4, y: 3.0, w: 3.4, h: 0.5, fontSize: 24, color: C.sand });
  text(s, "Ahmed  ·  Javo  ·  Adnan", { x: M, y: 4.55, w: 4.5, h: 0.35, fontSize: 14, bold: true, color: C.white });
  text(s, "For the UAE Cyber Security Council", { x: W - M - 4.5, y: 4.55, w: 4.5, h: 0.35, fontSize: 14, color: "B7D0CC", align: "right" });
  s.addNotes("0:00 to 0:05. Just the name and the line: \"Payment Guard. Check it before you pay.\" Move straight on.");
}

// ---------- 2. Problem ----------
{
  const s = pres.addSlide();
  s.background = { color: C.sand };
  eyebrow(s, "THE PROBLEM");
  text(s, [
    { text: "The invoice looks right.", options: { breakLine: true } },
    { text: "The bank account doesn't.", options: { color: C.hold } },
  ], { x: M, y: 0.8, w: W - 2 * M, h: 1.15, fontSize: 32, bold: true });

  const stats = [
    { n: "47%", label: "of UAE SMEs surveyed have been hit by a cyberattack", color: C.hold },
    { n: "1 in 4", label: "of those hit filed for bankruptcy, and 19% closed", color: C.hold },
    { n: "31%", label: "of attacks were phishing, and another 31% ransomware", color: C.teal },
  ];
  const cw = (W - 2 * M - 2 * 0.3) / 3;
  stats.forEach((st, i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 2.15, cw, 1.75);
    text(s, st.n, { x: x + 0.25, y: 2.3, w: cw - 0.5, h: 0.8, fontSize: 44, bold: true, color: st.color });
    text(s, st.label, { x: x + 0.25, y: 3.1, w: cw - 0.5, h: 0.7, fontSize: 13, color: C.ink });
  });
  text(s, "No security staff, tight budgets, and an owner who has to decide alone whether to pay.", {
    x: M, y: 4.15, w: W - 2 * M, h: 0.4, fontSize: 15, bold: true, color: C.teal,
  });
  text(s, "Source: Mastercard SME cybersecurity research, 23 April 2025. Over 1,000 UAE SME owners surveyed.", {
    x: M, y: 4.95, w: W - 2 * M, h: 0.3, fontSize: 10, color: C.muted,
  });
  s.addNotes(
    "0:05 to 0:20 (15 seconds). Say: \"Nearly half of UAE small businesses surveyed have been hit by a cyberattack, and a quarter of those filed for bankruptcy. They have no security staff. So here's one owner's day.\" Then click to the demo slide.\n\n" +
    "Say \"surveyed\": it's a survey of over 1,000 UAE small-business owners, not a national count. Say \"filed for bankruptcy\", not \"went bankrupt\". Of the UAE SMEs that were attacked, a quarter filed for bankruptcy and 19% closed. Malware was 32%; phishing, ransomware, hacking and digital skimming were 31% each. Source: Mastercard release, 23 April 2025.",
  );
}

// ---------- 3. Live demo ----------
{
  const s = pres.addSlide();
  s.background = { color: C.sand };
  eyebrow(s, "LIVE DEMO");
  title(s, "A scam lands in a real Gmail inbox.");

  const steps = [
    { head: "Labelled", body: "\"do not pay\" in the shop's own Gmail", fill: C.holdTint, accent: C.hold },
    { head: "Phone buzzes", body: "a WhatsApp alert before anyone pays", fill: C.white, accent: C.teal },
    { head: "Forwarded", body: "any message or screenshot on WhatsApp", fill: C.white, accent: C.teal },
    { head: "Others warned", body: "shared with businesses in the sector", fill: C.white, accent: C.teal },
  ];
  const gap = 0.42;
  const bw = (W - 2 * M - 3 * gap) / 4;
  steps.forEach((st, i) => {
    const x = M + i * (bw + gap);
    card(s, x, 2.0, bw, 2.1, st.fill);
    numberDot(s, i + 1, x + 0.22, 2.2, 0.42, st.accent);
    text(s, st.head, { x: x + 0.22, y: 2.8, w: bw - 0.44, h: 0.35, fontSize: 15, bold: true, color: i === 0 ? C.hold : C.ink, fit: "shrink" });
    text(s, st.body, { x: x + 0.22, y: 3.25, w: bw - 0.44, h: 0.75, fontSize: 12, color: C.muted });
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.RIGHT_ARROW, {
        x: x + bw + 0.08, y: 2.92, w: gap - 0.16, h: 0.26, fill: { color: C.teal }, line: { color: C.teal, width: 0 },
      });
    }
  });
  text(s, "Two minutes, live. If Gmail or WhatsApp fails, the backup video plays.", {
    x: M, y: 4.5, w: W - 2 * M, h: 0.35, fontSize: 12, italic: true, color: C.muted,
  });
  s.addNotes(
    "0:20 to 2:20, two minutes, live. Show this slide for 2 seconds, then switch to Gmail.\n" +
    "0:25 drop email 1: the label appears and the phone buzzes.\n" +
    "0:55 open the note: who to call.\n" +
    "1:15 drop email 5, the spoofed sender.\n" +
    "1:35 forward the fake Etisalat text on WhatsApp, then reply REPORT.\n" +
    "2:05 web page: shared warnings, then click Arabic.\n" +
    "2:20 back to the slides, on the pathway.\n" +
    "If Gmail or WhatsApp fails, play the backup video. Full script: pitch/demo-script/demo.md.",
  );
}

// ---------- 4. Pathway ----------
{
  const s = pres.addSlide();
  s.background = { color: C.sand };
  eyebrow(s, "WHAT WE BUILT");
  title(s, "A working slice of the SME Cyber Care Pathway", { fontSize: 27 });

  const items = [
    { tag: "R2", head: "Verify", body: "Scam emails labelled \"do not pay\" in the shop's own Gmail. Anything forwarded on WhatsApp, checked in seconds.", fill: C.holdTint, chipFill: C.hold },
    { tag: "R3", head: "Know who to call", body: "Every warning names the first call: the supplier on the number on file, the bank, or the Cyber Security Council.", fill: C.reviewTint, chipFill: C.review },
    { tag: "R5", head: "Shared warnings", body: "One business's report warns others in its sector, without names. Independent reports confirm it.", fill: C.safeTint, chipFill: C.safe },
    { tag: "+", head: "Understand risks", body: "A 10-question ransomware readiness check, and a response card to print and keep by the till.", fill: C.white, chipFill: C.teal },
  ];
  const gw = (W - 2 * M - 0.3) / 2;
  const gh = 1.42;
  items.forEach((it, i) => {
    const x = M + (i % 2) * (gw + 0.3);
    const y = 1.72 + Math.floor(i / 2) * (gh + 0.25);
    card(s, x, y, gw, gh, it.fill);
    chip(s, it.tag, x + 0.25, y + 0.22, it.chipFill);
    text(s, it.head, { x: x + 0.95, y: y + 0.2, w: gw - 1.2, h: 0.36, fontSize: 17, bold: true });
    text(s, it.body, { x: x + 0.25, y: y + 0.66, w: gw - 0.5, h: 0.66, fontSize: 12, color: C.ink });
  });
  s.addNotes(
    "2:20 to 2:40 (20 seconds). Say: \"What you just saw is four steps of the SME Cyber Care Pathway the challenge asks for. A plain verdict, that's R2. Who to call, R3. Warnings shared between businesses, R5. And a ransomware readiness check. All running today, in the apps owners already use.\"\n\n" +
    "R1 and R4 are out of scope; say so only if asked.",
  );
}

// ---------- 5. Ask ----------
{
  const s = pres.addSlide();
  s.background = { color: C.teal };
  text(s, "NEXT, AND OUR ASK", { x: M, y: 0.45, w: 7, h: 0.3, fontSize: 12, bold: true, color: "B7D0CC", charSpacing: 1 });
  text(s, "Put it in front of 20 real shops", { x: M, y: 0.78, w: W - 2 * M, h: 0.75, fontSize: 32, bold: true, color: C.white });

  const lw = 4.35;
  text(s, "We're asking for", { x: M, y: 1.75, w: lw, h: 0.35, fontSize: 15, bold: true, color: C.sand });
  const asks = [
    "A 3-month pilot with 20 small businesses, through a free zone or a chamber of commerce.",
    "An introduction to the right team at the UAE Cyber Security Council, so owners' reports reach the national channel.",
  ];
  asks.forEach((a, i) => {
    const y = 2.2 + i * 1.15;
    s.addShape(pres.shapes.OVAL, { x: M, y, w: 0.4, h: 0.4, fill: { color: C.sand }, line: { color: C.sand, width: 0 } });
    text(s, String(i + 1), { x: M, y, w: 0.4, h: 0.4, fontSize: 15, bold: true, color: C.teal, align: "center", valign: "middle" });
    text(s, a, { x: M + 0.6, y: y - 0.02, w: lw - 0.6, h: 0.95, fontSize: 15, color: C.white });
  });

  const rx = M + lw + 0.45;
  const rw = W - M - rx;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rx, y: 1.7, w: rw, h: 2.85, rectRadius: 0.1, fill: { color: C.tealDark }, line: { color: C.tealSoft, width: 0.75 },
  });
  text(s, "What comes next", { x: rx + 0.3, y: 1.88, w: rw - 0.6, h: 0.35, fontSize: 14, bold: true, color: C.sand });
  text(s, [
    { text: "Before anyone hosts it: ", options: { bold: true, color: C.white } },
    { text: "login, encrypted mailbox access, and a security review.", options: { color: "D7E3E1", breakLine: true } },
    { text: "Product: ", options: { bold: true, color: C.white } },
    { text: "setup on the web page, Outlook tested on real mailboxes, and real threat feeds.", options: { color: "D7E3E1", breakLine: true } },
    { text: "Price: ", options: { bold: true, color: C.white } },
    { text: "free during the pilot. We'll set the price from what the pilot actually costs to run.", options: { color: "D7E3E1" } },
  ], { x: rx + 0.3, y: 2.3, w: rw - 0.6, h: 2.1, fontSize: 12.5, paraSpaceAfter: 9 });
  s.addNotes(
    "2:40 to 3:00 (20 seconds). Say only the left column: \"We're asking for a 3-month pilot with 20 shops through a free zone or chamber, and an introduction at the Cyber Security Council. Thank you.\" Leave this slide up for questions; the backup slides follow it.\n\n" +
    "Free zones, chambers and banks could offer this to their members: we have no partners yet, so say \"could\", not \"will\".\n" +
    "Price: deliberately no number. Running costs are WhatsApp messages, hosting and support, and the pilot measures them. If pushed: a free tier for checks and shared warnings, with inbox protection and phone alerts as the paid part.\n" +
    "This ask is a proposal from Adnan's pitch work; agree it with Ahmed and Javo before the pitch.",
  );
}

// ---------- 6. Backup: the challenge ----------
{
  const s = pres.addSlide();
  s.background = { color: C.sand };
  backupTag(s);
  eyebrow(s, "THE CHALLENGE ASKS");
  text(s, "“How might we enable SMEs across the UAE to protect themselves from everyday threats like phishing, invoice fraud, and ransomware…”", {
    x: M, y: 0.8, w: W - 2 * M - 1.1, h: 0.9, fontSize: 18, italic: true, color: C.teal,
  });
  const head = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.teal } } });
  const rows = [
    [head("Cause"), head("The gap"), head("What Payment Guard does")],
    ["R2", "Advice isn't turned into decisions", "A plain verdict: Stop, Needs a look, Safe"],
    ["R3", "Owners don't know who to contact", "Every warning names the first call"],
    ["R5", "Shared learning is hard", "One report warns others in its sector"],
  ].map((row, r) => row.map((cell) => (typeof cell === "string" ? { text: cell, options: { fill: { color: r % 2 ? C.white : C.raised }, bold: cell.length <= 2 } } : cell)));
  s.addTable(rows, {
    x: M, y: 1.95, w: W - 2 * M, colW: [1.0, 3.6, W - 2 * M - 4.6],
    fontFace: FONT, fontSize: 13, color: C.ink, border: { type: "solid", color: C.rule, pt: 0.75 },
    rowH: 0.5, valign: "middle", margin: [0, 0.1, 0, 0.1],
  });
  text(s, "Out of scope, and we say so: R1 and R4 (business-continuity governance, supplier contracts).", {
    x: M, y: 4.3, w: W - 2 * M, h: 0.35, fontSize: 12, color: C.muted,
  });
  s.addNotes(
    "Backup slide. The R2, R3 and R5 wording here is our paraphrase. Before presenting, replace it with the exact wording from the challenge profile PDF (Challenge_Profile_29_CyberSecurityCouncil_Designed.pdf). Say plainly that we chose three of the five root causes we can actually show working.",
  );
}

// ---------- 7. Backup: channels ----------
{
  const s = pres.addSlide();
  s.background = { color: C.sand };
  backupTag(s);
  eyebrow(s, "NO WEBSITE TO REMEMBER");
  title(s, "It works where scams arrive", { w: 5.6, fontSize: 28 });

  const rows = [
    ["Email", "scams labelled in the shop's own inbox, with a note saying who to call"],
    ["Phone", "a WhatsApp alert the moment a scam is stopped"],
    ["WhatsApp", "forward any message, PDF or screenshot to one number"],
    ["Web page", "the full evidence, side by side"],
  ];
  rows.forEach(([head, body], i) => {
    const y = 1.65 + i * 0.86;
    numberDot(s, i + 1, M, y + 0.02, 0.38);
    text(s, head, { x: M + 0.55, y, w: 5.3, h: 0.3, fontSize: 15, bold: true });
    text(s, body, { x: M + 0.55, y: y + 0.31, w: 5.3, h: 0.45, fontSize: 11.5, color: C.muted });
  });

  // Phone with the real alert from demo email 1.
  const px = 6.6, py = 0.95, pw = 2.85, ph = 4.15;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px, y: py, w: pw, h: ph, rectRadius: 0.3, fill: { color: C.ink }, line: { color: C.ink, width: 0 } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px + 0.12, y: py + 0.12, w: pw - 0.24, h: ph - 0.24, rectRadius: 0.22, fill: { color: "ECE5DA" }, line: { color: "ECE5DA", width: 0 } });
  text(s, "WhatsApp  ·  Payment Guard", { x: px + 0.3, y: py + 0.3, w: pw - 0.6, h: 0.3, fontSize: 10, bold: true, color: C.muted });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px + 0.3, y: py + 0.7, w: pw - 0.6, h: 2.7, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.rule, width: 0.5 } });
  text(s, [
    { text: "Payment Guard: don't pay.", options: { bold: true, color: C.hold, breakLine: true } },
    { text: "The email from billing@zafranpackaging.ae (Invoice INV-2044, updated bank details): it changes the bank account.", options: { breakLine: true } },
    { text: "Call Zafran Packaging LLC on +971 4 000 0101, the number you have on file.", options: { bold: true } },
  ], { x: px + 0.45, y: py + 0.85, w: pw - 0.9, h: 2.45, fontSize: 11, paraSpaceAfter: 7 });
  text(s, "The real alert for our demo invoice email", { x: px, y: py + ph + 0.05, w: pw, h: 0.25, fontSize: 9.5, italic: true, color: C.muted, align: "center" });
  s.addNotes(
    "Backup slide. The alert text on the right is the bot's real output for demo email 1, generated against the real backend. The supplier's phone number comes from the trusted supplier list, never from the email, so a scammer can't put their own number in the warning. When Javo's Gmail screenshots exist, add one beside the phone.",
  );
}

// ---------- 8. Backup: trust ----------
{
  const s = pres.addSlide();
  s.background = { color: C.sand };
  backupTag(s);
  eyebrow(s, "WHY IT CAN BE TRUSTED");
  title(s, "Built so owners and the Council can rely on it", { fontSize: 27 });

  const items = [
    ["Explainable rules", "Every warning says why, in plain Arabic or English. Fixed rules, no AI guessing."],
    ["Hard to abuse", "One report is a warning. It takes independent reports to confirm, so a competitor can't get a supplier blocked."],
    ["Private by design", "It never stores email or message content. Logs keep only the verdict and the reasons."],
    ["Fits the national strategy", "Governance, protection, innovation, establishing and building, and partnership: one line each in our strategy mapping."],
  ];
  const gw = (W - 2 * M - 0.3) / 2;
  const gh = 1.5;
  items.forEach(([head, body], i) => {
    const x = M + (i % 2) * (gw + 0.3);
    const y = 1.72 + Math.floor(i / 2) * (gh + 0.25);
    card(s, x, y, gw, gh);
    seal(s, x + 0.22, y + 0.2, 0.42, C.teal, C.sand);
    text(s, head, { x: x + 0.8, y: y + 0.24, w: gw - 1.0, h: 0.36, fontSize: 16, bold: true });
    text(s, body, { x: x + 0.25, y: y + 0.72, w: gw - 0.5, h: 0.7, fontSize: 12, color: C.ink });
  });
  s.addNotes(
    "Backup slide. Pillar names are as quoted from Dr Mohammed Al Kuwaiti, head of the UAE Cyber Security Council (CybersecAsia, May 2025). The official 2025-2031 text isn't public online, and other sources word the pillars differently, so use this wording. The mapping per pillar is in pitch/evidence/strategy-mapping.md.\n\n" +
    "The Threat Exchange runs on mock data in the demo: say so if asked. The checks themselves run locally; the WhatsApp part uses Twilio online.",
  );
}

pres.writeFile({ fileName: OUT }).then((file) => console.log("wrote " + file));
