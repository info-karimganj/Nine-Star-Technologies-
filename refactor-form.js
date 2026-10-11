const fs = require('fs');
let code = fs.readFileSync('C:/Users/user/Downloads/Nine Star technologys/src/components/services/RequestForm.tsx', 'utf-8');

code = code.replace(
  'interface RequestFormProps {\n  service: Service;\n}',
  'interface RequestFormProps {\n  service: Service;\n  dict: any;\n  lang: string;\n}'
);

code = code.replace(
  'export function RequestForm({ service }: RequestFormProps) {',
  'export function RequestForm({ service, dict, lang }: RequestFormProps) {'
);

code = code.replace(
  "if (!formData.name.trim()) { newErrors.name = 'Name is required'; isValid = false; }",
  "if (!formData.name.trim()) { newErrors.name = dict.errors.nameRequired; isValid = false; }"
);
code = code.replace(
  "newErrors.email = 'Email is required'; isValid = false;",
  "newErrors.email = dict.errors.emailRequired; isValid = false;"
);
code = code.replace(
  "newErrors.email = 'Invalid email format'; isValid = false;",
  "newErrors.email = dict.errors.emailInvalid; isValid = false;"
);
code = code.replace(
  "if (!formData.goal.trim()) { newErrors.goal = 'Primary goal is required'; isValid = false; }",
  "if (!formData.goal.trim()) { newErrors.goal = dict.errors.goalRequired; isValid = false; }"
);
code = code.replace(
  "if (!formData.description.trim()) { newErrors.description = 'Description is required'; isValid = false; }",
  "if (!formData.description.trim()) { newErrors.description = dict.errors.descRequired; isValid = false; }"
);
code = code.replace(
  "setFileError('One or more files exceed the 10MB size limit.');",
  "setFileError(dict.errors.fileTooLarge);"
);
code = code.replace(
  "setSubmitError('There was a network error submitting your request. Please try again.');",
  "setSubmitError(dict.errors.networkError);"
);

