"use server"

import { CloudinaryUploadResult } from "@/types/types"
import { v2 as cloudinary, UploadApiOptions } from "cloudinary"


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
})

export async function deleteRawFromCloud(publicId: string) {
  try {
    const result = await cloudinary.api.delete_resources([publicId], { type: "upload", resource_type: "raw" })
    return result
  } catch (err) {
    console.error("Error deleting raw file:", err)
    throw new Error(JSON.stringify(err))
  }
}

export async function deleteImageFromCloud(publicId: string) {
  try {
    const result = await cloudinary.api.delete_resources([publicId])
    return result
  } catch (err) {
    console.error("Error deleting image:", err)
    throw new Error(JSON.stringify(err))
  }
}

export const uploadStateToCloud = async (stateRaw: File): Promise<CloudinaryUploadResult> => {
  return new Promise(async (resolve, reject) => {
    const uploadOptions: UploadApiOptions = {
      folder: "states",
      resource_type: "raw",
      public_id: crypto.randomUUID(),
    }
    const arrayBuffer = await stateRaw.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer)

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (err, result) => {
        if (err) {
          reject(new Error(JSON.stringify(err)))
        } else {
          resolve(result as CloudinaryUploadResult)
        }
      }
    )

    uploadStream.end(buffer)
  })
}