const fs = require('fs');
const path = require('path');

const dictsPath = path.join(__dirname, '../src/i18n/dictionaries');
const locales = ['en', 'bn', 'ar'];

const legalContent = {
  privacy: {
    metaTitle: 'Privacy Policy | 9STAR Technologies',
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: [ Date Placeholder ]',
    cmsPlaceholderTitle: 'CMS Placeholder: Privacy Policy Content',
    cmsPlaceholderDesc: 'This page is structurally ready to accept official legal text from your legal counsel or CMS. Do not use generic template text for legal compliance.'
  },
  terms: {
    metaTitle: 'Terms & Conditions | 9STAR Technologies',
    title: 'Terms & Conditions',
    lastUpdated: 'Last Updated: [ Date Placeholder ]',
    cmsPlaceholderTitle: 'CMS Placeholder: Terms & Conditions Content',
    cmsPlaceholderDesc: 'This page is structurally ready to accept official legal text from your legal counsel or CMS. Do not use generic template text for legal compliance.'
  },
  refund: {
    metaTitle: 'Refund Policy | 9STAR Technologies',
    title: 'Refund / Cancellation Policy',
    lastUpdated: 'Last Updated: [ Date Placeholder ]',
    cmsPlaceholderTitle: 'CMS Placeholder: Refund Policy Content',
    cmsPlaceholderDesc: 'This page is structurally ready to accept official legal text from your legal counsel or CMS. Do not use generic template text for legal compliance.'
  },
  cookie: {
    metaTitle: 'Cookie Policy | 9STAR Technologies',
    title: 'Cookie Policy',
    lastUpdated: 'Last Updated: [ Date Placeholder ]',
    cmsPlaceholderTitle: 'CMS Placeholder: Cookie Policy Content',
    cmsPlaceholderDesc: 'This page is structurally ready to accept official legal text from your legal counsel or CMS. Do not use generic template text for legal compliance.'
  }
};

locales.forEach(locale => {
  const filePath = path.join(dictsPath, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.legal) {
    data.legal = {};
  }
  
  if (locale === 'en' || !data.legal.privacy) {
    data.legal = legalContent;
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json with legal data`);
});
