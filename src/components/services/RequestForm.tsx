"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input, Textarea, Select, FileUpload } from '@/components/ui/Form';
import { trackEvent } from '@/lib/analytics';

interface FormService {
  title: string;
  description: string;
  requirements?: {
    documents?: string[];
  };
}

interface RequestFormProps {
  service: FormService;
  dict: Record<string, any>;
  lang: string;
}

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  communication: string;
  goal: string;
  deadline: string;
  budget: string;
  description: string;
  files: File[];
}

export function RequestForm({ service, dict, lang }: RequestFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    communication: 'email',
    goal: '',
    deadline: '',
    budget: '',
    description: '',
    files: [],
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [fileError, setFileError] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  // Track initial load of form
  React.useEffect(() => {
    trackEvent('service_request_started', { service: service.title });
  }, [service.title]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles: File[] = [];
      let hasError = false;

      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
        'text/plain',
        'image/jpeg',
        'image/png',
        'image/webp'
      ];

      selectedFiles.forEach((file) => {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          setFileError(dict.errors.fileTooLarge || 'File exceeds 10MB limit');
          hasError = true;
        } else if (!allowedTypes.includes(file.type)) {
          setFileError(dict.errors.invalidFileType || 'Invalid file type. Please upload documents or images.');
          hasError = true;
        } else {
          validFiles.push(file);
        }
      });

      if (!hasError) {
        setFormData((prev) => ({ ...prev, files: [...prev.files, ...validFiles] }));
      }
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => {
      const newFiles = [...prev.files];
      newFiles.splice(index, 1);
      return { ...prev, files: newFiles };
    });
  };

  const validateStep = (currentStep: Step): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    if (currentStep === 2) {
      if (!formData.name.trim()) { newErrors.name = dict.errors.nameRequired; isValid = false; }
      if (!formData.email.trim()) { 
        newErrors.email = dict.errors.emailRequired; isValid = false; 
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = dict.errors.emailInvalid; isValid = false;
      }
    } else if (currentStep === 3) {
      if (!formData.goal.trim()) { newErrors.goal = dict.errors.goalRequired; isValid = false; }
      if (!formData.description.trim()) { newErrors.description = dict.errors.descRequired; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      trackEvent('service_request_step_completed', { service: service.title, step });
      setStep((prev) => (prev + 1) as Step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep((prev) => (prev - 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const res = await fetch('/api/admin/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceTitle: service.title,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          country: formData.country,
          projectBudget: formData.budget,
          projectTimeline: formData.deadline,
          projectGoal: formData.goal,
          projectDetails: formData.description,
          attachedFiles: formData.files.map(f => f.name)
        })
      });

      const data = await res.json();
      const ref = data.referenceNumber || `9STAR-${Date.now().toString().slice(-6)}`;
      setReferenceNumber(ref);
      setIsSuccess(true);
      setStep(6);
      
      trackEvent('service_request_completed', { 
        service: service.title,
        budget: formData.budget !== 'none' ? formData.budget : undefined,
        hasFiles: formData.files.length > 0
      });
    } catch {
      setSubmitError(dict.errors.networkError || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && step === 6) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <Typography variant="display" className="text-3xl md:text-4xl">{dict.success.title}</Typography>
        <Typography variant="body" className="text-[var(--color-muted)] text-lg">
          {dict.success.thankYou} <strong>{service.title}</strong>. {dict.success.receivedSuccess}
        </Typography>
        
        <div className="p-6 bg-[var(--color-muted)]/10 rounded-xl border border-[var(--color-border)] inline-block">
          <Typography variant="label" className="text-[var(--color-muted)] uppercase tracking-wider mb-1 block">{dict.success.referenceNumber}</Typography>
          <Typography variant="h2" className="text-2xl font-mono font-bold tracking-tight text-[var(--color-primary)]">{referenceNumber}</Typography>
        </div>

        <div className="text-left space-y-4 max-w-md mx-auto mt-8 p-6 border border-[var(--color-border)] rounded-xl">
          <Typography variant="h3" className="font-bold">{dict.success.whatNext}</Typography>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-[var(--color-secondary)]">1.</span>
              <span className="text-[var(--color-text)]">{dict.success.step1}</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-secondary)]">2.</span>
              <span className="text-[var(--color-text)]">{dict.success.step2}</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-secondary)]">3.</span>
              <span className="text-[var(--color-text)]">{dict.success.step3}</span>
            </li>
          </ul>
        </div>

        <div className="pt-8">
          <Typography variant="small" className="text-[var(--color-muted)] block mb-4">
            {dict.success.supportText}
          </Typography>
          <Link href={`/${lang}`}>
            <Button variant="primary">{dict.success.returnHome}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between mb-2">
          {[dict.progress.service, dict.progress.details, dict.progress.requirements, dict.progress.files, dict.progress.review].map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = step === stepNum;
            const isPast = step > stepNum;
            return (
              <div key={label} className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-[var(--color-primary)]' : isPast ? 'text-[var(--color-secondary)]' : 'text-[var(--color-muted)]'}`}>
                {label}
              </div>
            );
          })}
        </div>
        <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-300"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      <Card className="bg-[var(--color-base)] border border-[var(--color-border)] shadow-sm">
        <CardContent className="p-6 md:p-10">
          
          {/* STEP 1: Service Confirmation */}
          {step === 1 && (
            <div className="space-y-6">
              <Typography variant="h2" className="text-2xl font-bold mb-6">{dict.step1.title}</Typography>
              <div className="p-6 bg-[var(--color-muted)]/5 border border-[var(--color-border)] rounded-xl">
                <Typography variant="label" className="text-[var(--color-secondary)] mb-2 block uppercase tracking-wider text-xs">{dict.step1.selectedService}</Typography>
                <Typography variant="h3" className="text-xl font-bold mb-2">{service.title}</Typography>
                <Typography variant="body" className="text-[var(--color-muted)]">{service.description}</Typography>
              </div>
              <div className="flex justify-end pt-6">
                <Button variant="primary" onClick={nextStep} rightIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>}>
                  {dict.step1.continueBtn}
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Customer Information */}
          {step === 2 && (
            <div className="space-y-6">
              <Typography variant="h2" className="text-2xl font-bold mb-6">{dict.step2.title}</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label={dict.step2.fullName} 
                  placeholder={dict.step2.fullNamePlaceholder} 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                />
                <Input 
                  label={dict.step2.email} 
                  type="email" 
                  placeholder={dict.step2.emailPlaceholder} 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                />
                <Input 
                  label={dict.step2.phone} 
                  type="tel" 
                  placeholder={dict.step2.phonePlaceholder} 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
                <Input 
                  label={dict.step2.country} 
                  placeholder={dict.step2.countryPlaceholder} 
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                />
                <div className="md:col-span-2">
                  <Select 
                    label={dict.step2.communication}
                    options={[
                      { label: dict.step2.commEmail, value: 'email' },
                      { label: dict.step2.commPhone, value: 'phone' },
                      { label: dict.step2.commVideo, value: 'video' }
                    ]}
                    value={formData.communication}
                    onChange={(e) => handleInputChange('communication', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between pt-6 border-t border-[var(--color-border)] mt-8">
                <Button variant="text" onClick={prevStep}>{dict.step2.backBtn}</Button>
                <Button variant="primary" onClick={nextStep}>{dict.step2.nextBtn}</Button>
              </div>
            </div>
          )}

          {/* STEP 3: Requirements */}
          {step === 3 && (
            <div className="space-y-6">
              <Typography variant="h2" className="text-2xl font-bold mb-6">{dict.step3.title}</Typography>
              
              <div className="space-y-6">
                <Textarea 
                  label={dict.step3.goal} 
                  placeholder={dict.step3.goalPlaceholder} 
                  rows={3}
                  value={formData.goal}
                  onChange={(e) => handleInputChange('goal', e.target.value)}
                  error={errors.goal}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select 
                    label={dict.step3.budget}
                    options={[
                      { label: dict.step3.budgetOptions.none, value: 'none' },
                      { label: dict.step3.budgetOptions.tier1, value: 'tier1' },
                      { label: dict.step3.budgetOptions.tier2, value: 'tier2' },
                      { label: dict.step3.budgetOptions.tier3, value: 'tier3' },
                      { label: dict.step3.budgetOptions.tier4, value: 'tier4' }
                    ]}
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                  />
                  <Input 
                    label={dict.step3.deadline} 
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                  />
                </div>

                <Textarea 
                  label={dict.step3.description} 
                  placeholder={dict.step3.descPlaceholder} 
                  rows={6}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  error={errors.description}
                />

                {service.requirements?.documents && service.requirements.documents.length > 0 && (
                  <div className="p-4 bg-[var(--color-secondary)]/10 rounded-lg border border-[var(--color-secondary)]/20">
                    <Typography variant="label" className="text-[var(--color-secondary)] font-bold mb-2 block">{dict.step3.reminder}</Typography>
                    <Typography variant="small">{dict.step3.reminderText}</Typography>
                    <ul className="list-disc list-inside mt-2 text-sm">
                      {service.requirements.documents.map((req, idx) => <li key={idx}>{req}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-6 border-t border-[var(--color-border)] mt-8">
                <Button variant="text" onClick={prevStep}>{dict.step2.backBtn}</Button>
                <Button variant="primary" onClick={nextStep}>{dict.step3.nextBtn}</Button>
              </div>
            </div>
          )}

          {/* STEP 4: Files */}
          {step === 4 && (
            <div className="space-y-6">
              <Typography variant="h2" className="text-2xl font-bold mb-6">{dict.step4.title}</Typography>
              <Typography variant="body" className="text-[var(--color-muted)] mb-6">
                {dict.step4.subtitle}
              </Typography>
              
              <div className="p-8 border-2 border-dashed border-[var(--color-border)] rounded-xl text-center hover:bg-[var(--color-muted)]/5 transition-colors">
                <FileUpload 
                  label={dict.step4.chooseFiles} 
                  multiple 
                  onChange={handleFileChange} 
                  error={fileError}
                />
              </div>

              {formData.files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <Typography variant="label" className="font-bold block">{dict.step4.attachedFiles}</Typography>
                  {formData.files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-base)]">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <svg className="w-5 h-5 text-[var(--color-muted)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                        <span className="text-sm font-medium truncate">{file.name}</span>
                        <span className="text-xs text-[var(--color-muted)] shrink-0">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <button onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700 p-1 shrink-0" aria-label="Remove file">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between pt-6 border-t border-[var(--color-border)] mt-8">
                <Button variant="text" onClick={prevStep}>{dict.step2.backBtn}</Button>
                <Button variant="primary" onClick={nextStep}>{dict.step4.nextBtn}</Button>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Submit */}
          {step === 5 && (
            <div className="space-y-8">
              <Typography variant="h2" className="text-2xl font-bold mb-6">{dict.step5.title}</Typography>
              
              <div className="space-y-6 divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-xl p-6">
                
                <div className="pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="h3" className="font-bold text-lg">{dict.step5.service}</Typography>
                  </div>
                  <Typography variant="body">{service.title}</Typography>
                </div>

                <div className="py-4">
                  <div className="flex justify-between items-center mb-4">
                    <Typography variant="h3" className="font-bold text-lg">{dict.step5.contactInfo}</Typography>
                    <button onClick={() => setStep(2)} className="text-sm font-bold text-[var(--color-secondary)] hover:underline">{dict.step5.edit}</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm break-words">
                    <div><span className="text-[var(--color-muted)] block">{dict.step5.nameLabel}</span>{formData.name}</div>
                    <div><span className="text-[var(--color-muted)] block">{dict.step5.emailLabel}</span>{formData.email}</div>
                    {formData.phone && <div><span className="text-[var(--color-muted)] block">{dict.step5.phoneLabel}</span>{formData.phone}</div>}
                    {formData.country && <div><span className="text-[var(--color-muted)] block">{dict.step5.countryLabel}</span>{formData.country}</div>}
                  </div>
                </div>

                <div className="py-4">
                  <div className="flex justify-between items-center mb-4">
                    <Typography variant="h3" className="font-bold text-lg">{dict.step5.requirements}</Typography>
                    <button onClick={() => setStep(3)} className="text-sm font-bold text-[var(--color-secondary)] hover:underline">{dict.step5.edit}</button>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div><span className="text-[var(--color-muted)] block">{dict.step5.goalLabel}</span>{formData.goal}</div>
                    <div><span className="text-[var(--color-muted)] block">{dict.step5.descLabel}</span><p className="whitespace-pre-wrap break-words">{formData.description}</p></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 break-words">
                      {formData.budget !== 'none' && formData.budget && <div><span className="text-[var(--color-muted)] block">{dict.step5.budgetLabel}</span>{formData.budget}</div>}
                      {formData.deadline && <div><span className="text-[var(--color-muted)] block">{dict.step5.deadlineLabel}</span>{formData.deadline}</div>}
                    </div>
                  </div>
                </div>

                {formData.files.length > 0 && (
                  <div className="pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <Typography variant="h3" className="font-bold text-lg">{dict.step5.attachedFiles} ({formData.files.length})</Typography>
                      <button onClick={() => setStep(4)} className="text-sm font-bold text-[var(--color-secondary)] hover:underline">{dict.step5.edit}</button>
                    </div>
                    <ul className="list-disc list-inside text-sm text-[var(--color-muted)]">
                      {formData.files.map((f, i) => <li key={i}>{f.name}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 mt-4">
                <label className="flex items-start gap-2.5 text-xs text-[var(--color-text-muted)] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    id="legal-consent-checkbox"
                    defaultChecked
                    className="mt-0.5 rounded text-[#d4af37] focus:ring-[#d4af37] border-gray-300"
                  />
                  <span>
                    {dict.step5?.legalConsentNotice || 'I confirm that the submitted project details are accurate and agree to the'} <a href={`/${lang}/legal/terms-and-conditions`} target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline font-semibold">Terms & Conditions</a> {dict.step5?.and || 'and'} <a href={`/${lang}/legal/privacy-policy`} target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline font-semibold">Privacy Policy</a>.
                  </span>
                </label>
              </div>

              {submitError && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  {submitError}
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button variant="text" onClick={prevStep} disabled={isSubmitting}>{dict.step5.backBtn}</Button>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleSubmit} 
                  isLoading={isSubmitting}
                  rightIcon={!isSubmitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
                >
                  {dict.step5.submitBtn}
                </Button>
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
