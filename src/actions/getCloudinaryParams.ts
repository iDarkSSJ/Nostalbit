"use server"

import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function getCloudinaryParams(resourceType: string) {
  const timestamp = Math.round(new Date().getTime() / 1000)

  const params = {
    timestamp: timestamp.toString(),
    upload_preset: "roms_preset",
    folder: resourceType === "image" ? "covers" : "roms",
    eager: resourceType === "image" ? "c_scale,w_500,q_auto:good" : "",
  }

  if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary API Secret is not set")
  }

  const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET)

  return { signature, timestamp }
}
