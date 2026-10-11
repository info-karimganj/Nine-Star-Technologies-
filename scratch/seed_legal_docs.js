const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../data/legal');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. PRIVACY POLICY
const privacyPolicy = {
  slug: "privacy-policy",
  title: {
    en: "Privacy Policy",
    bn: "গোপনীয়তা নীতি (Privacy Policy)",
    ar: "سياسة الخصوصية"
  },
  subtitle: {
    en: "Comprehensive information on how 9STAR Technologies handles personal data, technical diagnostics, and user rights.",
    bn: "৯স্টার টেকনোলজিস কীভাবে আপনার ব্যক্তিগত তথ্য, কারিগরি ডাটা এবং অধিকারসমূহ পরিচালনা করে তার বিস্তারিত বিবরণ।",
    ar: "معلومات شاملة حول كيفية تعامل ناين ستار مع البيانات الشخصية وحقوق المستخدمين."
  },
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-10-12",
  version: "2.1",
  status: "PUBLISHED",
  summary: {
    en: "This Privacy Policy describes how 9STAR Technologies collects, processes, and protects your personal data when you visit our website, submit service inquiries, or engage with our technical solutions. We respect global privacy standards, avoid unnecessary data gathering, and ensure technical transparency.",
    bn: "এই গোপনীয়তা নীতিতে ব্যাখ্যা করা হয়েছে কীভাবে ৯স্টার টেকনোলজিস আপনার ব্যক্তিগত তথ্য ও পরিষেবা অনুরোধ নিরাপদভাবে পরিচালনা করে। আমরা তথ্যের অনাবশ্যক সংগ্রহ পরিহার করি এবং আন্তর্জাতিক মানদণ্ড অনুসরণ করি।",
    ar: "توضح هذه السياسة كيفية جمع البيانات ومعالجتها بشفافية وأمان عند طلب الخدمات أو تصفح موقعنا."
  },
  sections: [
    {
      id: "operator-identification",
      title: {
        en: "1. Data Controller & Operator Identification",
        bn: "১. দায়িত্বপ্রাপ্ত প্রতিষ্ঠান ও যোগাযোগ",
        ar: "١. تحديد مسؤول معالجة البيانات"
      },
      content: {
        en: "This website and its associated technological services are operated by **9STAR Technologies** (\"we\", \"us\", or \"our\").\n\n- **Operating Entity:** 9STAR Technologies\n- **Primary Contact & Support:** contact@9startechnologies.com\n- **Security & Privacy Desk:** privacy@9startechnologies.com\n- **Administrative Headquarters / Physical Office:** [Official Registered Office Address Pending Corporate Formalization — Please contact support for administrative inquiries].\n\nIf you have any questions or wish to exercise your statutory rights regarding personal data, please contact our privacy desk directly.",
        bn: "এই ওয়েবসাইট এবং প্রযুক্তিগত সেবা কার্যক্রম **৯স্টার টেকনোলজিস** (9STAR Technologies) দ্বারা পরিচালিত।\n\n- **অপারেটর:** ৯স্টার টেকনোলজিস\n- **যোগাযোগ ও সাপোর্ট:** contact@9startechnologies.com\n- **গোপনীয়তা ও ডাটা সুরক্ষা ডেস্ক:** privacy@9startechnologies.com\n- **নিবন্ধিত ঠিকানা:** [প্রাতিষ্ঠানিক ঠিকানা চূড়ান্তকরণাধীন — প্রশাসনিক তথ্যের জন্য ইমেইলে যোগাযোগ করুন]।",
        ar: "يتم تشغيل هذا الموقع والخدمات التقنية بواسطة ناين ستار للتقنية (9STAR Technologies).\n\n- البريد الإلكتروني للدعم: contact@9startechnologies.com\n- مكتب الخصوصية: privacy@9startechnologies.com"
      }
    },
    {
      id: "scope-and-applicability",
      title: {
        en: "2. Scope of this Policy",
        bn: "২. নীতির আওতা ও ক্ষেত্র",
        ar: "٢. نطاق هذه السياسة"
      },
      content: {
        en: "This policy applies exclusively to personal information gathered through the 9STAR Technologies public website, interactive service request wizards, contact forms, and automated communications. It does not govern third-party platforms, social networks, or independent services linked from our portal.",
        bn: "এই নীতি ৯স্টার টেকনোলজিস ওয়েবসাইটের মাধ্যমে প্রাপ্ত ভিজিট, যোগাযোগ ফর্ম, এবং সেবা অনুরোধ ফর্মের তথ্যের ক্ষেত্রে প্রযোজ্য। সাইট থেকে লিঙ্ক করা কোনো তৃতীয় পক্ষের বাহ্যিক ওয়েবসাইটের ক্ষেত্রে এটি প্রযোজ্য নয়।",
        ar: "ينطبق هذا البيان فقط على البيانات التي يتم جمعها من خلال هذا الموقع ونماذج طلب الخدمات المباشرة."
      }
    },
    {
      id: "data-categories-collected",
      title: {
        en: "3. Categories of Information Collected",
        bn: "৩. সংগৃহীত তথ্যের ধরণসমূহ",
        ar: "٣. فئات البيانات التي نجمعها"
      },
      content: {
        en: "We collect two core classes of data:\n\n**A. Information You Voluntarily Provide:**\n- **Contact & Identity Details:** Full name, business email address, phone number, and country of residence.\n- **Project & Service Specifications:** Project goals, requirements, technical constraints, budget range, and timeline estimates.\n- **Document Attachments:** Files, specifications, and project assets uploaded via the multi-step service request form.\n\n**B. Technical & Operational Information (Automatically Logged):**\n- **Diagnostics & Network Telemetry:** Truncated/anonymized IP addresses, browser user-agent string, operating system type, screen dimensions, and referring URL.\n- **Session & Essential Storage:** Cryptographic authentication tokens (for verified administrators only) and your privacy consent preferences stored locally in your browser.",
        bn: "আমরা দুই ধরনের তথ্য সংগ্রহ করি:\n\n**ক. আপনার স্বেচ্ছায় প্রদত্ত তথ্য:**\n- নাম, ইমেইল ঠিকানা, ফোন নম্বর এবং দেশ।\n- প্রজেক্টের বিবরণ, বাজেট, সময়সীমা এবং সংযুক্ত ফাইলসমূহ।\n\n**খ. স্বয়ংক্রিয় কারিগরি তথ্য:**\n- ব্রাউজারের ধরণ, অপারেটিং সিস্টেম, এবং ছদ্মনামযুক্ত নেটওয়ার্ক ডায়াগনস্টিক তথ্য।\n- ব্রাউজার স্টোরেজে সংরক্ষিত আপনার কুকি পছন্দ এবং অ্যাডমিন সেশন টোকেন।",
        ar: "نجمع البيانات التي تقدمها طواعية في نماذج الاتصال وطلب الخدمات (الاسم، البريد، تفاصيل المشروع والملفات المرفقة) بالإضافة إلى البيانات التقنية الضرورية لأمان النظام."
      }
    },
    {
      id: "purposes-and-legal-bases",
      title: {
        en: "4. Purposes of Processing & Legal Grounds",
        bn: "৪. ডাটা প্রক্রিয়াকরণের উদ্দেশ্য ও আইনি ভিত্তি",
        ar: "٤. أغراض ومعايير المعالجة القانونية"
      },
      content: {
        en: "Under international data protection frameworks (such as GDPR Art. 6), we only process your data on valid legal grounds:\n\n1. **Contractual Necessity & Pre-contractual Inquiries (Art. 6(1)(b)):** Evaluating, scoping, and quoting service requests; communicating project deliverables.\n2. **Legitimate Interests (Art. 6(1)(f)):** Protecting server infrastructure against brute-force attacks, spam bots, and abuse; analyzing aggregated system reliability.\n3. **Legal Compliance (Art. 6(1)(c)):** Retaining tax and administrative records where statutory obligations apply.\n4. **Affirmative Consent (Art. 6(1)(a)):** Storing non-essential functional preferences and anonymous telemetry (only activated after your explicit selection).",
        bn: "আমরা সুনির্দিষ্ট আইনি ভিত্তিতে তথ্য প্রক্রিয়া করি:\n\n১. **চুক্তি ও সেবা অনুরোধ বাস্তবায়ন:** আপনার জমা দেওয়া সেবা অনুরোধের প্রেক্ষিতে যোগাযোগ এবং কোটেশন প্রস্তুত করা।\n২. **ন্যায্য ব্যবসায়িক স্বার্থ (Legitimate Interest):** ওয়েবসাইটের নিরাপত্তা নিশ্চিতকরণ এবং সাইবার আক্রমণ প্রতিরোধ।\n৩. **সম্মতি (Consent):** ঐচ্ছিক কুকি এবং অ্যানালিটিক্স কেবল আপনার স্পষ্ট সম্মতির পরই সক্রিয় হয়।",
        ar: "تتم معالجة البيانات لأغراض إعداد العروض التعاقدية، حماية أمان الخوادم من الهجمات الإلكترونية، والامتثال للأنظمة القانونية."
      }
    },
    {
      id: "third-party-disclosures",
      title: {
        en: "5. Processors, Third Parties & Data Recipients",
        bn: "৫. তৃতীয় পক্ষ ও সাব-প্রসেসর তথ্য",
        ar: "٥. الإفصاح للجهات الخارجية والمزودين"
      },
      content: {
        en: "We do not sell, rent, or trade your personal data to advertisers or data brokers. Data is accessible solely to authorized personnel and necessary technical infrastructure providers:\n\n- **Cloud Hosting & CDN:** Modern cloud platform hosts providing TLS transport and edge routing.\n- **Database Infrastructure:** Local file-based and secured server environments with restricted access.\n- **Client Confidentiality:** All project files and documentation submitted are treated under strict commercial confidentiality.",
        bn: "আমরা কখনই আপনার তথ্য কোনো বিজ্ঞাপনী সংস্থা বা ব্রোকারের কাছে বিক্রি বা ভাড়া দিই না। শুধুমাত্র ক্লাউড হোস্টিং এবং অনুমোদিত প্রযুক্তিগত অবকাঠামোতে এনক্রিপ্ট অবস্থায় ডাটা সংরক্ষিত থাকে।",
        ar: "نحن لا نبيع أو نشارك بياناتك مع معلنين خارجيين. البيانات محصورة بالبنية التحتية السحابية الموثوقة والمشفرة."
      }
    },
    {
      id: "data-retention",
      title: {
        en: "6. Data Retention Schedule & Criteria",
        bn: "৬. তথ্য সংরক্ষণের সময়সীমা ও নীতি",
        ar: "٦. فترات وسياسات الاحتفاظ بالبيانات"
      },
      content: {
        en: "- **Service Inquiries & Quotes:** Retained for up to twenty-four (24) months to facilitate ongoing project collaboration and historical quotations, after which they are archived or securely expunged.\n- **Audit & Security Logs:** Administrative actions and security telemetry are preserved for up to twelve (12) months to detect malicious activity and fulfill security compliance.\n- **Consent Choices:** Preference records are maintained in your local browser storage for up to 12 months unless cleared manually.",
        bn: "- সেবা অনুসন্ধান ও যোগাযোগ তথ্য সর্বোচ্চ ২৪ মাস সংরক্ষিত থাকে এবং পরবর্তীতে নিরাপদভাবে মুছে ফেলা হয়।\n- সিকিউরিটি অডিট লগ সর্বোচ্চ ১২ মাস সংরক্ষিত থাকে।\n- কুকি সম্মতি তথ্য ব্রাউজারে ১২ মাস সংরক্ষিত থাকে।",
        ar: "يتم الاحتفاظ بطلبات الخدمات لمدة تصل إلى ٢٤ شهراً لأغراض المتابعة، بينما تحتفظ سجلات الأمان ببياناتها لمدة ١٢ شهراً."
      }
    },
    {
      id: "user-rights",
      title: {
        en: "7. Your Rights & How to Submit Requests",
        bn: "৭. আপনার অধিকারসমূহ এবং আবেদন প্রক্রিয়া",
        ar: "٧. حقوق المستخدمين وآلية تقديم الطلبات"
      },
      content: {
        en: "Depending on your jurisdiction (e.g. EU/EEA, UK, California, Bangladesh, Iraq), you may enjoy several statutory rights:\n\n- **Right to Access:** Obtain confirmation of data held and a copy thereof.\n- **Right to Rectification:** Correct inaccurate or outdated details.\n- **Right to Erasure (\"Right to be Forgotten\"):** Request deletion where data is no longer necessary.\n- **Right to Restrict or Object:** Limit processing in specific contested scenarios.\n- **Withdrawal of Consent:** Revoke previously granted cookie consent at any time without detriment.\n\nTo submit a verifiable privacy request, email us at **privacy@9startechnologies.com** with the subject \"Privacy Request: [Your Name]\". We verify identity and respond within thirty (30) days as required by prevailing standards.",
        bn: "আইন অনুযায়ী আপনার নিচের অধিকারসমূহ রয়েছে:\n\n- তথ্য দেখার ও জানার অধিকার (Right to Access)\n- ভুল তথ্য সংশোধনের অধিকার (Right to Rectification)\n- তথ্য মুছে ফেলার অনুরোধের অধিকার (Right to Erasure)\n- সম্মতি প্রত্যাহারের অধিকার (Right to Withdraw Consent)\n\nঅধিকার প্রয়োগ করতে **privacy@9startechnologies.com** এ ইমেইল করুন।",
        ar: "يحق لك طلب الوصول إلى بياناتك، تصحيحها، أو حذفها وسحب الموافقة في أي وقت عبر التواصل مع privacy@9startechnologies.com."
      }
    },
    {
      id: "security-measures",
      title: {
        en: "8. Cybersecurity Safeguards",
        bn: "৮. সাইবার নিরাপত্তা ও সুরক্ষা ব্যবস্থা",
        ar: "٨. تدابير الأمن السيبراني"
      },
      content: {
        en: "We deploy defense-in-depth security standards: HSTS (HTTP Strict Transport Security), modern TLS 1.3 cryptographic transport, strict Content-Security and Framing headers, rate limiting, and salted password hashing (PBKDF2/SHA-256) for administrator accounts.\n\n*Important Notice:* No internet transmission is 100% impenetrable. While we enforce strict safeguards, users share responsibility for securing their communication devices and credentials.",
        bn: "আমরা আধুনিক সাইবার নিরাপত্তা ব্যবস্থা যেমন TLS 1.3 এনক্রিপশন, HSTS, সিকিউরিটি হেডার এবং শক্তিশালী পাসওয়ার্ড হ্যাশিং ব্যবহার করি।",
        ar: "نطبق معايير أمان مشددة تشمل التشفير الكامل لنقل البيانات وضوابط الوصول المشددة."
      }
    },
    {
      id: "children-privacy",
      title: {
        en: "9. Children's Privacy",
        bn: "৯. অপ্রাপ্তবয়স্কদের গোপনীয়তা",
        ar: "٩. خصوصية الأطفال"
      },
      content: {
        en: "Our website and enterprise technology offerings are directed solely to business professionals, founders, and adults over the age of majority (18+). We do not knowingly solicit or collect personal data from minors.",
        bn: "আমাদের সেবা এবং ওয়েবসাইট ১৮ বছরের ঊর্ধ্বের প্রাপ্তবয়স্ক ও ব্যবসায়িক প্রতিষ্ঠানের জন্য নির্ধারিত। আমরা অপ্রাপ্তবয়স্কদের তথ্য উদ্দেশ্যমূলকভাবে সংগ্রহ করি না।",
        ar: "خدماتنا موجهة حصرياً للبالغين والشركات، ولا نجمع عمداً بيانات تخص القاصرين."
      }
    }
  ]
};

