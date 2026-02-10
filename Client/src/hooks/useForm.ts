import { useState, useCallback } from 'react';
import { ZodSchema } from 'zod';

interface UseFormProps<T> {
  initialValues: T;
  validationSchema?: ZodSchema<T>;
  onSubmit: (values: T) => Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (validationSchema) {
      try {
        validationSchema.parse(values);
      } catch (error: any) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          const path = err.path.join('.');
          formattedErrors[path] = err.message;
        });
        setErrors(formattedErrors);
        return;
      }
    }

    setLoading(true);
    try {
      await onSubmit(values);
    } catch (error) {
      // Error handling is done in the component
    } finally {
      setLoading(false);
    }
  }, [values, validationSchema, onSubmit]);

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
    setValues,
    setErrors,
  };
}

export default useForm;