code = code.replace(
  /\{\['Service', 'Details', 'Requirements', 'Files', 'Review'\].map\(\(label, idx\) => \{/g,
  "{[dict.progress.service, dict.progress.details, dict.progress.requirements, dict.progress.files, dict.progress.review].map((label, idx) => {"
);

code = code.replace(
  '<Typography variant="display" className="text-3xl md:text-4xl">Request Received</Typography>',
  '<Typography variant="display" className="text-3xl md:text-4xl">{dict.success.title}</Typography>'
);

code = code.replace(
  /Thank you for requesting <strong>\{service\.title\}<\/strong>\. We have received your details successfully\./g,
  '{dict.success.thankYou} <strong>{service.title}</strong>. {dict.success.receivedSuccess}'
);

code = code.replace(
  /<Typography variant="label" className="text-\[var\(--color-muted\)\] uppercase tracking-wider mb-1 block">Reference Number<\/Typography>/g,
  '<Typography variant="label" className="text-[var(--color-muted)] uppercase tracking-wider mb-1 block">{dict.success.referenceNumber}</Typography>'
);

code = code.replace(
  '<Typography variant="h3" className="font-bold">What happens next?</Typography>',
  '<Typography variant="h3" className="font-bold">{dict.success.whatNext}</Typography>'
);

code = code.replace(
  '<span className="text-[var(--color-text)]">Our team will review your request and requirements.</span>',
  '<span className="text-[var(--color-text)]">{dict.success.step1}</span>'
);
code = code.replace(
  '<span className="text-[var(--color-text)]">You will receive an email within 24-48 hours.</span>',
  '<span className="text-[var(--color-text)]">{dict.success.step2}</span>'
);
code = code.replace(
  '<span className="text-[var(--color-text)]">We may schedule a brief consultation to clarify details.</span>',
  '<span className="text-[var(--color-text)]">{dict.success.step3}</span>'
);

code = code.replace(
  'Need immediate assistance? Contact support at support@9startechnologies.com',
  '{dict.success.supportText}'
);

code = code.replace(
  '<Button variant="primary">Return Home</Button>',
  '<Button variant="primary">{dict.success.returnHome}</Button>'
);
code = code.replace(
  '<Link href="/">',
  '<Link href={`/${lang}`}>'
);

code = code.replace(
  '<Typography variant="h2" className="text-2xl font-bold mb-6">Confirm Service</Typography>',
  '<Typography variant="h2" className="text-2xl font-bold mb-6">{dict.step1.title}</Typography>'
);
code = code.replace(
  '<Typography variant="label" className="text-[var(--color-secondary)] mb-2 block uppercase tracking-wider text-xs">Selected Service</Typography>',
  '<Typography variant="label" className="text-[var(--color-secondary)] mb-2 block uppercase tracking-wider text-xs">{dict.step1.selectedService}</Typography>'
);
code = code.replace(
  'Continue to Details',
  '{dict.step1.continueBtn}'
);

code = code.replace(
  '<Typography variant="h2" className="text-2xl font-bold mb-6">Your Information</Typography>',
  '<Typography variant="h2" className="text-2xl font-bold mb-6">{dict.step2.title}</Typography>'
);

code = code.replace(
  /label="Full Name \*"/g,
  'label={dict.step2.fullName}'
);
code = code.replace(
  /placeholder="John Doe"/g,
  'placeholder={dict.step2.fullNamePlaceholder}'
);
code = code.replace(
  /label="Email Address \*"/g,
  'label={dict.step2.email}'
);
code = code.replace(
  /placeholder="john@example\.com"/g,
  'placeholder={dict.step2.emailPlaceholder}'
);
code = code.replace(
  /label="Phone Number"/g,
  'label={dict.step2.phone}'
);
code = code.replace(
  /placeholder="\+1 \(555\) 000-0000"/g,
  'placeholder={dict.step2.phonePlaceholder}'
);
code = code.replace(
  /label="Country \/ Region"/g,
  'label={dict.step2.country}'
);
code = code.replace(
  /placeholder="United States"/g,
  'placeholder={dict.step2.countryPlaceholder}'
);
code = code.replace(
  /label="Preferred Communication Method"/g,
  'label={dict.step2.communication}'
);
code = code.replace(
  /\{ label: 'Email', value: 'email' \}/g,
  "{ label: dict.step2.commEmail, value: 'email' }"
);
code = code.replace(
  /\{ label: 'Phone', value: 'phone' \}/g,
  "{ label: dict.step2.commPhone, value: 'phone' }"
);
code = code.replace(
  /\{ label: 'Video Call', value: 'video' \}/g,
  "{ label: dict.step2.commVideo, value: 'video' }"
);
code = code.replace(
  /<Button variant="text" onClick=\{prevStep\}>Back<\/Button>/g,
  '<Button variant="text" onClick={prevStep}>{dict.step2.backBtn}</Button>'
);
code = code.replace(
  '<Button variant="primary" onClick={nextStep}>Next: Requirements</Button>',
  '<Button variant="primary" onClick={nextStep}>{dict.step2.nextBtn}</Button>'
);

code = code.replace(
  '<Typography variant="h2" className="text-2xl font-bold mb-6">Service Requirements</Typography>',
  '<Typography variant="h2" className="text-2xl font-bold mb-6">{dict.step3.title}</Typography>'
);
code = code.replace(
  /label="Primary Goal \*"/g,
  'label={dict.step3.goal}'
);
code = code.replace(
  /placeholder="What is the main objective you want to achieve with this service\?"/g,
  'placeholder={dict.step3.goalPlaceholder}'
);
code = code.replace(
  /label="Estimated Budget Range"/g,
  'label={dict.step3.budget}'
);
code = code.replace(
  /\{ label: 'Not Sure', value: 'none' \}/g,
  "{ label: dict.step3.budgetOptions.none, value: 'none' }"
);
code = code.replace(
  /\{ label: 'Under \$1,000', value: 'tier1' \}/g,
  "{ label: dict.step3.budgetOptions.tier1, value: 'tier1' }"
);
code = code.replace(
  /\{ label: '\$1,000 - \$5,000', value: 'tier2' \}/g,
  "{ label: dict.step3.budgetOptions.tier2, value: 'tier2' }"
);
code = code.replace(
  /\{ label: '\$5,000 - \$10,000', value: 'tier3' \}/g,
  "{ label: dict.step3.budgetOptions.tier3, value: 'tier3' }"
);
code = code.replace(
  /\{ label: '\$10,000\+', value: 'tier4' \}/g,
  "{ label: dict.step3.budgetOptions.tier4, value: 'tier4' }"
);
code = code.replace(
  /label="Target Deadline"/g,
  'label={dict.step3.deadline}'
);
code = code.replace(
  /label="Detailed Description \*"/g,
  'label={dict.step3.description}'
);
code = code.replace(
  /placeholder="Please provide any additional details, requirements, or context\.\.\."/g,
  'placeholder={dict.step3.descPlaceholder}'
);
code = code.replace(
  '<Typography variant="label" className="text-[var(--color-secondary)] font-bold mb-2 block">Reminder</Typography>',
  '<Typography variant="label" className="text-[var(--color-secondary)] font-bold mb-2 block">{dict.step3.reminder}</Typography>'
);
code = code.replace(
  '<Typography variant="small">This service generally requires the following documents to begin:</Typography>',
  '<Typography variant="small">{dict.step3.reminderText}</Typography>'
);
code = code.replace(
  '<Button variant="primary" onClick={nextStep}>Next: Files</Button>',
  '<Button variant="primary" onClick={nextStep}>{dict.step3.nextBtn}</Button>'
);

code = code.replace(
  '<Typography variant="h2" className="text-2xl font-bold mb-6">Upload Documents</Typography>',
  '<Typography variant="h2" className="text-2xl font-bold mb-6">{dict.step4.title}</Typography>'
);
code = code.replace(
  'If you have any initial files, brand guidelines, or documents required for this service, you can upload them here.',
  '{dict.step4.subtitle}'
);
code = code.replace(
  /label="Choose Files \(Max 10MB per file\)"/g,
  'label={dict.step4.chooseFiles}'
);
code = code.replace(
  '<Typography variant="label" className="font-bold block">Attached Files:</Typography>',
  '<Typography variant="label" className="font-bold block">{dict.step4.attachedFiles}</Typography>'
);
code = code.replace(
  '<Button variant="primary" onClick={nextStep}>Next: Review</Button>',
  '<Button variant="primary" onClick={nextStep}>{dict.step4.nextBtn}</Button>'
);

code = code.replace(
  '<Typography variant="h2" className="text-2xl font-bold mb-6">Review Your Request</Typography>',
  '<Typography variant="h2" className="text-2xl font-bold mb-6">{dict.step5.title}</Typography>'
);

code = code.replace(
  '<Typography variant="h3" className="font-bold text-lg">Service</Typography>',
  '<Typography variant="h3" className="font-bold text-lg">{dict.step5.service}</Typography>'
);
code = code.replace(
  '<Typography variant="h3" className="font-bold text-lg">Contact Info</Typography>',
  '<Typography variant="h3" className="font-bold text-lg">{dict.step5.contactInfo}</Typography>'
);
code = code.replace(
  />Edit<\/button>/g,
  '>{dict.step5.edit}</button>'
);
code = code.replace(
  '<span className="text-[var(--color-muted)] block">Name</span>',
  '<span className="text-[var(--color-muted)] block">{dict.step5.nameLabel}</span>'
);
code = code.replace(
  '<span className="text-[var(--color-muted)] block">Email</span>',
  '<span className="text-[var(--color-muted)] block">{dict.step5.emailLabel}</span>'
);
code = code.replace(
  '<span className="text-[var(--color-muted)] block">Phone</span>',
  '<span className="text-[var(--color-muted)] block">{dict.step5.phoneLabel}</span>'
);
code = code.replace(
  '<span className="text-[var(--color-muted)] block">Country</span>',
  '<span className="text-[var(--color-muted)] block">{dict.step5.countryLabel}</span>'
);

code = code.replace(
  '<Typography variant="h3" className="font-bold text-lg">Requirements</Typography>',
  '<Typography variant="h3" className="font-bold text-lg">{dict.step5.requirements}</Typography>'
);
code = code.replace(
  '<span className="text-[var(--color-muted)] block">Primary Goal</span>',
  '<span className="text-[var(--color-muted)] block">{dict.step5.goalLabel}</span>'
);
code = code.replace(
  '<span className="text-[var(--color-muted)] block">Description</span>',
  '<span className="text-[var(--color-muted)] block">{dict.step5.descLabel}</span>'
);
code = code.replace(
  '<span className="text-[var(--color-muted)] block">Budget</span>',
  '<span className="text-[var(--color-muted)] block">{dict.step5.budgetLabel}</span>'
);
code = code.replace(
  '<span className="text-[var(--color-muted)] block">Deadline</span>',
  '<span className="text-[var(--color-muted)] block">{dict.step5.deadlineLabel}</span>'
);

code = code.replace(
  /<Typography variant="h3" className="font-bold text-lg">Attached Files \(\{formData\.files\.length\}\)<\/Typography>/g,
  '<Typography variant="h3" className="font-bold text-lg">{dict.step5.attachedFiles} ({formData.files.length})</Typography>'
);

code = code.replace(
  '<Button variant="text" onClick={prevStep} disabled={isSubmitting}>Back</Button>',
  '<Button variant="text" onClick={prevStep} disabled={isSubmitting}>{dict.step5.backBtn}</Button>'
);
code = code.replace(
  'Submit Request',
  '{dict.step5.submitBtn}'
);

fs.writeFileSync('C:/Users/user/Downloads/Nine Star technologys/src/components/services/RequestForm.tsx', code);
console.log('done');