// 2. TERMS & CONDITIONS
const termsConditions = {
  slug: "terms-and-conditions",
  title: {
    en: "Terms & Conditions",
    bn: "ব্যবহারের শর্তাবলী (Terms & Conditions)",
    ar: "الشروط والأحكام"
  },
  subtitle: {
    en: "Binding agreement governing the access to the 9STAR Technologies website, service requests, and digital engineering solutions.",
    bn: "৯স্টার টেকনোলজিস ওয়েবসাইট ব্যবহার এবং প্রযুক্তি সেবার সাথে সম্পর্কিত আইনি নিয়ম ও শর্তাবলী।",
    ar: "الاتفاقية الحاكمة لاستخدام موقع ناين ستار للتقنية وطلب الحلول الرقمية."
  },
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-10-12",
  version: "2.1",
  status: "PUBLISHED",
  summary: {
    en: "These Terms and Conditions govern your access to and use of 9STAR Technologies' online portal and consulting services. By browsing our website or submitting a service request, you acknowledge and agree to these terms.",
    bn: "এই শর্তাবলী ৯স্টার টেকনোলজিসের সেবা ও ওয়েবসাইট ব্যবহারের নিয়মাবলী পরিচালনা করে। সাইট ব্যবহারের মাধ্যমে আপনি এই শর্তাবলীতে সম্মতি প্রদান করছেন।",
    ar: "تنظم هذه الشروط استخدام المنصة والخدمات المقدمة من ناين ستار للتقنية."
  },
  sections: [
    {
      id: "acceptance-and-scope",
      title: {
        en: "1. Acceptance of Terms & Eligibility",
        bn: "১. শর্তাবলীর গ্রহণযোগ্যতা ও যোগ্যতা",
        ar: "١. قبول الشروط والأهلية"
      },
      content: {
        en: "By accessing or using the 9STAR Technologies website (the \"Site\"), you confirm that you are at least 18 years of age, possess the legal capacity to enter into binding agreements, and agree to abide by these Terms & Conditions. If you represent a company, you warrant that you are authorized to bind that entity.",
        bn: "এই ওয়েবসাইটে প্রবেশ বা সেবা গ্রহণের মাধ্যমে আপনি নিশ্চিত করছেন যে আপনার বয়স ন্যূনতম ১৮ বছর এবং আপনি আইনগতভাবে চুক্তি সম্পাদনে সক্ষম।",
        ar: "بدخولك للموقع واستخدامه، تؤكد أن عمرك لا يقل عن ١٨ عاماً وأنك مؤهل قانونياً للالتزام بهذه الشروط."
      }
    },
    {
      id: "description-of-services",
      title: {
        en: "2. Technology Offerings & Scope of Website",
        bn: "২. সেবাসমূহের বিবরণ ও সীমাবদ্ধতা",
        ar: "٢. وصف الخدمات والحلول"
      },
      content: {
        en: "9STAR Technologies provides software engineering, web application development, digital transformation, cloud architecture, and technical consulting services.\n\n**Independent Private Enterprise Notice:** 9STAR Technologies is a private, independent technology company. We are NOT a government authority, official consulate, or sovereign regulatory body. Any document preparation or online filing assistance provided is purely technical and administrative in nature.",
        bn: "৯স্টার টেকনোলজিস একটি স্বাধীন ও বেসরকারি প্রযুক্তি প্রতিষ্ঠান। আমরা সফটওয়্যার তৈরি, ওয়েব ডেভেলপমেন্ট, ক্লাউড এবং টেকনিক্যাল কনসাল্টিং সেবা প্রদান করি। আমরা কোনো সরকারি সংস্থা বা প্রতিনিধি নই।",
        ar: "ناين ستار للتقنية هي شركة تكنولوجية خاصة ومستقلة، وليست جهة حكومية أو تمثيلية رسمية."
      }
    },
    {
      id: "service-requests-and-proposals",
      title: {
        en: "3. Service Inquiries, Quotations & Formal Contracts",
        bn: "৩. সেবা অনুরোধ, কোটেশন ও আনুষ্ঠানিক চুক্তি",
        ar: "٣. طلبات الخدمات والعقود"
      },
      content: {
        en: "Submitting a service request via this website constitutes an inquiry and does not create an automatic contract for development. A binding commercial engagement requires a mutually executed Master Services Agreement (MSA) or formal Statement of Work (SOW) specifying deliverables, milestones, fees, and acceptance criteria.",
        bn: "ওয়েবসাইটে সেবা অনুরোধ সাবমিট করা মানেই সরাসরি চুক্তি নয়। নির্দিষ্ট কাজ শুরুর পূর্বে একটি আনুষ্ঠানিক চুক্তিপত্র বা স্টেটমেন্ট অব ওয়ার্ক (SOW) স্বাক্ষরিত হবে।",
        ar: "إرسال طلب الخدمة عبر الموقع يُعد استفساراً أولياً، ويتطلب البدء الفعلي توقيع اتفاقية خدمات ومواصفات عمل محددة."
      }
    },
    {
      id: "intellectual-property",
      title: {
        en: "4. Intellectual Property Rights",
        bn: "৪. মেধা সম্পদ ও স্বত্বাধিকার (Intellectual Property)",
        ar: "٤. حقوق الملكية الفكرية"
      },
      content: {
        en: "All site content, branding, trademarks, code snippets, visual designs, and UI architecture are the proprietary intellectual property of 9STAR Technologies or its licensors. You may not copy, scrape, reverse-engineer, or mirror our digital assets without written consent. Client deliverables are governed by individual MSA terms upon full payment.",
        bn: "ওয়েবসাইটের যাবতীয় কোড, ডিজাইন, লোগো এবং কনটেন্ট ৯স্টার টেকনোলজিসের মেধা সম্পদ। লিখিত অনুমতি ব্যতীত এগুলো নকল বা পুনরায় বিতরণ নিষিদ্ধ।",
        ar: "جميع تصاميم الموقع والأكواد والعلامات التجارية محمية بموجب حقوق الملكية الفكرية لشركة ناين ستار."
      }
    },
    {
      id: "acceptable-use-clause",
      title: {
        en: "5. Prohibited Conduct",
        bn: "৫. নিষিদ্ধ কার্যকলাপ",
        ar: "٥. السلوكيات المحظورة"
      },
      content: {
        en: "You agree not to:\n- Deploy automated scraping bots, web crawlers, or fuzzing tools against our APIs.\n- Attempt unauthorized access to administrative endpoints or inject malicious scripts.\n- Submit deceptive or forged information through service forms.\n- Abuse our contact channels for spamming or harassment.",
        bn: "আপনি সম্মতি দিচ্ছেন যে সাইটে কোনো ধরনের স্ক্র্যাপিং বট, হ্যাকিং প্রচেষ্টা, ক্ষতিকারক কোড ইনজেকশন অথবা ভুয়া তথ্য সাবমিট করবেন না।",
        ar: "يحظر تماماً استخدام برامج الزحف الآلي، محاولة اختراق لوحة التحكم، أو إرسال بيانات مضللة ومزيفة."
      }
    },
    {
      id: "disclaimers-and-liability",
      title: {
        en: "6. Disclaimers & Limitation of Liability",
        bn: "৬. দায়বদ্ধতার সীমাবদ্ধতা ও ডিসক্লেইমার",
        ar: "٦. إخلاء المسؤولية وحدود الالتزام"
      },
      content: {
        en: "The website is provided on an \"AS IS\" and \"AS AVAILABLE\" basis without warranties of uninterrupted availability. To the maximum extent permitted by applicable law, 9STAR Technologies shall not be liable for indirect, incidental, special, or consequential damages resulting from website downtime or third-party telecommunications failures.",
        bn: "ওয়েবসাইটটি \"যেমন আছে\" (AS IS) ভিত্তিতে পরিচালিত। কারিগরি বিভ্রাট বা ইন্টারনেটের সমস্যার কারণে কোনো পরোক্ষ ক্ষতির জন্য ৯স্টার টেকনোলজিস দায়ী থাকবে না।",
        ar: "يتم توفير الموقع بحالته الراهنة، ولا تتحمل الشركة المسؤولية عن أي أضرار غير مباشرة ناتجة عن انقطاع الخدمة المؤقت."
      }
    },
    {
      id: "governing-law-placeholder",
      title: {
        en: "7. Governing Law & Dispute Resolution",
        bn: "৭. পরিচালনা আইন ও বিরোধ নিষ্পত্তি",
        ar: "٧. القانون الواجب التطبيق وفض النزاعات"
      },
      content: {
        en: "**Jurisdiction Clause:** Unless otherwise specified in a signed bilateral agreement, disputes arising from website interactions shall be addressed primarily through good-faith negotiation.\n\n*[Administrative Placeholder: Specific legal jurisdiction, court venue, and governing territory are determined pursuant to formal registered entity incorporation documentation].*",
        bn: "ওয়েবসাইট সংক্রান্ত যে কোনো বিরোধ প্রথমে বন্ধুত্বপূর্ণ আলোচনার মাধ্যমে নিষ্পত্তি করা হবে। আনুষ্ঠানিক পরিচালনা আইন কর্পোরেট নিবন্ধিত অধিক্ষেত্র অনুযায়ী নির্ধারিত হবে।",
        ar: "تتم تسوية أي نزاعات بالطرق الودية والمفاوضات، ويخضع الاختصاص القضائي لمقر التسجيل الرسمي للشركة."
      }
    }
  ]
};

