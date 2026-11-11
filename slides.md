# Payment Guard pitch: slide text

Exported from the team's Slides artifact. The slides' own HTML files are in `slides/`.

## 1. cover

UAE Hackathon 2026 · Challenge #29 · Cyber Resilience for SMEs
Payment Guard
Check it before you pay.
تحقق قبل أن تدفع
Ahmed · Javo · Adnan
For the Cyber Security Council
0:00 to 0:05. Just the name and the line: “Payment Guard. Check it before you pay.” Move straight on.

## 2. problem

The problem
The invoice looks right.
The bank account doesn’t.
47%
of UAE SMEs surveyed have been hit by a cyberattack
1 in 4
of those hit filed for bankruptcy, and 19% closed
31%
of attacks were phishing, and another 31% ransomware
No security staff, tight budgets, and an owner who has to decide alone whether to pay.
Source: Mastercard SME cybersecurity research, 23 April 2025. Over 1,000 UAE SME owners surveyed.
0:05 to 0:20 (15 seconds). Say: “Nearly half of UAE small businesses surveyed have been hit by a cyberattack, and a quarter of those filed for bankruptcy. They have no security staff. So here’s one owner’s day.” Then click to the demo slide. Say “surveyed”: it’s a survey of over 1,000 UAE small-business owners, not a national count. Of the UAE SMEs that were attacked, a quarter filed for bankruptcy and 19% closed. Malware was 32%; phishing, ransomware, hacking and digital skimming were 31% each. All read from the Mastercard release on 2026-11-10.

## 3. demo

Live demo
A scam lands in a real Gmail inbox.
Labelled “⛔ do not pay”
→
The owner’s phone buzzes
→
Forwarded on WhatsApp
→
Others warned
0:20 to 2:20, two minutes, live. Show this slide for 2 seconds, then switch to Gmail. 0:25 drop email 1: label appears, phone buzzes. 0:55 open the note: who to call. 1:15 drop email 5, the spoofed sender. 1:35 forward the fake Etisalat text on WhatsApp, then reply REPORT. 2:05 web page: shared warnings, then click Arabic. 2:20 back to the slides, on the pathway. If Gmail or WhatsApp fails, play the backup video. Full script: pitch/demo-script/demo.md.

## 4. pathway

What we built
A working slice of the SME Cyber Care Pathway
R2
Verify
Scam emails labelled “⛔ do not pay” in the shop’s own Gmail. Anything forwarded on WhatsApp, checked in seconds.
R3
Know who to call
Every warning names the first call: the supplier on the number on file, the bank, or the Cyber Security Council.
R5
Shared warnings
One business’s report warns others in its sector, without names. Independent reports confirm it.
Understand risks
A 10-question ransomware readiness check, and a response card to print and keep by the till.
2:20 to 2:40 (20 seconds). Say: “What you just saw is four steps of the SME Cyber Care Pathway the challenge asks for. A plain verdict, that’s R2. Who to call, R3. Warnings shared between businesses, R5. And a ransomware readiness check. All running today, in the apps owners already use.” R1 and R4 are out of scope; say so only if asked.

## 5. ask

Next, and our ask
Put it in front of 20 real shops
We’re asking for
1. A 3-month pilot with 20 small businesses, through a free zone or a chamber of commerce.
2. An introduction to the right team at the UAE Cyber Security Council, so owners’ reports reach the national channel.
What comes next
Before anyone hosts it:
login, encrypted mailbox access, and a security review.
Product:
setup on the web page instead of a settings file, Outlook tested on real mailboxes, and real threat feeds.
Price:
free during the pilot. We’ll set the price from what the pilot actually costs to run, not guess it today.
2:40 to 3:00 (20 seconds). Say only the left column: “We’re asking for a 3-month pilot with 20 shops through a free zone or chamber, and an introduction at the Cyber Security Council. Thank you.” Leave this slide up for questions; the backup slides follow it. Free zones, chambers and banks could offer this to their members: we have no partners yet, so say “could”, not “will”. Price: deliberately no number. Running costs are WhatsApp messages, hosting and support, and the pilot measures them. If pushed: a free tier for checks and shared warnings, with inbox protection and phone alerts as the paid part. This ask is a proposal from Adnan’s pitch work; agree it with Ahmed and Javo before the pitch.

## 6. challenge

The challenge asks
“How might we enable SMEs across the UAE to protect themselves from everyday threats like phishing, invoice fraud, and ransomware…”
Cause
The gap
What Payment Guard does
R2
Advice isn’t turned into decisions
A plain verdict: Stop, Needs a look, Safe
R3
Owners don’t know who to contact
Every warning names the first call
R5
Shared learning is hard
One report warns others in its sector
Out of scope, and we say so: R1 and R4 (business-continuity governance, supplier contracts).
The R2, R3 and R5 wording here is our paraphrase. Before presenting, replace it with the exact wording from the challenge profile PDF (Challenge_Profile_29_CyberSecurityCouncil_Designed.pdf). Say plainly that we chose three of the five root causes we can actually show working.

## 7. channels

No website to remember
It works where scams arrive
Email:
scams labelled in the shop’s own inbox, with a note saying who to call
Phone:
a WhatsApp alert the moment a scam is stopped
WhatsApp:
forward any message, PDF or screenshot to one number
Web page:
the full evidence, side by side
WhatsApp · Payment Guard
⛔ Payment Guard: don’t pay.
The email from billing@zafranpackaging.ae (Invoice INV-2044, updated bank details): it changes the bank account.
Call Zafran Packaging LLC on +971 4 000 0101, the number you have on file.
The real alert from our demo invoice email
The alert text on the right is the bot’s real output for demo email 1, generated against the real backend. The supplier’s phone number comes from the trusted supplier list, never from the email, so a scammer can’t put their own number in the warning. When Javo’s Gmail screenshots exist, add one beside the phone.

## 8. trust

Why it can be trusted
Built so owners and the Council can rely on it
Explainable rules
Every warning says why, in plain Arabic or English. No AI guessing, and it runs on a laptop without the cloud.
Hard to abuse
One report is a warning. It takes independent reports to confirm, so a competitor can’t get a supplier blocked.
Private by design
It never stores email or message content. Logs keep only the verdict and the reasons.
Fits the national strategy
Governance, protection, innovation, establishing and building, and partnership: one line each in our strategy mapping.
Pillar names are as quoted from Dr Mohammed Al Kuwaiti, head of the UAE Cyber Security Council (CybersecAsia, May 2025). The official 2025-2031 text isn’t public online, and other sources word the pillars differently, so use this wording. The mapping per pillar is in pitch/evidence/strategy-mapping.md. The Threat Exchange runs on mock data: say so if asked.
