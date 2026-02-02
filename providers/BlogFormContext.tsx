"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { blogPublishSchema } from "@/schemas/blog-schema";
import { uploadImageToCloudinary } from "@/lib/api";
import { AxiosProgressEvent } from "axios";
import { Form } from "@/components/ui/form";
import {
  createBlogPost,
  getBlogPostEdit,
  updateBlogPost,
} from "@/actions/blog.actions";
import { useSWRConfig } from "swr";
import { useRouter, usePathname } from "next/navigation";
import { slugify } from "@/lib/utils";

type BlogFormData = z.infer<typeof blogPublishSchema>;

// Context definition
interface FormContextProps {
  form: ReturnType<typeof useForm<BlogFormData>>;
  loading: boolean;
  success: boolean;
  progress: number;
  img: string | null;
  isEdit: boolean;
  setCompressedFile: React.Dispatch<React.SetStateAction<File | null>>;
  onRemoveLoadedImage?: () => void;
  onSubmit: () => void;
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

const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

// Layout Component
const BlogFormContext: React.FC<{
  children: React.ReactNode;
  userId: string;
  post?: Awaited<ReturnType<typeof getBlogPostEdit>>;
}> = ({ children, userId, post }) => {
  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogPublishSchema),
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      preview: post?.preview || "https://temp-image.com",
      previewHash: post?.previewHash || "",
      content: post?.content || "",
      tags:post?.tags??null
    },
  });
  const { mutate } = useSWRConfig();
  const { setValue, setError } = form;
  const [loading, setLoading] = useState(false);
  const [img, setImage] = useState(post?.preview || null);
  const router = useRouter();
  const pathname = usePathname();
  const [isEdit, setIsEdit] = useState(post ? true : false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isPreviewChanged, setPreviewChanged] = useState(false);
  function handleRemoveLoadedImage() {
    setImage(null);
    setPreviewChanged(true);
  }
  useEffect(() => {
    if (compressedFile) {
      setPreviewChanged(true);
    }
  }, [compressedFile]);

  const handleImageUpload = async () => {
    if (!compressedFile) {
      setError("preview", {
        message: "svp chargez une image de previsualisation",
      });
      throw "Please upload a preview image.";
      //return;
    }

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
      toast.error("Error uploading image: " + error);
      //@ts-ignore
      throw "Error uploading image: " + error?.message;
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

    setLoading(true);
    try {
      const imageDataURL = isPreviewChanged ? await handleImageUpload() : img;
      const v = { ...data, preview: imageDataURL };
      
      const res = !isEdit
        ? await createBlogPost({ ...v, authorId: userId })
        : await updateBlogPost({ ...v, id: post?.id, authorId: userId });
      if (res?.success) {
        if (!isEdit) {
          form.reset();
          setSuccess(true);
        }
        const currentSlug = pathname.split("/").pop();
        const newSlug = slugify(form.getValues("title") as string);

        toast.success(res.message);
        if (isEdit && currentSlug !== newSlug) {
          router.push(`/blog/${newSlug}/edit`);
          //return;
        }
        //mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);
        mutate("/api/blogs", true);
      } else {
        if (!res?.success && res?.revalidate) {
          //@ts-ignore
          setError(res.revalidate, { message: res.message });
        } else {
          throw res?.message;
        }
      }
    } catch (e) {
      console.log(e)
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
      value={{
        form,
        loading,
        progress,
        setCompressedFile,
        success,
        isEdit,
        img,
        onRemoveLoadedImage: handleRemoveLoadedImage,
        onSubmit: () => {
          form.handleSubmit(onSubmit, onSubmitError)();
        },
      }}
    >
      <Form {...form}>{children}</Form>
    </FormContext.Provider>
  );
};

export default BlogFormContext;