// 3. COOKIE POLICY
const cookiePolicy = {
  slug: "cookie-policy",
  title: {
    en: "Cookie & Tracking Policy",
    bn: "কুকি ও ট্র্যাকিং নীতি (Cookie Policy)",
    ar: "سياسة ملفات تعريف الارتباط"
  },
  subtitle: {
    en: "Transparent declaration of all browser storage technologies, purpose categories, and technical consent controls.",
    bn: "ওয়েবসাইটে ব্যবহৃত ব্রাউজার কুকি, লোকাল স্টোরেজ এবং আপনার সম্মতি নিয়ন্ত্রণের বিস্তারিত বিবরণ।",
    ar: "بيان شفاف حول ملفات تعريف الارتباط وتقنيات التخزين وخيارات التحكم المتاحة لك."
  },
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-10-12",
  version: "2.1",
  status: "PUBLISHED",
  summary: {
    en: "This Cookie Policy explains what cookies and local storage keys are utilized on 9STAR Technologies' platform, why they exist, and how you can exercise granular control over non-essential technologies.",
    bn: "এই নীতিতে ব্যাখ্যা করা হয়েছে ৯স্টার টেকনোলজিস কী কী কুকি ব্যবহার করে এবং কীভাবে আপনি আপনার পছন্দ নিয়ন্ত্রণ করতে পারেন।",
    ar: "توضح هذه السياسة كيفية استخدام ملفات تعريف الارتباط وتمنحك التحكم الكامل في قبولها أو رفضها."
  },
  sections: [
    {
      id: "what-are-cookies",
      title: {
        en: "1. What are Cookies and Browser Storage?",
        bn: "১. কুকি এবং ব্রাউজার স্টোরেজ কী?",
        ar: "١. ما هي ملفات تعريف الارتباط؟"
      },
      content: {
        en: "Cookies and Web Storage (localStorage / sessionStorage) are small data files placed on your computer or mobile device by websites you visit. They are widely used to maintain security sessions, record user preferences, and ensure seamless navigation.",
        bn: "কুকি হলো ছোট ডাটা ফাইল যা আপনার ব্রাউজারে সংরক্ষিত হয় যাতে ওয়েবসাইট নিরাপদে পরিচালিত হতে পারে এবং আপনার পছন্দ মনে রাখতে পারে।",
        ar: "ملفات تعريف الارتباط هي ملفات بيانات صغيرة يتم حفظها على جهازك لتمكين الموقع من العمل بكفاءة وأمان."
      }
    },
    {
      id: "cookie-categories",
      title: {
        en: "2. Categories of Technologies We Use",
        bn: "২. ব্যবহৃত প্রযুক্তির ক্যাটাগরি",
        ar: "٢. فئات التقنيات المستخدمة"
      },
      content: {
        en: "We categorize our web storage items into four strict levels:\n\n1. **Strictly Necessary (Always Active):** Crucial for cryptographic authentication, CSRF defense, and persisting your cookie choices. These do not require consent under ePrivacy Directive Art. 5(3).\n2. **Preferences & Functional (Optional):** Stores your language preference across visits.\n3. **Analytics & Performance (Optional):** Measures page interaction anonymously to improve user experience without collecting PII. **Strictly blocked until you consent.**\n4. **Marketing & Targeting (Optional):** We do NOT deploy advertising trackers, behavioral pixels, or cross-site commercial cookies.",
        bn: "আমাদের ক্যাটাগরিসমূহ:\n\n১. **অপরিহার্য (Strictly Necessary):** নিরাপত্তার জন্য বাধ্যতামূলক (সর্বদা সক্রিয়)।\n২. **পছন্দসমূহ (Preferences):** ভাষা ও ইন্টারফেস পছন্দ।\n৩. **অ্যানালিটিক্স (Analytics):** সাইটের কার্যক্ষমতা পর্যবেক্ষণে ব্যবহৃত (আপনার সম্মতি ছাড়া সক্রিয় হয় না)।\n৪. **মার্কেটিং:** আমরা কোনো বিজ্ঞাপনী ট্র্যাকার ব্যবহার করি না।",
        ar: "نقسم التقنيات إلى: ضرورية للأمان، وظيفية للغات، وتحليلية مجهولة الهوية ولا يتم تفعيلها إلا بعد موافقتك الصريحة."
      }
    },
    {
      id: "technical-inventory",
      title: {
        en: "3. Complete Technical Storage Inventory",
        bn: "৩. সম্পূর্ণ প্রযুক্তিগত কুকি ইনভেন্টরি",
        ar: "٣. سجل التقنيات وملفات تعريف الارتباط"
      },
      content: {
        en: "| Key / Identifier | Provider & Domain | Category | Lifespan | Purpose |\n|---|---|---|---|---|\n| `9star_admin_token` | 9STAR Platform (First-Party) | Strictly Necessary | Session / 24h | Cryptographic admin authentication cookie |\n| `9star_cookie_consent_v1` | 9STAR Platform (localStorage) | Strictly Necessary | 12 Months | Stores your privacy category choices |\n| `9star_consent` | 9STAR Platform (First-Party) | Strictly Necessary | 12 Months | SSR middleware consent indicator |\n| `9star_lang` | 9STAR Platform (First-Party) | Preferences | 12 Months | Remembers language choice (EN/BN/AR) |\n| `9star_analytics_events` | 9STAR Platform (localStorage) | Analytics | Session | Anonymized funnel metrics (Gated by consent) |",
        bn: "| কী (Key) | উৎস | ক্যাটাগরি | মেয়াদ | উদ্দেশ্য |\n|---|---|---|---|---|\n| `9star_admin_token` | ৯স্টার প্ল্যাটফর্ম | প্রয়োজনীয় | ২৪ ঘণ্টা | অ্যাডমিন প্রমাণীকরণ |\n| `9star_cookie_consent_v1` | লোকাল স্টোরেজ | প্রয়োজনীয় | ১২ মাস | আপনার গোপনীয়তা পছন্দ রেকর্ড |\n| `9star_consent` | কুকি | প্রয়োজনীয় | ১২ মাস | সার্ভার-সাইড সম্মতি স্ট্যাটাস |\n| `9star_lang` | কুকি | প্রেফারেন্স | ১২ মাস | নির্বাচিত ভাষা সংরক্ষণ |\n| `9star_analytics_events` | লোকাল স্টোরেজ | অ্যানালিটিক্স | সেশন | বেনামে সাইটের ব্যবহার পর্যবেক্ষণ (সম্মতি সাপেক্ষ) |",
        ar: "جدول معتمد يسرد جميع مفاتيح التخزين المحلية والأمنية وفترات صلاحيتها وأغراضها بدقة تامة."
      }
    },
    {
      id: "how-to-manage-consent",
      title: {
        en: "4. How to Manage or Withdraw Consent",
        bn: "৪. কীভাবে সম্মতি পরিবর্তন বা প্রত্যাহার করবেন",
        ar: "٤. كيفية إدارة وسحب الموافقة"
      },
      content: {
        en: "You can modify your preferences at any moment. Simply click the **\"Cookie Settings\"** link in our website footer to reopen the Preference Center. You may also clear your browser's local cache directly at any time.",
        bn: "আপনি যেকোনো সময় ফুটারের **\"Cookie Settings\"** লিংকে ক্লিক করে আপনার পছন্দ পরিবর্তন বা সম্মতি প্রত্যাহার করতে পারেন।",
        ar: "يمكنك في أي وقت تغيير اختياراتك بالنقر على زر إعدادات ملفات تعريف الارتباط في أسفل الموقع."
      }
    }
  ]
};

