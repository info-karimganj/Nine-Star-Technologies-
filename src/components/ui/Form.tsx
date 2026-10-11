import React from 'react';

// Common Props
export interface FormFieldProps {
  label?: string;
  error?: string;
  success?: boolean;
  helpText?: string;
}

// Input Component
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, FormFieldProps {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, success, helpText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helpId = `${inputId}-help`;
    const describedBy = [error ? errorId : null, helpText && !error ? helpId : null].filter(Boolean).join(' ') || undefined;
    
    let stateClass = '';
    if (error) stateClass = 'error';
    else if (success) stateClass = 'success';

    return (
      <div className="form-group">
        {label && <label htmlFor={inputId} className="form-label">{label}</label>}
        <input
          ref={ref}
          id={inputId}
          className={`form-input ${stateClass} ${className}`}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />
        {error && <span id={errorId} className="form-error-msg" role="alert">{error}</span>}
        {!error && helpText && <span id={helpId} className="text-caption mt-1">{helpText}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// Textarea Component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, FormFieldProps {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, success, helpText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const helpId = `${textareaId}-help`;
    const describedBy = [error ? errorId : null, helpText && !error ? helpId : null].filter(Boolean).join(' ') || undefined;
    
    let stateClass = '';
    if (error) stateClass = 'error';
    else if (success) stateClass = 'success';

    return (
      <div className="form-group">
        {label && <label htmlFor={textareaId} className="form-label">{label}</label>}
        <textarea
          ref={ref}
          id={textareaId}
          className={`form-textarea ${stateClass} ${className}`}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />
        {error && <span id={errorId} className="form-error-msg" role="alert">{error}</span>}
        {!error && helpText && <span id={helpId} className="text-caption mt-1">{helpText}</span>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

// Select Component
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, FormFieldProps {
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, error, success, helpText, options, id, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;
    const helpId = `${selectId}-help`;
    const describedBy = [error ? errorId : null, helpText && !error ? helpId : null].filter(Boolean).join(' ') || undefined;
    
    let stateClass = '';
    if (error) stateClass = 'error';
    else if (success) stateClass = 'success';

    return (
      <div className="form-group">
        {label && <label htmlFor={selectId} className="form-label">{label}</label>}
        <select
          ref={ref}
          id={selectId}
          className={`form-select ${stateClass} ${className}`}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span id={errorId} className="form-error-msg" role="alert">{error}</span>}
        {!error && helpText && <span id={helpId} className="text-caption mt-1">{helpText}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';

// Checkbox Component
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    const errorId = `${checkboxId}-error`;

    return (
      <div className="form-group mb-2">
        <div className="form-check-group">
          <input
            type="checkbox"
            ref={ref}
            id={checkboxId}
            className={`form-checkbox ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
          <label htmlFor={checkboxId} className="form-label mb-0 cursor-pointer">
            {label}
          </label>
        </div>
        {error && <span id={errorId} className="form-error-msg" role="alert">{error}</span>}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

// Radio Component
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className = '', label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const radioId = id || generatedId;

    return (
      <div className="form-check-group mb-2">
        <input
          type="radio"
          ref={ref}
          id={radioId}
          className={`form-radio ${className}`}
          {...props}
        />
        <label htmlFor={radioId} className="form-label mb-0 cursor-pointer">
          {label}
        </label>
      </div>
    );
  }
);
Radio.displayName = 'Radio';

// File Upload Component
export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>, FormFieldProps {}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className = '', label, error, success, helpText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const fileId = id || generatedId;
    const errorId = `${fileId}-error`;
    const helpId = `${fileId}-help`;
    const describedBy = [error ? errorId : null, helpText && !error ? helpId : null].filter(Boolean).join(' ') || undefined;
    
    let stateClass = '';
    if (error) stateClass = 'error';
    else if (success) stateClass = 'success';

    return (
      <div className="form-group">
        {label && <label htmlFor={fileId} className="form-label">{label}</label>}
        <input
          type="file"
          ref={ref}
          id={fileId}
          className={`form-input ${stateClass} ${className} cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-surface)] file:text-[var(--color-primary)] hover:file:bg-[var(--color-border)]`}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />
        {error && <span id={errorId} className="form-error-msg" role="alert">{error}</span>}
        {!error && helpText && <span id={helpId} className="text-caption mt-1">{helpText}</span>}
      </div>
    );
  }
);
FileUpload.displayName = 'FileUpload';
