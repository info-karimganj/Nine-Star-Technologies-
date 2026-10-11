const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, '../src/i18n/dictionaries/en.json');
const bnPath = path.join(__dirname, '../src/i18n/dictionaries/bn.json');
const arPath = path.join(__dirname, '../src/i18n/dictionaries/ar.json');

const updateDict = (filePath, lang) => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.navigation.home) {
    if (lang === 'en') data.navigation.home = 'Home';
    if (lang === 'bn') data.navigation.home = 'হোম';
    if (lang === 'ar') data.navigation.home = 'الرئيسية';
  }

  if (!data.serviceDetail) {
    if (lang === 'en') {
      data.serviceDetail = {
        theProblem: "The Problem",
        whoItsFor: "Who It's For",
        whatsIncluded: "What's Included",
        howItWorks: "How It Works",
        pricingOptions: "Pricing Options",
        availableAddons: "Available Add-ons",
        whatWeNeed: "What We Need From You",
        requiredDocuments: "Required Documents",
        prerequisites: "Prerequisites",
        faq: "Frequently Asked Questions",
        pricing: "Pricing",
        customQuote: "Custom Quote",
        startingFrom: "From",
        multiplePackages: "Multiple packages available",
        timeline: "Timeline",
        category: "Category",
        requestServicePrimary: "Request This Service",
        requestServiceMobile: "Request Service",
        needHelpChoosing: "Need Help Choosing?",
        haveQuestions: "Have questions?",
        supportText: "Our team is ready to help you find the right solution for your business.",
        contactSupport: "Contact Support",
        relatedServices: "Related Services"
      };
    } else if (lang === 'bn') {
      data.serviceDetail = {
        theProblem: "সমস্যা",
        whoItsFor: "যাদের জন্য",
        whatsIncluded: "যা যা অন্তর্ভুক্ত",
        howItWorks: "কিভাবে কাজ করে",
        pricingOptions: "মূল্য বিকল্প",
        availableAddons: "উপলব্ধ অ্যাড-অন",
        whatWeNeed: "আমাদের যা প্রয়োজন",
        requiredDocuments: "প্রয়োজনীয় কাগজপত্র",
        prerequisites: "পূর্বশর্ত",
        faq: "সচরাচর জিজ্ঞাস্য",
        pricing: "মূল্য",
        customQuote: "কাস্টম কোট",
        startingFrom: "শুরু",
        multiplePackages: "একাধিক প্যাকেজ উপলব্ধ",
        timeline: "সময়কাল",
        category: "ক্যাটাগরি",
        requestServicePrimary: "এই পরিষেবাটি অনুরোধ করুন",
        requestServiceMobile: "পরিষেবা অনুরোধ",
        needHelpChoosing: "বেছে নিতে সাহায্য প্রয়োজন?",
        haveQuestions: "কোন প্রশ্ন আছে?",
        supportText: "আমাদের দল আপনার ব্যবসার জন্য সঠিক সমাধান খুঁজে পেতে সাহায্য করতে প্রস্তুত।",
        contactSupport: "সাপোর্টে যোগাযোগ করুন",
        relatedServices: "সম্পর্কিত পরিষেবাগুলি"
      };
    } else if (lang === 'ar') {
      data.serviceDetail = {
        theProblem: "المشكلة",
        whoItsFor: "لمن هذا",
        whatsIncluded: "ما يتضمنه",
        howItWorks: "كيف يعمل",
        pricingOptions: "خيارات التسعير",
        availableAddons: "الإضافات المتاحة",
        whatWeNeed: "ما نحتاجه منك",
        requiredDocuments: "المستندات المطلوبة",
        prerequisites: "المتطلبات الأساسية",
        faq: "الأسئلة الشائعة",
        pricing: "التسعير",
        customQuote: "تسعير مخصص",
        startingFrom: "يبدأ من",
        multiplePackages: "باقات متعددة متاحة",
        timeline: "الجدول الزمني",
        category: "الفئة",
        requestServicePrimary: "اطلب هذه الخدمة",
        requestServiceMobile: "طلب الخدمة",
        needHelpChoosing: "تحتاج مساعدة في الاختيار؟",
        haveQuestions: "هل لديك أسئلة؟",
        supportText: "فريقنا مستعد لمساعدتك في العثور على الحل المناسب لعملك.",
        contactSupport: "اتصل بالدعم",
        relatedServices: "خدمات ذات صلة"
      };
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

updateDict(enPath, 'en');
updateDict(bnPath, 'bn');
updateDict(arPath, 'ar');
console.log('Dictionaries updated with serviceDetail.');
