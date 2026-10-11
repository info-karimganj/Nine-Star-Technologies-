/**
 * ==============================================================================
 * 9STAR TECHNOLOGIES — MASTER CLIENT-SIDE LOGIC & SUPABASE INTEGRATION
 * ==============================================================================
 */

// 1. SUPABASE CONFIGURATION
const SUPABASE_URL = 'https://qzxzttmrbeftlgujrldk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_DQ_bNbJ8tB8plWGrBbRngw_Y7HhXrwi';

// Initialize Supabase Client if loaded via CDN
let supabaseClient = null;
if (window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// 2. MULTILINGUAL DICTIONARY (EN & BN)
const translations = {
  en: {
    brand: "9STAR Technologies",
    tagline: "Simple Solutions for Complex Problems",
    heroDesc: "We build websites, custom apps, and business automations without the tech jargon. Clear pricing, proven processes, and reliable enterprise support.",
    viewServices: "Explore Services",
    requestConsultation: "Get Free Advice",
    servicesTitle: "Enterprise Services",
    servicesSubtitle: "Engineered for scalability, security, and exponential business growth.",
    intakeTitle: "Start a Service Request",
    intakeSubtitle: "Submit your requirements directly to our engineering team.",
    fullName: "Full Name",
    emailAddr: "Email Address",
    phoneNum: "Phone Number (Optional)",
    serviceCategory: "Service Required",
    projectGoal: "Project Goal / Overview",
    submitBtn: "Submit Request",
    sendingBtn: "Submitting...",
    successMsg: "Your request has been received! Our team will contact you shortly.",
    errorMsg: "Failed to submit request. Please try again or email contact@9startechnologies.com",
    metricsCompleted: "Projects Delivered",
    metricsUptime: "Service Availability",
    metricsSpeed: "Deployment Speed",
    metricsRating: "Client Satisfaction"
  },
  bn: {
    brand: "৯স্টার টেকনোলজিস",
    tagline: "জটিল সমস্যার সহজ ও নির্ভরযোগ্য ডিজিটাল সমাধান",
    heroDesc: "আমরা কোনো জটিল কারিগরি ভাষা ছাড়াই পেশাদার ওয়েবসাইট, কাস্টম সফটওয়্যার ও বিজনেস অটোমেশন তৈরি করি। স্বচ্ছ মূল্য তালিকা এবং ২৪/৭ সাপোর্ট।",
    viewServices: "সেবাসমূহ দেখুন",
    requestConsultation: "পরামর্শ নিন",
    servicesTitle: "আমাদের প্রযুক্তিগত সেবাসমূহ",
    servicesSubtitle: "ব্যবসায়ের দ্রুত বৃদ্ধি, সর্বোচ্চ নিরাপত্তা ও পারফরম্যান্সের জন্য বিশেষায়িত।",
    intakeTitle: "সার্ভিস রিকোয়েস্ট পাঠান",
    intakeSubtitle: "আপনার প্রকল্পের বিস্তারিত তথ্য আমাদের ইঞ্জিনিয়ারিং টিমের কাছে সরাসরি জমা দিন।",
    fullName: "আপনার নাম",
    emailAddr: "ইমেইল অ্যাড্রেস",
    phoneNum: "মোবাইল নম্বর (ঐচ্ছিক)",
    serviceCategory: "প্রয়োজনীয় সার্ভিস",
    projectGoal: "প্রকল্পের বিবরণ ও লক্ষ্য",
    submitBtn: "অনুরোধ জমা দিন",
    sendingBtn: "জমা হচ্ছে...",
    successMsg: "আপনার অনুরোধটি সফলভাবে গৃহীত হয়েছে! শীঘ্রই আমাদের টিম যোগাযোগ করবে।",
    errorMsg: "অনুরোধ পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।",
    metricsCompleted: "সফল প্রকল্প",
    metricsUptime: "সার্ভিস আপটাইম",
    metricsSpeed: "ডেলিভারি গতি",
    metricsRating: "গ্রাহক সন্তুষ্টি"
  }
};

let currentLang = 'en';

// Change Language
function setLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang] || translations.en;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  const langSelect = document.getElementById('langSelect');
  if (langSelect) langSelect.value = lang;
}

