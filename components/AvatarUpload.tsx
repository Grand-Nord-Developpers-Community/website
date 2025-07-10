"use client";

import { useEffect, useState } from "react";
import { CircleUserRoundIcon } from "lucide-react";
import Compressor from "compressorjs";
import { toast } from "sonner"; // or your preferred toast
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { AxiosProgressEvent } from "axios";
import { uploadImageToCloudinary } from "@/lib/api";

type Props = {
  value?: string;
  onChange: (fileUrl: string | null) => void;
};

export default function AvatarUpload({ value, onChange }: Props) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [previewUrl, setPreviewUrl] = useState(
    files[0]?.preview || value || null
  );
  const [fileName, setFileName] = useState(
    files[0]?.file.name || (value ? "profile" : null)
  );

  const reset = () => {
    setPreviewUrl(null);
    setFileName(null);
    onChange(null);
  };

  useEffect(() => {
    if (files[0]) {
      setPreviewUrl(files[0]?.preview || null);
      setFileName(files[0]?.file.name);
    }
  }, [files]);

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    if (progressEvent.total) {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentage);
    }
  };

  useEffect(() => {
    const file = files[0]?.file;
    if (!file) return;

    setUploading(true);

    // Compress and upload
    //@ts-ignore
    new Compressor(file, {
      quality: 0.2,
      success(compressedResult) {
        uploadToCloudinary(compressedResult as File);
      },
      error(err) {
        toast.error("Erreur lors de la compression : " + err.message);
        setUploading(false);
      },
    });
  }, [files]);

  async function uploadToCloudinary(compressedFile: File) {
    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

    try {
      const res = await uploadImageToCloudinary(formData, onUploadProgress);
      if (res.status === 200) {
        onChange(res.data.url);
        toast.success("Image téléchargée avec succès !");
      } else {
        toast.error("Échec du téléversement de l'image");
      }
    } catch (err: any) {
      toast.error("Erreur lors du téléversement : " + err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex items-center gap-2 align-top">
        <div
          className="border-input relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border"
          aria-label={
            previewUrl ? "Preview of uploaded image" : "Default user avatar"
          }
        >
          {previewUrl ? (
            <img
              className="size-full rounded-full object-cover"
              src={previewUrl}
              alt="Preview of uploaded image"
              width={40}
              height={40}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="opacity-60" size={16} />
            </div>
          )}
        </div>

        <div className="relative inline-block">
          <Button type="button" onClick={openFileDialog} disabled={uploading}>
            {uploading
              ? `Téléversement... ${progress}%`
              : fileName
                ? "Changer d'image"
                : "Téléverser une image"}
          </Button>
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
            tabIndex={-1}
          />
        </div>
      </div>

      {fileName && !uploading && (
        <div className="inline-flex gap-2 text-xs">
          <p className="text-muted-foreground truncate" aria-live="polite">
            {fileName}
          </p>
          <button
            type="button"
            onClick={() => {
              removeFile(files[0]?.id);
              reset();
            }}
            className="text-destructive font-medium hover:underline"
            aria-label={`Remove ${fileName}`}
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
}