// 4. DATA PROCESSING
const dataProcessing = {
  slug: "data-processing",
  title: {
    en: "Data Processing & Protection Notice",
    bn: "ডাটা প্রসেসিং ও সুরক্ষা বিবরণী",
    ar: "إشعار معالجة وحماية البيانات"
  },
  subtitle: {
    en: "Operational technical details on controller/processor relationships, data handling, and client project confidentiality.",
    bn: "ডাটা কন্ট্রোলার ও প্রসেসরের দায়িত্ব, ক্লায়েন্ট প্রজেক্টের নিরাপত্তা ও তথ্যের সুরক্ষার বিস্তারিত।",
    ar: "تفاصيل فنية حول مسؤوليات معالجة البيانات وأمن المشاريع الرقمية."
  },
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-10-12",
  version: "2.0",
  status: "PUBLISHED",
  summary: {
    en: "This notice defines how 9STAR Technologies acts both as a Data Controller for our website visitors and as a Data Processor for clients who engage us to build and host custom software systems.",
    bn: "এই বিবরণীতে স্পষ্ট করা হয়েছে যে ৯স্টার টেকনোলজিস সাধারণ ওয়েব ভিজিটরদের জন্য কন্ট্রোলার এবং ক্লায়েন্টের সফটওয়্যার প্রজেক্টের জন্য প্রসেসর হিসেবে কীভাবে কাজ করে।",
    ar: "يوضح هذا المستند دورنا كمسؤول بيانات لزوار الموقع وكمعالج بيانات لعملاء المشاريع البرمجية."
  },
  sections: [
    {
      id: "processing-roles",
      title: {
        en: "1. Distinction of Processing Roles",
        bn: "১. প্রসেসিং ভূমিকার স্বাতন্ত্র্য",
        ar: "١. تحديد أدوار معالجة البيانات"
      },
      content: {
        en: "- **As a Data Controller:** We determine the purposes and means of processing personal data collected from website visitors and prospective clients submitting service forms.\n- **As a Data Processor:** When clients hire us to build, deploy, or maintain bespoke software systems containing their end-users' data, 9STAR Technologies processes that data strictly pursuant to the client's documented instructions and bilateral Data Processing Agreement (DPA).",
        bn: "- **কন্ট্রোলার হিসেবে:** আমাদের ওয়েবসাইটে সরাসরি জমা দেওয়া তথ্যের ক্ষেত্রে আমরা কন্ট্রোলার হিসেবে দায়িত্ব পালন করি।\n- **প্রসেসর হিসেবে:** ক্লায়েন্টের জন্য যখন আমরা কাস্টম সফটওয়্যার তৈরি বা হোস্ট করি, তখন ক্লায়েন্টের নির্দেশিকা এবং চুক্তির আওতায় আমরা প্রসেসর হিসেবে কাজ করি।",
        ar: "نعمل كمسؤول بيانات لزوار موقعنا، وكمعالج بيانات معتمد لبيانات مشاريع عملائنا وفقاً لاتفاقية المعالجة."
      }
    },
    {
      id: "technical-safeguards",
      title: {
        en: "2. Technical & Organizational Measures (TOMs)",
        bn: "২. প্রযুক্তিগত ও সাংগঠনিক নিরাপত্তা ব্যবস্থা",
        ar: "٢. التدابير الفنية والتنظيمية"
      },
      content: {
        en: "We implement robust measures to protect against accidental loss or unauthorized disclosure:\n- **Least-Privilege RBAC:** Access to development databases and client requests is restricted strictly to authorized engineers.\n- **Encrypted Transmission:** TLS 1.3 encryption across all communication endpoints.\n- **Separation of Environments:** Development, testing, and production environments are isolated.",
        bn: "আমরা ডেভলপমেন্ট ডাটাবেজে কঠোর ভূমিকা-ভিত্তিক প্রবেশাধিকার (RBAC), TLS 1.3 এনক্রিপশন এবং পৃথক পরিবেশ বজায় রাখি।",
        ar: "نعتمد ضوابط أمنية صارمة تشمل الفصل بين بيئات التطوير والتشغيل وتشفير كافة الاتصالات."
      }
    }
  ]
};

