const fs = require('fs');
const path = require('path');

console.log('--- STARTING COMPREHENSIVE LANDING PAGE VALIDATION ---');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'css', 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'js', 'main.js'), 'utf8');

// 1. SECTION ORDER CHECK
const sections = [
  { name: 'Navbar', match: /id="mainNavbar"/ },
  { name: 'Hero', match: /id="hero"/ },
  { name: 'Trust strip', match: /class="[^"]*trust-strip-section[^"]*"/ },
  { name: 'Services / Treatments', match: /id="treatments"/ },
  { name: 'About Doctor', match: /id="about"/ },
  { name: 'Stats Counters', match: /class="stats-section"/ },
  { name: 'Treated Cases', match: /id="cases"/ },
  { name: 'Video Testimonials', match: /id="video-stories"/ },
  { name: 'Patient Reviews', match: /id="testimonials"/ },
  { name: 'Why Choose Us', match: /id="why-choose"/ },
  { name: 'OPD Locations', match: /id="locations"/ },
  { name: 'Appointment CTA & Form', match: /id="appointment"/ },
  { name: 'Footer', match: /class="footer-custom"/ },
  { name: 'Floating WhatsApp', match: /class="floating-whatsapp"/ },
  { name: 'Mobile Bottom Bar', match: /class="mobile-bottom-bar"/ },
  { name: 'Back to Top', match: /id="backToTopBtn"/ }
];

let lastIndex = -1;
let sectionOrderPassed = true;

sections.forEach(sec => {
  const match = html.search(sec.match);
  if (match === -1) {
    console.error(`[FAIL] Section missing: ${sec.name}`);
    sectionOrderPassed = false;
  } else if (match < lastIndex) {
    console.error(`[FAIL] Section out of order: ${sec.name} (found at index ${match}, previous at ${lastIndex})`);
    sectionOrderPassed = false;
  } else {
    console.log(`[PASS] Section present & in order: ${sec.name}`);
    lastIndex = match;
  }
});

// 2. CHECK KEY CREDENTIALS & DOCTOR CONTENT
const requiredContent = [
  'Dr. Chandresh Sharma',
  'MS',
  'FARS (Germany)',
  'Lifeline Multispeciality Hospital',
  'Chandra Bhushan Hospital',
  '+91 93164 31010',
  '+91 84018 87129',
  '079 48008073',
  'chand85_ms@yahoo.co.in',
  '1000+', // or data-target="1000"
  '8000+',
  '2000+',
  '16+ Years',
  'Dharmishthaben Bhatt',
  'Manoj Makawana',
  'Jayeshkumar Vankar',
  'Mahesh Prajapati',
  'Vikas Rathore'
];

requiredContent.forEach(item => {
  if (html.includes(item) || js.includes(item)) {
    console.log(`[PASS] Content found: "${item}"`);
  } else {
    console.warn(`[WARN] Content not found: "${item}"`);
  }
});

// 3. CHECK LOCAL ASSET REFERENCES
const assetRegex = /(?:src|href)="([^"]+\.(?:svg|png|jpg|jpeg|gif))"/g;
let assetMatch;
let missingAssets = 0;

while ((assetMatch = assetRegex.exec(html)) !== null) {
  const assetPath = assetMatch[1];
  if (!assetPath.startsWith('http://') && !assetPath.startsWith('https://')) {
    const fullPath = path.join(__dirname, assetPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`[FAIL] Asset referenced but missing on disk: ${assetPath}`);
      missingAssets++;
    }
  }
}

if (missingAssets === 0) {
  console.log('[PASS] All local asset references exist on disk!');
}

// 4. CHECK NO EMOJIS ARE USED
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
if (emojiRegex.test(html)) {
  console.error('[FAIL] Emojis found in HTML! All icons must be from icon library.');
} else {
  console.log('[PASS] Zero emojis in HTML! All icons use Bootstrap Icons.');
}

// 5. CHECK PREFERS-REDUCED-MOTION IN CSS
if (css.includes('prefers-reduced-motion')) {
  console.log('[PASS] prefers-reduced-motion media query found in CSS.');
} else {
  console.error('[FAIL] prefers-reduced-motion media query missing in CSS.');
}

// 6. CHECK CSS VARIABLES FOR ALL COLORS
const cssVars = ['--primary', '--secondary', '--accent', '--bg', '--surface', '--text', '--muted'];
cssVars.forEach(v => {
  if (css.includes(v + ':')) {
    console.log(`[PASS] Design token defined: ${v}`);
  } else {
    console.error(`[FAIL] Design token missing: ${v}`);
  }
});

console.log('--- VALIDATION SUMMARY COMPLETE ---');
