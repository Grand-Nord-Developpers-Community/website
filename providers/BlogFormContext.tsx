"use client"
import React, { createContext, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { toast } from "sonner";
import { blogPublishSchema } from "@/schemas/blog-schema";
type blogFormData = z.infer<typeof blogPublishSchema>;



// Context definition
interface FormContextProps {
  form: ReturnType<typeof useForm<blogFormData>>;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

// Hook for using the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

// Layout Component
const BlogFormContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const form = useForm<blogFormData>({
    resolver: zodResolver(blogPublishSchema),
    defaultValues: {
      title: "",
      description: "",
      preview: "",
      previewHash: "",
      content: "",
    },
  });
  const handleUploadComplete = (url: string) => {
    //setImageURL(url);
  };
  const onSubmit = (data: blogFormData) => {
    toast.message(JSON.stringify(data));
  };
  const onSubmitError = (v: any) => {
    toast.message(JSON.stringify(v));
  };

  // const onSubmit: SubmitHandler<FormData> = (data) => {
  //   console.log('Form Submitted:', data);
  // };

  return (
    <FormContext.Provider value={{ form }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit,onSubmitError)}>
          {children}
        </form>
      </Form>
    </FormContext.Provider>
  );
};

export default BlogFormContext;