// 5. ACCEPTABLE USE POLICY
const acceptableUse = {
  slug: "acceptable-use",
  title: {
    en: "Acceptable Use Policy (AUP)",
    bn: "গ্রহণযোগ্য ব্যবহার নীতি (Acceptable Use)",
    ar: "سياسة الاستخدام المقبول"
  },
  subtitle: {
    en: "Standards of conduct, prohibited activities, and security protections governing our digital platform.",
    bn: "আমাদের ডিজিটাল প্ল্যাটফর্ম এবং সেবা ব্যবহারের ক্ষেত্রে আচরণবিধি ও নিষিদ্ধ কার্যক্রমের নির্দেশিকা।",
    ar: "معايير السلوك والأنشطة المحظورة لحماية أمان واستقرار المنصة."
  },
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-10-12",
  version: "2.0",
  status: "PUBLISHED",
  summary: {
    en: "This Acceptable Use Policy outlines the rules for interacting with 9STAR Technologies' online infrastructure, forms, and digital communication tools.",
    bn: "এই নীতিতে প্ল্যাটফর্মের নিরাপত্তা বিঘ্নিতকারী কোনো অনৈতিক বা ক্ষতিকর কার্যকলাপ প্রতিরোধে বিস্তারিত নির্দেশনা দেওয়া হয়েছে।",
    ar: "تحدد هذه السياسة القواعد الواجب اتباعها عند استخدام موقعنا والتفاعل مع خدماتنا الرقمية."
  },
  sections: [
    {
      id: "prohibited-activities",
      title: {
        en: "1. Strictly Prohibited Activities",
        bn: "১. কঠোরভাবে নিষিদ্ধ কার্যক্রম",
        ar: "١. الأنشطة المحظورة تماماً"
      },
      content: {
        en: "Users must not engage in any activity that harms or attempts to harm the platform, including:\n- Distributing viruses, worms, malware, or destructive code.\n- Launching Denial-of-Service (DoS/DDoS) attacks or automated load spikes.\n- Scraping, automated harvesting, or unauthorized indexing of customer requests.\n- Attempting privilege escalation or administrative interface bypass.",
        bn: "প্ল্যাটফর্মে ম্যালওয়্যার ছড়ানো, ডিডিওএস (DDoS) আক্রমণ, অটোমেটেড স্ক্র্যাপিং বা অননুমোদিত অ্যাক্সেস সম্পূর্ণ নিষিদ্ধ।",
        ar: "يمنع منعاً باتاً نشر الفيروسات، شن هجمات حجب الخدمة، أو استخراج البيانات بطرق آلية غير مصرح بها."
      }
    },
    {
      id: "enforcement-and-reporting",
      title: {
        en: "2. Violations and Enforcement",
        bn: "২. লঙ্ঘন এবং আইনি পদক্ষেপ",
        ar: "٢. الإجراءات عند مخالفة السياسة"
      },
      content: {
        en: "We reserve the right to block offending IP addresses, cancel pending service inquiries, and report criminal cybersecurity breaches to competent law enforcement agencies.",
        bn: "নিয়ম লঙ্ঘনকারী আইপি ঠিকানা ব্লক করা এবং প্রয়োজনবোধে আইন প্রয়োগকারী সংস্থাকে অবহিত করার অধিকার সংরক্ষিত।",
        ar: "تحتفظ الشركة بحق حظر عناوين IP المخالفة وإبلاغ السلطات المختصة عن الجرائم السيبرانية."
      }
    }
  ]
};

