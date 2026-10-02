const fs = require('fs');
const path = require('path');

const hospitalLogos = [
  {
    name: 'lifeline.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 54" width="220" height="54" fill="none">
      <rect width="220" height="54" rx="8" fill="#F8FAFC"/>
      <g transform="translate(12, 10)">
        <circle cx="17" cy="17" r="17" fill="#0B3C5D"/>
        <path d="M7 17H12L15 11L19 23L22 17H27" stroke="#1FA2A6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <text x="54" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#0B3C5D">LIFELINE</text>
      <text x="54" y="38" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#6B7280" letter-spacing="1">MULTISPECIALITY HOSPITAL</text>
    </svg>`
  },
  {
    name: 'hcg.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 54" width="200" height="54" fill="none">
      <rect width="200" height="54" rx="8" fill="#F8FAFC"/>
      <g transform="translate(12, 10)">
        <rect width="34" height="34" rx="7" fill="#1FA2A6"/>
        <text x="17" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">HCG</text>
      </g>
      <text x="56" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#0B3C5D">HCG HOSPITALS</text>
      <text x="56" y="38" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#6B7280" letter-spacing="1">AHMEDABAD CENTRE</text>
    </svg>`
  },
  {
    name: 'sterling.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 54" width="210" height="54" fill="none">
      <rect width="210" height="54" rx="8" fill="#F8FAFC"/>
      <g transform="translate(12, 10)">
        <circle cx="17" cy="17" r="17" fill="#0B3C5D"/>
        <path d="M17 7L20 14L27 15L22 20L23 27L17 23L11 27L12 20L7 15L14 14Z" fill="#F59E0B"/>
      </g>
      <text x="54" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#0B3C5D">STERLING</text>
      <text x="54" y="38" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#6B7280" letter-spacing="1">HOSPITALS NETWORK</text>
    </svg>`
  },
  {
    name: 'cims.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 54" width="210" height="54" fill="none">
      <rect width="210" height="54" rx="8" fill="#F8FAFC"/>
      <g transform="translate(12, 10)">
        <rect width="34" height="34" rx="7" fill="#0B3C5D"/>
        <circle cx="17" cy="17" r="10" stroke="#1FA2A6" stroke-width="2.5"/>
        <path d="M17 11V23M11 17H23" stroke="#FFFFFF" stroke-width="2"/>
      </g>
      <text x="54" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#0B3C5D">MARENGO CIMS</text>
      <text x="54" y="38" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#6B7280" letter-spacing="1">HOSPITAL AHMEDABAD</text>
    </svg>`
  },
  {
    name: 'sal.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 54" width="190" height="54" fill="none">
      <rect width="190" height="54" rx="8" fill="#F8FAFC"/>
      <g transform="translate(12, 10)">
        <circle cx="17" cy="17" r="17" fill="#1FA2A6"/>
        <text x="17" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">SAL</text>
      </g>
      <text x="54" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#0B3C5D">SAL HOSPITAL</text>
      <text x="54" y="38" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#6B7280" letter-spacing="1">&amp; MEDICAL INSTITUTE</text>
    </svg>`
  },
  {
    name: 'rajasthan.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 54" width="210" height="54" fill="none">
      <rect width="210" height="54" rx="8" fill="#F8FAFC"/>
      <g transform="translate(12, 10)">
        <rect width="34" height="34" rx="7" fill="#0B3C5D"/>
        <path d="M12 25L17 12L22 25L17 21Z" fill="#F59E0B"/>
      </g>
      <text x="54" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="12.5" font-weight="700" fill="#0B3C5D">CHANDRA BHUSHAN</text>
      <text x="54" y="38" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#6B7280" letter-spacing="1">HOSPITAL, JODHPUR</text>
    </svg>`
  }
];

const serviceCards = [
  {
    name: 'joint-replacement.svg',
    title: 'Joint Replacement',
    iconColor: '#1FA2A6',
    path: '<path d="M30 18C30 18 36 28 36 38C36 44 42 48 48 48M30 18C30 18 24 28 24 38C24 44 18 48 12 48M30 18V6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'
  },
  {
    name: 'spine.svg',
    title: 'Spine Surgery',
    iconColor: '#0B3C5D',
    path: '<path d="M30 6V54M22 14H38M18 24H42M20 34H40M22 44H38" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'
  },
  {
    name: 'trauma.svg',
    title: 'Complex Trauma',
    iconColor: '#F59E0B',
    path: '<path d="M18 12L42 48M42 12L18 48M30 6V54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'
  },
  {
    name: 'arthroscopy.svg',
    title: 'Arthroscopy & Sports',
    iconColor: '#1FA2A6',
    path: '<circle cx="30" cy="30" r="18" stroke="currentColor" stroke-width="3"/><path d="M30 18L30 30L38 38" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'
  }
];

// Helper to write SVG
hospitalLogos.forEach(item => {
  fs.writeFileSync(path.join(__dirname, 'assets', 'img', 'hospitals', item.name), item.svg);
});

