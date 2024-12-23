"use client";
import React, { createContext, useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { blogPublishSchema } from "@/schemas/blog-schema";
import { uploadImageToCloudinary } from "@/lib/api";
import { AxiosProgressEvent } from "axios";
import { Form } from "@/components/ui/form";
import { createBlogPost } from "@/actions/blog.actions";
import { useSWRConfig } from "swr";

type BlogFormData = z.infer<typeof blogPublishSchema>;

// Context definition
interface FormContextProps {
  form: ReturnType<typeof useForm<BlogFormData>>;
  loading: boolean;
  success: boolean;
  progress: number;
  setCompressedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

// Create Context
const FormContext = createContext<FormContextProps | undefined>(undefined);

// Hook for using the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

//TO BE FIX

const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY||"126785599786519";
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET||"gndc-image-blog";

// Layout Component
const BlogFormContext: React.FC<{
  children: React.ReactNode;
  userId: string;
}> = ({ children, userId }) => {
  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogPublishSchema),
    defaultValues: {
      title: "",
      description: "",
      preview: "https://temp-image.com",
      previewHash: "",
      content: "",
    },
  });
  const { mutate } = useSWRConfig();
  const { setValue, setError } = form;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  const handleImageUpload = async () => {
    if (!compressedFile) {
      setError("preview", {
        message: "svp chargez une image de previsualisation",
      });
      throw "Please upload a preview image.";
      //return;
    }

    setLoading(true);

    // Upload the image
    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", uploadPreset as string);
    formData.append("api_key", apiKey as string);

    try {
      const res = await uploadImageToCloudinary(formData, onUploadProgress);
      if (res.status === 200) {
        const uploadedUrl = res.data.url;
        // Update the form field with the uploaded image URL
        //setValue("preview", uploadedUrl, { shouldValidate: true });

        // Proceed with form submission
        //toast.success("Form submitted successfully!");
        return uploadedUrl;
      }
    } catch (error) {
      //toast.error("Error uploading image: " + error);
      //@ts-ignore
      throw "Error uploading image: " + error?.message;
      //return ""
    }
  };

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    if (progressEvent.total) {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentage);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      const imageDataURL = await handleImageUpload();
      const v = { ...data, preview: imageDataURL };
      //toast.message(JSON.stringify(v));
      const res = await createBlogPost({ ...v, authorId: userId });
      if (res.success) {
        form.reset();
        setSuccess(true);
        toast.success(res.message);
        //mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);
        mutate(`/api/blogs`);
      } else {
        if (!res.success && res.revalidate) {
          //@ts-ignore
          setError(res.revalidate, { message: res.message });
        } else {
          throw res.message;
        }
      }
    } catch (e) {
      toast.error(e as string);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 1500);
    }
  };

  //@ts-ignore
  const onSubmitError = (data) => {
    //toast.error(JSON.stringify(data))
    if (data.content) toast.message(JSON.stringify(data.content.message));
    if (data.preview || data.previewHash)
      setError("preview", { message: "une previsualisation du blog" });
  };
  return (
    <FormContext.Provider
      value={{ form, loading, progress, setCompressedFile, success }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onSubmitError)}>
          {children}
        </form>
      </Form>
    </FormContext.Provider>
  );
};

export default BlogFormContext;