// 6. DISCLAIMER
const disclaimer = {
  slug: "disclaimer",
  title: {
    en: "Website & Service Disclaimer",
    bn: "ওয়েবসাইট ও সেবামূলক ডিসক্লেইমার",
    ar: "إخلاء المسؤولية العامة"
  },
  subtitle: {
    en: "Legal boundaries regarding website content, non-agency status, and technological estimations.",
    bn: "ওয়েবসাইটের তথ্য, বেসরকারি মর্যাদা এবং কারিগরি অনুমানের আইনি সীমানা।",
    ar: "الحدود القانونية لمعلومات الموقع والصفة المؤسسية للشركة."
  },
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-10-12",
  version: "2.0",
  status: "PUBLISHED",
  summary: {
    en: "This disclaimer clarifies that 9STAR Technologies provides software and IT services on an independent commercial basis and makes no unauthorized regulatory representations.",
    bn: "এই ডিসক্লেইমারে স্পষ্ট করা হয়েছে যে ৯স্টার টেকনোলজিস একটি স্বাধীন প্রযুক্তি প্রতিষ্ঠান এবং ওয়েবসাইটের তথ্য কেবল প্রাথমিক ধারণার জন্য প্রযোজ্য।",
    ar: "يوضح هذا الإخلاء أن خدمات ناين ستار هي خدمات تقنية تجارية مستقلة."
  },
  sections: [
    {
      id: "independent-entity",
      title: {
        en: "1. No Government Agency Affiliation",
        bn: "১. কোনো সরকারি সংস্থার সাথে সম্পর্কহীনতা",
        ar: "١. عدم التبعية لأي جهة حكومية"
      },
      content: {
        en: "9STAR Technologies is a private technology consulting firm. We are NOT affiliated with, sponsored by, or an agent of any governmental agency, department, or consular authority. Any document management services are purely technological and administrative tools provided for our clients' convenience.",
        bn: "৯স্টার টেকনোলজিস একটি বেসরকারি আইটি প্রতিষ্ঠান। আমরা কোনো সরকারি সংস্থা, দূতাবাস বা কর্তৃপক্ষের শাখা নই।",
        ar: "ناين ستار للتقنية شركة خاصة مستقلة ولا تتبع أي وزارة أو مؤسسة حكومية أو قنصلية."
      }
    },
    {
      id: "estimates-and-outcomes",
      title: {
        en: "2. Estimates and Timeframes",
        bn: "২. সময় ও বাজেট সংক্রান্ত অনুমান",
        ar: "٢. التقديرات الزمنية والتكاليف"
      },
      content: {
        en: "Project timelines, budgets, and technical estimates displayed on this site are indicative benchmarks based on standard project scopes. Exact delivery schedules and costs are established solely in formal written contracts.",
        bn: "ওয়েবসাইটে উল্লিখিত আনুমানিক সময়সীমা ও মূল্য প্রাথমিক ধারণামাত্র। চূড়ান্ত সময় ও মূল্য আনুষ্ঠানিক চুক্তির মাধ্যমে নির্ধারিত হবে।",
        ar: "المدد الزمنية والأسعار التقديرية بالموقع هي للمؤشرات الأولية فقط، والعقد الرسمي هو المرجع الحاسم."
      }
    }
  ]
};