// 3. LOAD SERVICES DYNAMICALLY (From Supabase or Built-in Catalog)
const defaultServices = [
  {
    id: 'web-dev',
    title: { en: 'Corporate & Web Applications', bn: 'কর্পোরেট ও ওয়েব অ্যাপ্লিকেশন' },
    desc: { 
      en: 'High-performance, ultra-fast websites and custom web portals built for high conversion and brand authority.',
      bn: 'উচ্চগতির আধুনিক ওয়েবসাইট এবং কাস্টম ওয়েব পোর্টাল যা ব্র্যান্ডকে শক্তিশালী করে।'
    },
    features: ['Modern UI/UX', 'SEO Optimization', 'Sub-second Latency', 'Multi-device Responsive'],
    icon: '🌐'
  },
  {
    id: 'ai-automation',
    title: { en: 'AI Systems & Business Automation', bn: 'এআই সিস্টেম ও বিজনেস অটোমেশন' },
    desc: { 
      en: 'Production-grade AI workflows, custom chat systems, and automated data pipelines that eliminate repetitive work.',
      bn: 'স্মার্ট এআই অটোমেশন ও ডেটা পাইপলাইন যা আপনার অফিসের পুনরাবৃত্তিমূলক কাজ কমায়।'
    },
    features: ['Workflow Automation', 'Smart Bots', 'Data Extraction', 'Cloud Integration'],
    icon: '⚡'
  },
  {
    id: 'cloud-infra',
    title: { en: 'Cloud Architecture & Security', bn: 'ক্লাউড আর্কিটেকচার ও নিরাপত্তা' },
    desc: { 
      en: 'Scalable, rock-solid cloud deployment, automated CI/CD pipelines, and enterprise security compliance.',
      bn: 'নিরাপদ ক্লাউড ডেপ্লয়মেন্ট, অটোমেটেড ব্যাকআপ এবং সার্বক্ষণিক সার্ভার সুরক্ষা।'
    },
    features: ['AWS / GCP / Vercel', 'Zero Downtime', 'Data Encryption', '24/7 Monitoring'],
    icon: '🔒'
  },
  {
    id: 'mobile-apps',
    title: { en: 'Cross-Platform Mobile Apps', bn: 'মোবাইল অ্যাপ্লিকেশন ডেভেলপমেন্ট' },
    desc: { 
      en: 'Fluid, platform-native iOS and Android applications designed for seamless speed and offline data capability.',
      bn: 'আইওএস ও অ্যান্ড্রয়েডের জন্য দ্রুতগতির মোবাইল অ্যাপ এবং অফলাইন সিঙ্ক সুবিধা।'
    },
    features: ['iOS & Android', 'Offline Sync', 'Push Notifications', 'Store Publishing'],
    icon: '📱'
  }
];

function renderServices() {
  const container = document.getElementById('servicesGrid');
  if (!container) return;

  container.innerHTML = defaultServices.map(srv => `
    <div class="card">
      <div class="card-icon">${srv.icon}</div>
      <h3 class="card-title">${srv.title[currentLang] || srv.title.en}</h3>
      <p class="card-desc">${srv.desc[currentLang] || srv.desc.en}</p>
      <ul class="card-features">
        ${srv.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <a href="#request" onclick="selectService('${srv.title.en}')" class="btn btn-secondary" style="margin-top: auto; width: 100%;">
        Request Proposal →
      </a>
    </div>
  `).join('');
}

function selectService(serviceName) {
  const serviceSelect = document.getElementById('serviceCategory');
  if (serviceSelect) {
    serviceSelect.value = serviceName;
  }
}

// 4. CLIENT INTAKE SUBMISSION (Dual Storage: Supabase & Local Fallback)
async function handleRequestSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const alertSuccess = document.getElementById('alertSuccess');
  const alertError = document.getElementById('alertError');

  alertSuccess.style.display = 'none';
  alertError.style.display = 'none';

  const customerName = document.getElementById('customerName').value.trim();
  const customerEmail = document.getElementById('customerEmail').value.trim();
  const customerPhone = document.getElementById('customerPhone').value.trim();
  const serviceCategory = document.getElementById('serviceCategory').value;
  const projectGoal = document.getElementById('projectGoal').value.trim();

  if (!customerName || !customerEmail || !projectGoal) {
    alert('Please fill in your name, email, and project goal.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = translations[currentLang].sendingBtn;

  const payload = {
    reference_number: `9STAR-${Date.now().toString().slice(-6)}`,
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    service_title: serviceCategory,
    project_goal: projectGoal,
    status: 'NEW',
    created_at: new Date().toISOString()
  };

  try {
    let sentToSupabase = false;

    // Direct insert to Supabase service_requests table
    if (supabaseClient) {
      const { error: sbErr } = await supabaseClient
        .from('service_requests')
        .insert([payload]);
      
      if (!sbErr) sentToSupabase = true;
    }

    // Also attempt local API endpoint if running locally/hybrid
    try {
      await fetch('/api/admin/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          serviceTitle: serviceCategory,
          projectGoal
        })
      });
    } catch (_) {}

    alertSuccess.textContent = `${translations[currentLang].successMsg} (Ref: ${payload.reference_number})`;
    alertSuccess.style.display = 'block';
    form.reset();
  } catch (err) {
    alertError.textContent = translations[currentLang].errorMsg;
    alertError.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = translations[currentLang].submitBtn;
  }
}

// 5. INITIALIZE ON DOM READY
document.addEventListener('DOMContentLoaded', () => {
  renderServices();

  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
      renderServices();
    });
  }

  const requestForm = document.getElementById('serviceRequestForm');
  if (requestForm) {
    requestForm.addEventListener('submit', handleRequestSubmit);
  }
});
