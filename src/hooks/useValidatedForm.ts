import { useForm, UseFormReturn, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const useValidatedForm = <T extends FieldValues>(
  schema: z.ZodSchema<T>,
  options?: { defaultValues?: Partial<T> }
): UseFormReturn<T> => {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: options?.defaultValues,
    mode: 'onChange',
  });
};

export default useValidatedForm;

// Helper hook for field validation state
export function useFieldValidation(fieldError: any) {
  const hasError = !!fieldError;
  const errorMessage = fieldError?.message;
  
  return {
    hasError,
    errorMessage,
    fieldProps: {
      'aria-invalid': hasError,
      'aria-describedby': hasError ? `${name}-error` : undefined
    }
  };
}

// Hook for form field state management
export function useFormField<T extends FieldValues>(
  form: UseFormReturn<T>,
  name: keyof T
) {
  const fieldState = form.getFieldState(name as string);
  const fieldError = form.formState.errors[name];
  
  return {
    value: form.watch(name as string),
    onChange: (value: any) => form.setValue(name as string, value),
    onBlur: () => form.trigger(name as string),
    error: fieldError,
    hasError: !!fieldError,
    errorMessage: fieldError?.message,
    isDirty: fieldState.isDirty,
    isTouched: fieldState.isTouched,
    isValid: !fieldError
  };
}
