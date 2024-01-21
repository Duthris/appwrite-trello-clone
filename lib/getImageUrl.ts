import { storage } from "@/appwrite";

const getImageUrl = async (image: Image) => {
  return storage.getFilePreview(image.bucketId, image.fileId);
};

export default getImageUrl;