// 7. REFUND & CANCELLATION POLICY
const refundPolicy = {
  slug: "refund-policy",
  title: {
    en: "Refund, Cancellation & Modification Policy",
    bn: "রিফান্ড, বাতিল ও পরিবর্তন নীতি",
    ar: "سياسة الاسترداد والإلغاء"
  },
  subtitle: {
    en: "Commercial terms governing service scoping, milestone billing, cancellations, and revision requests.",
    bn: "সেবা চুক্তি বাতিল, মাইলস্টোন বিলিং এবং রিফান্ড সংক্রান্ত বাণিজ্যিক নীতি ও নিয়ম।",
    ar: "الشروط التجارية المنظمة للإلغاء والفوترة المرحلية وطلبات الاسترداد."
  },
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-10-12",
  version: "2.0",
  status: "PUBLISHED",
  summary: {
    en: "This policy establishes transparent refund and cancellation criteria for professional technical engagements with 9STAR Technologies.",
    bn: "৯স্টার টেকনোলজিসের পেশাদার প্রযুক্তি সেবা ও কাস্টম ডেভেলপমেন্ট কাজের ক্ষেত্রে রিফান্ড ও বাতিলের সুনির্দিষ্ট নিয়ম।",
    ar: "تحدد هذه السياسة معايير واضحة للاسترداد وإلغاء المشاريع التقنية."
  },
  sections: [
    {
      id: "bespoke-services",
      title: {
        en: "1. Custom Software & Engineering Projects",
        bn: "১. কাস্টম সফটওয়্যার ও ইঞ্জিনিয়ারিং প্রজেক্ট",
        ar: "١. مشاريع البرمجيات والتطوير المخصص"
      },
      content: {
        en: "Because software development and architectural consulting involve dedicated engineering labor and intellectual time, fees paid for completed milestones or approved design phases are non-refundable.\n\n- **Pre-commencement Cancellation:** If a client cancels a project before work begins, advance deposits may be refunded minus documented administrative or scoping expenses.\n- **Active Milestone Cancellation:** If cancellation occurs mid-milestone, fees will be calculated prorated against verifiable hours expended, and the remaining unspent deposit will be refunded.\n- **Deliverable Acceptance:** Once a milestone deliverable is reviewed and approved by the client in writing, the associated milestone fee is final.",
        bn: "কাস্টম সফটওয়্যার তৈরিতে প্রকৌশলীদের শ্রম ও মেধা ব্যয় হয়, তাই অনুমোদিত বা সমাপ্ত মাইলস্টোনের ফি অফেরতযোগ্য। কাজ শুরুর পূর্বে বাতিল করা হলে প্রশাসনিক খরচ বাদে বাকি অর্থ ফেরত দেওয়া হতে পারে।",
        ar: "نظراً لأن تطوير البرمجيات يتطلب وقداً وجهداً هندسياً مخصصاً، فإن المبالغ المدفوعة للمراحل المنجزة والمعتمدة غير قابلة للاسترداد."
      }
    },
    {
      id: "disputes-and-requests",
      title: {
        en: "2. Initiating a Refund Request",
        bn: "২. রিফান্ডের আবেদন প্রক্রিয়া",
        ar: "٢. آلية تقديم طلب الاسترداد"
      },
      content: {
        en: "To formally request a cancellation or review an invoice, clients must email their dedicated account manager and copy **billing@9startechnologies.com** within fourteen (14) calendar days of the disputed billing date.",
        bn: "রিফান্ড বা বিলিং পর্যালোচনার জন্য ১৪ দিনের মধ্যে **billing@9startechnologies.com** এ ইমেইল করতে হবে।",
        ar: "لطلب الإلغاء أو الاسترداد، يرجى مراسلة billing@9startechnologies.com خلال ١٤ يوماً من تاريخ الفاتورة."
      }
    }
  ]
};

// 8. ACCESSIBILITY STATEMENT
const accessibility = {
  slug: "accessibility",
  title: {
    en: "Accessibility Statement",
    bn: "অ্যাক্সেসিবিলিটি বিবৃতি (Accessibility Statement)",
    ar: "بيان إمكانية الوصول"
  },
  subtitle: {
    en: "Our ongoing commitment to digital accessibility, inclusive design, and WCAG 2.1 standards.",
    bn: "সকল ব্যবহারকারীর জন্য সহজলভ্য ও অন্তর্ভুক্তিমূলক ডিজিটাল অভিজ্ঞতা নিশ্চিত করার অঙ্গীকার।",
    ar: "التزامنا المستمر بتسهيل وصول الجميع وفقاً لأفضل المعايير الرقمية العالمية."
  },
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-10-12",
  version: "2.0",
  status: "PUBLISHED",
  summary: {
    en: "9STAR Technologies is committed to ensuring our digital experiences are accessible to everyone, including individuals with disabilities, conforming to Web Content Accessibility Guidelines (WCAG) 2.1 AA benchmarks.",
    bn: "৯স্টার টেকনোলজিস প্রতিবন্ধী ব্যক্তি সহ সকল মানুষের জন্য ওয়েব কন্টেন্ট সহজলভ্য করতে WCAG 2.1 AA মানদণ্ড বাস্তবায়নে প্রতিশ্রুতিবদ্ধ।",
    ar: "نلتزم بضمان سهولة الوصول إلى موقعنا لجميع المستخدمين وفق معايير WCAG 2.1 المستوى AA."
  },
  sections: [
    {
      id: "accessibility-features",
      title: {
        en: "1. Implemented Accessibility Features",
        bn: "১. বাস্তবায়িত অ্যাক্সেসিবিলিটি সুবিধাসমূহ",
        ar: "١. الميزات المنفذة لتسهيل الوصول"
      },
      content: {
        en: "Our platform incorporates:\n- **High Color Contrast:** Designed with deep navy (`#0a192f`) and refined gold (`#d4af37`) exceeding minimum 4.5:1 text contrast ratios.\n- **Semantic HTML5:** Native landmark tags (`<header>`, `<main>`, `<footer>`, `<aside>`, `aria-label`).\n- **Full Keyboard Operability:** All interactive buttons, modals, and cookie preference controls are accessible via keyboard Tab, Enter, and Space keys.\n- **Multilingual Typography & RTL Support:** Optimized font rendering for Bengali and right-to-left layout direction for Arabic.",
        bn: "আমাদের ওয়েবসাইটে উচ্চ কালার কন্ট্রাস্ট, কিবোর্ড নেভিগেশন সুবিধা, স্ক্রিন রিডার সহায়ক লেবেল এবং বাংলা ও আরবি ফ্রন্টের বিশেষ সামঞ্জস্য বিধান করা হয়েছে।",
        ar: "يشمل الموقع تباين ألوان مرتفع، دعم التنقل بالكامل عبر لوحة المفاتيح، وتوافق تام مع قارئات الشاشة واللغات من اليمين إلى اليسار."
      }
    },
    {
      id: "feedback-channel",
      title: {
        en: "2. Accessibility Feedback & Assistance",
        bn: "২. মতামত ও সহায়তা চ্যানেল",
        ar: "٢. قنوات الدعم والملاحظات"
      },
      content: {
        en: "If you encounter any accessibility barrier or require content in an alternative format, please email **accessibility@9startechnologies.com**. We review all submissions within three (3) business days.",
        bn: "কোনো ধরনের সমস্যা লক্ষ্য করলে আমাদের **accessibility@9startechnologies.com** এ জানান। আমরা ৩ কার্যদিবসের মধ্যে সহায়তা প্রদান করব।",
        ar: "إذا واجهت أي صعوبة في الوصول، يرجى مراسلتنا على accessibility@9startechnologies.com."
      }
    }
  ]
};

