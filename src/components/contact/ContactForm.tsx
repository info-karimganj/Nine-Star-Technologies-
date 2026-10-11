'use client';

import React, { useState } from 'react';
import { Input, Textarea } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';

export function ContactForm({ dict }: { dict: any }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleFocus = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('contact_form_started');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('/api/admin/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceTitle: subject || 'General Contact Inquiry',
          customerName: `${firstName} ${lastName}`.trim(),
          customerEmail: email,
          projectGoal: subject || 'General Inquiry',
          projectDetails: message
        })
      });
      setIsSuccess(true);
      trackEvent('contact_form_completed');
    } catch {
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 text-emerald-900 p-6 rounded-xl border border-emerald-200 fade-in">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-emerald-800">
          <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Message Sent!
        </h3>
        <p className="text-sm text-emerald-800 leading-relaxed">Thank you for reaching out. We will get back to you shortly.</p>
        <Button onClick={() => { setIsSuccess(false); setHasStarted(false); }} className="mt-4" size="sm" variant="outline">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label={dict.contact.form.firstName}
          placeholder={dict.contact.form.firstNamePlaceholder}
          value={firstName}
          onChange={(e: any) => setFirstName(e.target.value)}
          onFocus={handleFocus}
          required
        />
        <Input
          label={dict.contact.form.lastName}
          placeholder={dict.contact.form.lastNamePlaceholder}
          value={lastName}
          onChange={(e: any) => setLastName(e.target.value)}
          onFocus={handleFocus}
          required
        />
      </div>
      <Input
        label={dict.contact.form.email}
        type="email"
        placeholder={dict.contact.form.emailPlaceholder}
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        onFocus={handleFocus}
        required
      />
      <Input
        label={dict.contact.form.subject}
        placeholder={dict.contact.form.subjectPlaceholder}
        value={subject}
        onChange={(e: any) => setSubject(e.target.value)}
        onFocus={handleFocus}
        required
      />
      <Textarea
        label={dict.contact.form.message}
        placeholder={dict.contact.form.messagePlaceholder}
        rows={5}
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        onFocus={handleFocus}
        required
      />
      <div className="pt-2">
        <label className="flex items-start gap-2.5 text-xs text-[var(--color-text-muted)] cursor-pointer">
          <input
            type="checkbox"
            required
            className="mt-0.5 rounded text-[#d4af37] focus:ring-[#d4af37] border-gray-300"
          />
          <span>
            {dict.contact.form.consentNotice || 'I agree to the collection and processing of my contact information in accordance with 9STAR Technologies\''} <a href="/en/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline font-semibold">Privacy Policy</a>.
          </span>
        </label>
      </div>

      <Button type="submit" size="md" className="w-full sm:w-auto px-8" isLoading={isSubmitting} disabled={isSubmitting}>
        {dict.contact.form.submit}
      </Button>
    </form>
  );
}