// Cases assets
const cases = [
  { file: 'knee-case.svg', category: 'Knee Replacement', title: 'Bilateral Total Knee Arthroplasty', label: 'High-Flex Implant' },
  { file: 'hip-case.svg', category: 'Hip Replacement', title: 'Uncemented Ceramic Hip Replacement', label: 'Anterior Approach' },
  { file: 'complex-case.svg', category: 'Complex Fracture', title: 'Pelvic & Polytrauma Limb Salvage', label: 'Titanium Reconstruction' },
  { file: 'spine-case.svg', category: 'Spine Surgery', title: 'Micro-Endoscopic Disc Decompression', label: 'Minimally Invasive' },
  { file: 'arthroscopy-case.svg', category: 'Arthroscopy', title: 'Keyhole ACL & Meniscus Repair', label: 'Sports Medicine' },
  { file: 'bone-case.svg', category: 'Special Cases', title: 'Orthopedic Oncology & Mega-Prosthesis', label: 'Limb Salvage' },
];

cases.forEach((c, idx) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400" fill="none">
    <defs>
      <linearGradient id="grad${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B3C5D"/>
        <stop offset="60%" stop-color="#11293B"/>
        <stop offset="100%" stop-color="#071926"/>
      </linearGradient>
      <pattern id="grid${idx}" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(31, 162, 166, 0.15)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="600" height="400" fill="url(#grad${idx})"/>
    <rect width="600" height="400" fill="url(#grid${idx})"/>
    
    <!-- Central Radiographic / Clinical Diagram Motif -->
    <g transform="translate(300, 170)" text-anchor="middle">
      <circle cx="0" cy="0" r="70" fill="rgba(31, 162, 166, 0.08)" stroke="#1FA2A6" stroke-width="2" stroke-dasharray="8 6"/>
      <circle cx="0" cy="0" r="46" fill="rgba(245, 158, 11, 0.1)" stroke="#F59E0B" stroke-width="1.5"/>
      <path d="M-30 0H30M0 -30V30" stroke="#FFFFFF" stroke-width="2" opacity="0.6"/>
      <circle cx="0" cy="0" r="6" fill="#1FA2A6"/>
      <text y="90" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#1FA2A6" letter-spacing="1.5">CLINICAL CASE STUDY #0${idx + 1}</text>
    </g>

    <!-- Bottom card banner -->
    <rect y="310" width="600" height="90" fill="rgba(7, 39, 61, 0.85)"/>
    <line x1="0" y1="310" x2="600" y2="310" stroke="rgba(31, 162, 166, 0.4)" stroke-width="1.5"/>
    <text x="30" y="345" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">${c.title}</text>
    <text x="30" y="375" font-family="'Inter', sans-serif" font-size="12.5" font-weight="500" fill="#94A3B8">${c.category} • <tspan fill="#F59E0B">${c.label}</tspan></text>
    
    <!-- Top badge -->
    <rect x="30" y="24" width="130" height="28" rx="14" fill="rgba(31, 162, 166, 0.25)" stroke="#1FA2A6"/>
    <text x="95" y="42" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#A5F3FC" text-anchor="middle">SUCCESSFUL RECOVERY</text>
  </svg>`;
  fs.writeFileSync(path.join(__dirname, 'assets', 'img', 'cases', c.file), svg);
});

// Video poster assets
const videos = [
  { file: 'video-hip.svg', title: 'Total Hip Replacement Recovery', patient: 'Active Walk at Day 2' },
  { file: 'video-shoulder-arthro.svg', title: 'Shoulder Arthroscopy & Rotator Cuff', patient: 'Complete Arm Mobility' },
  { file: 'video-shoulder-injury.svg', title: 'Complex Shoulder Dislocation Repair', patient: 'Pain-Free Motion Restored' },
  { file: 'video-clavicle.svg', title: 'Clavicle Fracture Reconstruction', patient: 'Anatomical Alignment' },
  { file: 'video-knee-meniscus.svg', title: 'Knee Meniscus & ACL Reconstruction', patient: 'Back to Daily Activities' },
  { file: 'video-knee-replacement.svg', title: 'Bilateral Knee Replacement', patient: 'Independent Walking Without Support' }
];

videos.forEach((v, idx) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="600" height="360" fill="none">
    <defs>
      <linearGradient id="vgrad${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#07273D"/>
        <stop offset="100%" stop-color="#0B3C5D"/>
      </linearGradient>
    </defs>
    <rect width="600" height="360" fill="url(#vgrad${idx})"/>
    <circle cx="300" cy="150" r="38" fill="rgba(31, 162, 166, 0.85)"/>
    <polygon points="292,136 314,150 292,164" fill="#FFFFFF"/>
    
    <rect y="270" width="600" height="90" fill="rgba(7, 39, 61, 0.9)"/>
    <text x="30" y="306" font-family="'Plus Jakarta Sans', sans-serif" font-size="17" font-weight="700" fill="#FFFFFF">${v.title}</text>
    <text x="30" y="334" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="#38BDF8">${v.patient}</text>
    <text x="560" y="325" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#F59E0B" text-anchor="end">WATCH STORY</text>
  </svg>`;
  fs.writeFileSync(path.join(__dirname, 'assets', 'img', 'testimonials', v.file), svg);
});

console.log('All vector assets created cleanly!');