// 9. SECURITY POLICY
const security = {
  slug: "security",
  title: {
    en: "Security & Vulnerability Disclosure",
    bn: "নিরাপত্তা ও ভালনারেবিলিটি প্রকাশ নীতি",
    ar: "سياسة الأمان والإبلاغ عن الثغرات"
  },
  subtitle: {
    en: "Guidelines for responsible cybersecurity vulnerability disclosure and technical infrastructure defense.",
    bn: "সাইবার নিরাপত্তা ত্রুটি দায়িত্বশীলভাবে রিপোর্ট করার নিয়মাবলী ও পরিকাঠামো সুরক্ষার বিবরণ।",
    ar: "إرشادات الإبلاغ المسؤول عن الثغرات الأمنية لحماية البنية التحتية."
  },
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-10-12",
  version: "2.0",
  status: "PUBLISHED",
  summary: {
    en: "9STAR Technologies takes information security seriously. We welcome responsible disclosures from ethical researchers and maintain strict defense standards.",
    bn: "৯স্টার টেকনোলজিস সাইবার নিরাপত্তাকে সর্বোচ্চ অগ্রাধিকার দেয় এবং গবেষকদের কাছ থেকে দায়িত্বশীল ত্রুটি প্রকাশের আহ্বান জানায়।",
    ar: "تولي ناين ستار أقصى درجات الاهتمام بالأمان السيبراني وترحب بالإبلاغ المسؤول عن أي ثغرات."
  },
  sections: [
    {
      id: "responsible-disclosure",
      title: {
        en: "1. Responsible Vulnerability Disclosure Guidelines",
        bn: "১. দায়িত্বশীল ত্রুটি প্রকাশের নির্দেশিকা",
        ar: "١. إرشادات الإبلاغ المسؤول"
      },
      content: {
        en: "If you discover a potential vulnerability in our online services, we ask that you:\n- Email full technical details to **security@9startechnologies.com**.\n- Allow us reasonable time (minimum 30 days) to remediate the vulnerability before public disclosure.\n- Avoid compromising user privacy, disrupting production servers, or executing data destruction.\n- Do not perform social engineering, phishing, or physical attacks.",
        bn: "কোনো নিরাপত্তা ত্রুটি পাওয়া গেলে **security@9startechnologies.com** এ বিস্তারিত জানান। জনসমক্ষে প্রকাশের আগে সমাধানের জন্য উপযুক্ত সময় দিন এবং সাইটের ক্ষতিসাধন থেকে বিরত থাকুন।",
        ar: "يرجى إرسال تفاصيل الثغرات إلى security@9startechnologies.com مع إمهال الفريق وقتاً لمعالجتها قبل أي نشر علني."
      }
    },
    {
      id: "safe-harbor",
      title: {
        en: "2. Safe Harbor Commitment",
        bn: "২. সেইফ হারবার প্রতিশ্রুতি",
        ar: "٢. تعهد الملاذ الآمن للباحثين"
      },
      content: {
        en: "We will not initiate legal action against security researchers who act in good faith and strictly adhere to these responsible disclosure principles.",
        bn: "নীতিমালা মেনে দায়িত্বশীলভাবে কাজ করা গবেষকদের বিরুদ্ধে কোনো আইনি পদক্ষেপ নেওয়া হবে না।",
        ar: "تتعهد الشركة بعدم اتخاذ أي إجراءات قانونية ضد الباحثين الذين يلتزمون بحسن النية وهذه الشروط."
      }
    }
  ]
};

// 10. THIRD-PARTY SERVICES NOTICE
const thirdParty = {
  slug: "third-party-services",
  title: {
    en: "Third-Party Services Notice",
    bn: "তৃতীয় পক্ষের সেবা ও বাহ্যিক লিংক বিজ্ঞপ্তি",
    ar: "إشعار الخدمات والروابط الخارجية"
  },
  subtitle: {
    en: "Clarification regarding external service providers, hosting networks, and hyperlinked resources.",
    bn: "বহিরাগত সেবা প্রদানকারী, ক্লাউড নেটওয়ার্ক এবং সংযুক্ত অন্যান্য লিংক সম্পর্কিত তথ্য।",
    ar: "توضيح قانوني حول مزودي الخدمات الخارجيين والروابط المرتبطة بالموقع."
  },
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-10-12",
  version: "2.0",
  status: "PUBLISHED",
  summary: {
    en: "This notice explains how third-party infrastructure components interact with our website and where our legal responsibility ends.",
    bn: "এই নোটিশে তৃতীয় পক্ষের প্রযুক্তিগত উপাদান এবং বাহ্যিক লিংকের ক্ষেত্রে প্রযোজ্য নীতি ব্যাখ্যা করা হয়েছে।",
    ar: "يوضح هذا الإشعار حدود المسؤولية بشأن الروابط الخارجية ومزودي البنية التحتية."
  },
  sections: [
    {
      id: "external-links",
      title: {
        en: "1. External Hyperlinks",
        bn: "১. বাহ্যিক হাইপারলিংক",
        ar: "١. الروابط الخارجية"
      },
      content: {
        en: "Our website may contain hyperlinks to third-party sites (e.g. professional associations, partners, or technical resources). We do not control and are not responsible for the privacy practices, content, or policies of those third-party sites.",
        bn: "আমাদের ওয়েবসাইটে তৃতীয় পক্ষের লিংক থাকতে পারে। ঐসকল সাইটের গোপনীয়তা নীতি বা তথ্যের জন্য ৯স্টার টেকনোলজিস দায়ী নয়।",
        ar: "قد يحتوي موقعنا على روابط لمواقع خارجية، ونحن لسنا مسؤولين عن سياسات الخصوصية لتلك المواقع."
      }
    }
  ]
};

// 11. COMMUNICATIONS & MARKETING NOTICE
const communications = {
  slug: "communications",
  title: {
    en: "Electronic Communications Notice",
    bn: "ইলেকট্রনিক যোগাযোগ ও বিপণন বিজ্ঞপ্তি",
    ar: "إشعار المراسلات والتواصل الإلكتروني"
  },
  subtitle: {
    en: "Information on transactional messages, service notifications, and opt-out mechanisms.",
    bn: "সেবামূলক বার্তা, প্রজেক্ট নোটিফিকেশন এবং যোগাযোগের সম্মতি ও প্রত্যাহারের নিয়ম।",
    ar: "معلومات حول الرسائل التشغيلية وإشعارات المشاريع وخيارات إلغاء الاشتراك."
  },
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-10-12",
  version: "2.0",
  status: "PUBLISHED",
  summary: {
    en: "This notice defines the distinction between mandatory transactional service emails and optional marketing updates.",
    bn: "এই নোটিশে প্রজেক্টের জরুরি বার্তা এবং সাধারণ যোগাযোগের মধ্যে পার্থক্য ও অধিকারসমূহ তুলে ধরা হয়েছে।",
    ar: "يوضح هذا الإشعار الفرق بين رسائل الخدمة الضرورية والرسائل الإخبارية الاختيارية."
  },
  sections: [
    {
      id: "transactional-vs-promotional",
      title: {
        en: "1. Transactional vs Promotional Communications",
        bn: "১. প্রাতিষ্ঠানিক ও প্রচারমূলক যোগাযোগ",
        ar: "١. المراسلات التشغيلية مقابل الترويجية"
      },
      content: {
        en: "- **Transactional Emails:** Necessary communications regarding ongoing service requests, quotes, invoices, or security notices. You cannot opt out of these essential notifications.\n- **Marketing Updates:** Sent only with affirmative consent. Every marketing email includes an instant one-click unsubscribe mechanism.",
        bn: "- **প্রয়োজনীয় বার্তা:** চলমান সেবা বা কোটেশন সম্পর্কিত তথ্য যা অপরিহার্য।\n- **মার্কেটিং বার্তা:** কেবল আপনার সম্মতিতেই পাঠানো হয় এবং যেকোনো সময় এক ক্লিকে আনসাবস্ক্রাইব করা যায়।",
        ar: "رسائل الخدمة المتعلقة بالمشاريع إلزامية ولا يمكن إلغاؤها، بينما تخضع الرسائل الترويجية للموافقة الكاملة وتتضمن رابط إلغاء."
      }
    }
  ]
};

const allDocs = [
  privacyPolicy,
  termsConditions,
  cookiePolicy,
  dataProcessing,
  acceptableUse,
  disclaimer,
  refundPolicy,
  accessibility,
  security,
  thirdParty,
  communications
];

allDocs.forEach(doc => {
  const filePath = path.join(outDir, `${doc.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(doc, null, 2), 'utf8');
  console.log(`Saved legal document: ${doc.slug}.json`);
});

console.log('Successfully generated all 11 professional legal documents in Bengali, English, and Arabic!');
