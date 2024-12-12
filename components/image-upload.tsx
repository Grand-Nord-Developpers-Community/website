"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { CloudUpload, X } from "lucide-react";
import NImage from "next/image";
import Link from "next/link";
import { RadialProgress } from "@/components/ui/progress";
import { uploadImageToCloudinary } from "@/lib/api";
import { AxiosProgressEvent } from "axios";
import { toast } from "sonner";
import { encode } from "blurhash";
import Compressor from "compressorjs";
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hashImage, setHashImage] = useState("");
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null
  );

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    if (progressEvent.total) {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentage);
    }
  };

  const getImageBlurhash = async (
    image: File,
    width: number,
    height: number
  ) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.onload = () => {
        ctx?.drawImage(img, 0, 0, width, height);

        const imageData = ctx?.getImageData(0, 0, width, height);
        const blurhash = encode(
          imageData?.data!,
          imageData?.width!,
          imageData?.height!,
          4,
          3
        );
        resolve(blurhash);
      };
      img.src = URL.createObjectURL(image);
    });
  };

  function preview(image: File) {
    if (!image) {
      return;
    }
    new Compressor(image, {
      quality: 0.1,
      success(compressedResult) {
        setCompressedFile(compressedResult as File);
      },
    });
    getImageBlurhash(image, 32, 32).then((hash) => {
      setHashImage(hash as string);
      setSelectedImage(image ? URL.createObjectURL(image) : null);
      console.log(hash);
    });
  }
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const image = event.target.files[0];
      //setSelectedImage(image);
      preview(image);
      handleImageUpload(compressedFile!);
    }
  };

  const removeSelectedImage = () => {
    setLoading(false);
    setUploadedImagePath(null);
    setSelectedImage(null);
  };

  const handleImageUpload = async (image: File) => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset as string);
    formData.append("api_key", apiKey as string);

    try {
      const res = await uploadImageToCloudinary(formData, onUploadProgress);
      if (res.status === 200) {
        setLoading(false);
        setUploadedImagePath(res.data.url);
        toast.success("image preview uploader avec succès " + res.data.url);
        if (onUploadComplete) {
          onUploadComplete(res.data.url);
        }
      }
    } catch (error) {
      setLoading(false);
      if (onUploadComplete) {
        onUploadComplete("");
      }
      toast.error("Error uploading image: " + error);
      console.error("Error uploading image:", error);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const image = acceptedFiles[0];
      //setSelectedImage(image);
      if (image.type.includes("image")) preview(image);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="space-y-3 h-full">
      <div {...getRootProps()} className="h-full">
        <label
          htmlFor="dropzone-file"
          className="overflow-hidden relative flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 w-full visually-hidden-focusable h-full"
        >
          {loading && (
            <div className="text-center max-w-md">
              <RadialProgress progress={progress} />
              <p className="text-sm font-semibold">Uploading Picture</p>
              <p className="text-xs text-gray-400">
                Do not refresh or perform any other action while the picture is
                being uploaded
              </p>
            </div>
          )}

          {!loading && !uploadedImagePath && !selectedImage && (
            <div className="text-center">
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <CloudUpload size="1.6em" />
              </div>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">image previsualisation</span>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-400">
                Select a image or drag here to upload directly
              </p>
            </div>
          )}
          <Input
            {...getInputProps()}
            id="dropzone-file"
            accept="image/png, image/jpeg"
            type="file"
            className="hidden"
            disabled={loading || uploadedImagePath !== null}
            onChange={handleImageChange}
          />
          {(uploadedImagePath || selectedImage) && !loading && (
            <div className="text-center space-y-2">
              <NImage
                width={1000}
                height={1000}
                src={uploadedImagePath || selectedImage}
                className="w-full object-cover h-full opacity-70"
                alt="uploaded image"
              />
              <button
                onClick={removeSelectedImage}
                className="absolute top-0 right-2 p-2 z-10 rounded-full bg-gray-200"
              >
                <X />
              </button>
            </div>
          )}
        </label>
      </div>

      {/* {!!uploadedImagePath && (
        <div className="flex items-center justify-between">
          <Link
            href={uploadedImagePath}
            className=" text-gray-500 text-xs hover:underline "
          >
            Click here to see uploaded image :D
          </Link>

          <Button
            onClick={removeSelectedImage}
            type="button"
            variant="secondary"
          >
            {uploadedImagePath ? "Remove" : "Close"}
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default ImageUpload;
