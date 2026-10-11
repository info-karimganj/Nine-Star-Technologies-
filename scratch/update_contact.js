const fs = require('fs');
const path = require('path');

const dictsPath = path.join(__dirname, '../src/i18n/dictionaries');
const locales = ['en', 'bn', 'ar'];

const contactContent = {
  meta: {
    title: 'Contact Us | 9STAR Technologies',
    description: 'Get in touch with our team for service inquiries, support, or general questions.'
  },
  hero: {
    title: 'Contact Us',
    subtitle: "We're here to help. Reach out to discuss a project, request support, or learn more about our solutions."
  },
  form: {
    title: 'Send a Message',
    firstName: 'First Name',
    firstNamePlaceholder: 'Jane',
    lastName: 'Last Name',
    lastNamePlaceholder: 'Doe',
    email: 'Email Address',
    emailPlaceholder: 'jane@example.com',
    subject: 'Subject',
    subjectPlaceholder: 'How can we help?',
    message: 'Message',
    messagePlaceholder: 'Provide details about your inquiry...',
    submit: 'Submit Message'
  },
  info: {
    title: 'Contact Information',
    email: 'Email',
    phone: 'Phone / WhatsApp',
    office: 'Office Location',
    hours: 'Business Hours'
  }
};

locales.forEach(locale => {
  const filePath = path.join(dictsPath, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.contact) {
    data.contact = {};
  }
  
  if (locale === 'en' || !data.contact.meta) {
    data.contact = contactContent;
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json with contact data`);
});
