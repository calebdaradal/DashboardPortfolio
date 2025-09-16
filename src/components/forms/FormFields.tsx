import React from 'react';
import { FieldValues, FieldError, UseFormReturn } from 'react-hook-form';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

// Base field props that all field components will extend
interface BaseFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: keyof T;
  label: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// Text field specific props
interface TextFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  showPasswordToggle?: boolean;
}

// TextArea field specific props
interface TextAreaFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}

// Select field specific props
interface SelectFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  placeholder?: string;
}

// Checkbox field specific props
interface CheckboxFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  // No additional props needed
}

// Submit button props
interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  className?: string;
}

// Field wrapper component
const FieldWrapper: React.FC<{
  label: string;
  name: string;
  required?: boolean;
  description?: string;
  error?: FieldError;
  children: React.ReactNode;
  className?: string;
}> = ({ label, name, required, description, error, children, className }) => {
  return (
    <div className={cn('space-y-1', className)}>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>
      
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      
      {children}
      
      {error && (
        <p className="form-error flex items-center" id={`${name}-error`}>
          <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
          {error.message}
        </p>
      )}
    </div>
  );
};

// Text Field Component
export function TextField<T extends FieldValues>({
  form,
  name,
  label,
  type = 'text',
  placeholder,
  description,
  required,
  disabled,
  autoComplete,
  maxLength,
  showPasswordToggle = false,
  className
}: TextFieldProps<T>) {
  const [showPassword, setShowPassword] = React.useState(false);
  const fieldError = form.formState.errors[name];
  const fieldValue = form.watch(name);
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <FieldWrapper
      label={label}
      name={name as string}
      required={required}
      description={description}
      error={fieldError}
      className={className}
    >
      <div className="relative">
        <input
          {...form.register(name)}
          id={name as string}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          className={cn(
            'form-input',
            fieldError && 'border-error-300 focus:border-error-500 focus:ring-error-500',
            showPasswordToggle && 'pr-10'
          )}
          aria-invalid={!!fieldError}
          aria-describedby={fieldError ? `${name as string}-error` : undefined}
        />
        
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        )}
      </div>
      
      {maxLength && (
        <div className="text-right">
          <span className="text-xs text-gray-400">
            {String(fieldValue || '').length}/{maxLength}
          </span>
        </div>
      )}
    </FieldWrapper>
  );
}

// TextArea Field Component
export function TextAreaField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  required,
  disabled,
  rows = 3,
  maxLength,
  className
}: TextAreaFieldProps<T>) {
  const fieldError = form.formState.errors[name];
  const fieldValue = form.watch(name);
  
  return (
    <FieldWrapper
      label={label}
      name={name as string}
      required={required}
      description={description}
      error={fieldError}
      className={className}
    >
      <textarea
        {...form.register(name)}
        id={name as string}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={cn(
          'form-input',
          fieldError && 'border-error-300 focus:border-error-500 focus:ring-error-500'
        )}
        aria-invalid={!!fieldError}
        aria-describedby={fieldError ? `${name as string}-error` : undefined}
      />
      
      {maxLength && (
        <div className="text-right">
          <span className="text-xs text-gray-400">
            {String(fieldValue || '').length}/{maxLength}
          </span>
        </div>
      )}
    </FieldWrapper>
  );
}

// Select Field Component
export function SelectField<T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder,
  description,
  required,
  disabled,
  className
}: SelectFieldProps<T>) {
  const fieldError = form.formState.errors[name];
  
  return (
    <FieldWrapper
      label={label}
      name={name as string}
      required={required}
      description={description}
      error={fieldError}
      className={className}
    >
      <select
        {...form.register(name)}
        id={name as string}
        disabled={disabled}
        className={cn(
          'form-input',
          fieldError && 'border-error-300 focus:border-error-500 focus:ring-error-500'
        )}
        aria-invalid={!!fieldError}
        aria-describedby={fieldError ? `${name as string}-error` : undefined}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

// Checkbox Field Component
export function CheckboxField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  required,
  disabled,
  className
}: CheckboxFieldProps<T>) {
  const fieldError = form.formState.errors[name];
  
  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-center">
        <input
          {...form.register(name)}
          id={name as string}
          type="checkbox"
          disabled={disabled}
          className={cn(
            'h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded',
            fieldError && 'border-error-300 focus:border-error-500 focus:ring-error-500'
          )}
          aria-invalid={!!fieldError}
          aria-describedby={fieldError ? `${name as string}-error` : undefined}
        />
        <label htmlFor={name as string} className="ml-2 block text-sm text-gray-900">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      </div>
      
      {description && (
        <p className="text-sm text-gray-500 ml-6">{description}</p>
      )}
      
      {fieldError && (
        <p className="form-error flex items-center ml-6" id={`${name as string}-error`}>
          <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
          {fieldError.message}
        </p>
      )}
    </div>
  );
}

// Submit Button Component
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  isLoading = false,
  loadingText = 'Loading...',
  disabled = false,
  className
}) => {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={cn('btn-primary', className)}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 mr-2 spinner" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};
