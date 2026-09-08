"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CircleUserRoundIcon } from "lucide-react";
import Compressor from "compressorjs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { AxiosProgressEvent } from "axios";
import { uploadImageToCloudinary } from "@/lib/api";
import ProfileImageEditorDialog from "@/components/profile/ProfileImageEditorDialog";

type Props = {
  value?: string | null;
  username?: string;
  onChange: (fileUrl: string | null) => void;
};

type PendingImage = {
  file: File;
  preview: string;
};

export default function AvatarUpload({ value, onChange, username }: Props) {
  const pendingPreviewRef = useRef<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [editorOpen, setEditorOpen] = useState(false);
  const [pendingImage, setPendingImage] = useState<PendingImage | null>(null);

  const [{ files }, { removeFile, openFileDialog, clearFiles, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      maxSize: 10 * 1024 * 1024,
      onFilesAdded: (addedFiles) => {
        const file = addedFiles[0]?.file;
        if (!(file instanceof File)) return;

        const preview = URL.createObjectURL(file);
        pendingPreviewRef.current = preview;
        setPendingImage({ file, preview });
        setEditorOpen(true);
        clearFiles();
      },
    });

  const [previewUrl, setPreviewUrl] = useState(
    value || (username ? `/api/avatar?username=${username}` : null),
  );
  const [fileName, setFileName] = useState<string | null>(
    value ? "profile" : null,
  );

  const reset = () => {
    setPreviewUrl(username ? `/api/avatar?username=${username}` : null);
    setFileName(null);
    onChange(null);
  };

  useEffect(() => {
    if (value) {
      setPreviewUrl(value);
      setFileName("profile");
    }
  }, [value]);

  const closeEditor = useCallback((open: boolean) => {
    setEditorOpen(open);
    if (!open) {
      if (pendingPreviewRef.current) {
        URL.revokeObjectURL(pendingPreviewRef.current);
        pendingPreviewRef.current = null;
      }
      setPendingImage(null);
    }
  }, []);

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    if (progressEvent.total) {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      setProgress(percentage);
    }
  };

  const uploadToCloudinary = useCallback(
    async (compressedFile: File) => {
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
      );
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

      try {
        const res = await uploadImageToCloudinary(formData, onUploadProgress);
        if (res.status === 200) {
          onChange(res.data.url);
          setPreviewUrl(res.data.url);
          setFileName(compressedFile.name);
          toast.success("Image téléchargée avec succès !");
        } else {
          toast.error("Échec du téléversement de l'image");
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Erreur inconnue";
        toast.error("Erreur lors du téléversement : " + message);
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  const handleEditedImage = useCallback(
    (editedFile: File) => {
      setUploading(true);
      setProgress(0);

      const localPreview = URL.createObjectURL(editedFile);
      setPreviewUrl(localPreview);
      setFileName(editedFile.name);

      new Compressor(editedFile, {
        quality: 0.8,
        success(compressedResult) {
          uploadToCloudinary(compressedResult as File);
        },
        error(err) {
          toast.error("Erreur lors de la compression : " + err.message);
          setUploading(false);
        },
      });
    },
    [uploadToCloudinary],
  );

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
              if (files[0]?.id) {
                removeFile(files[0].id);
              }
              reset();
            }}
            className="text-destructive font-medium hover:underline"
            aria-label={`Remove ${fileName}`}
          >
            Supprimer
          </button>
        </div>
      )}

      {pendingImage && (
        <ProfileImageEditorDialog
          open={editorOpen}
          onOpenChange={closeEditor}
          imageSrc={pendingImage.preview}
          fileName={pendingImage.file.name}
          onApply={handleEditedImage}
        />
      )}
    </div>
  );
}
