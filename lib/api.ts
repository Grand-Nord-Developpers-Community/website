import axios, { AxiosProgressEvent } from "axios";

export const uploadImageToCloudinary = async (
  formData: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    formData,
    {
      onUploadProgress,
    }
  );

  return response;
};
