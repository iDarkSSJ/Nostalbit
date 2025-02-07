import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import JSZip from "jszip"
import { getCloudinaryParams } from "@/actions/getCloudinaryParams"
import { ACCEPTED_COVER_EXTENSIONS, ACCEPTED_ROM_EXTENSIONS, CoverExtension, EXTENSION_TO_CONSOLE, EXTENSION_TO_CORE, Game, RomExtension } from "@/types/types"
import { deleteImageFromCloud } from "@/actions/cloudinaryUtils"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const uploadToCloudinary = async (file: Blob, resourceType: "image" | "raw", folder?: "covers" | "roms" | "states") => {
  try {
    const { signature, timestamp } = await getCloudinaryParams(resourceType)

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    if (!cloudName) {
      throw new Error("Cloud Name is not defined")
    }

    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
    if (!apiKey) {
      throw new Error("API Key is not defined")
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "roms_preset")
    formData.append("timestamp", timestamp.toString())
    formData.append("signature", signature)
    formData.append("api_key", apiKey)
    formData.append("folder", resourceType === "image" ? "covers" : folder as string)

    if (resourceType === "image") {
      formData.append("eager", "c_scale,w_500,q_auto:good")
    }

    const response = await fetch(url, { method: "POST", body: formData })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Cloudinary upload failed: ${errorData.error.message}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to upload file to Cloudinary:", error)
    throw error
  }
}


interface GameInputProps {
  title: string
  cover: File
  rom: File
  user_id: string
}

interface EditGameInputProps {
  title: string
  cover?: File
  cover_public_id: string
  user_id: string
}

export const uploadEditGame = async (body: EditGameInputProps) => {
  const { cover, cover_public_id, title, user_id } = body
  
  let gameInfo: { user_id: string; game_name: string; game_cover_url?: string; game_cover_public_id?: string; } = {
    user_id,
    game_name: title,
  }

  if (cover && cover_public_id) {
  let coverUploadResult = null
  await deleteImageFromCloud(cover_public_id)
  const coverFileExtension = cover.name.split(".").pop() as CoverExtension

  if (cover && !ACCEPTED_COVER_EXTENSIONS.includes(coverFileExtension)) {
    return { error:"Cover extension must be jpg, png, or jpeg." }
  }


    const renamedFile = new File([cover], `${crypto.randomUUID()}.jpg`, {
      type: cover.type,
      lastModified: cover.lastModified,
    })

    coverUploadResult = await uploadToCloudinary(renamedFile, "image")
    if (coverUploadResult.error) {
      return { error: `Cover upload failed: ${coverUploadResult.error}` }
    }

    gameInfo = {
      ...gameInfo,
      game_cover_url: coverUploadResult.secure_url,
      game_cover_public_id: coverUploadResult.public_id,
    }
  }

  return { success: true, gameInfo }

}

export const uploadNewGame = async (body: GameInputProps) => {
  const { title, cover, rom, user_id } = body

  
  const romFileExtension = rom.name.split(".").pop() as RomExtension
  const coverFileExtension = cover.name.split(".").pop() as CoverExtension

  if (cover && !ACCEPTED_COVER_EXTENSIONS.includes(coverFileExtension)) {
    return { error:"Cover extension must be jpg, png, or jpeg." }
  }

  if (!ACCEPTED_ROM_EXTENSIONS.includes(romFileExtension)) {
    return { error: "ROM extension must be nes, snes, gb, gba, gbc, sfc, smc, bin, smd, md, or gen." }
  }

  const rom_core = EXTENSION_TO_CORE[romFileExtension]
  const rom_console = EXTENSION_TO_CONSOLE[romFileExtension]

  const zip = new JSZip()
  zip.file(crypto.randomUUID(), rom, {
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  })

  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  })

  const zipFile = new File([zipBlob], `${crypto.randomUUID()}`, { type: zipBlob.type })

  const romUploadResult = await uploadToCloudinary(zipFile, "raw", "roms")
  if (romUploadResult.error) {
    return { error: `ROM upload failed: ${romUploadResult.error}` }
  }

  let coverUploadResult = null

  if (cover) {
    const renamedFile = new File([cover], `${crypto.randomUUID()}.jpg`, {
      type: cover.type,
      lastModified: cover.lastModified,
    })

    coverUploadResult = await uploadToCloudinary(renamedFile, "image")
    if (coverUploadResult.error) {
      return { error: `Cover upload failed: ${coverUploadResult.error}` }
    }
  }

  const gameInfo: Omit<Game, 'game_id'> = {
    user_id,
    game_name: title,
    game_core: rom_core,
    game_console: rom_console,
    game_rom_url: romUploadResult.secure_url,
    game_rom_public_id: romUploadResult.public_id,
    game_cover_url: coverUploadResult?.secure_url,
    game_cover_public_id: coverUploadResult?.public_id,
  }

  return { success: true, gameInfo }
}

export async function getThumbFromCache(game_id: string, slot_number: string | number) {
  const cache = await caches.open('thumb-cache')
  const url = `/thumb/${game_id}/${slot_number}`
  const response = await cache.match(url)
  if (response) {
    const blob = await response.blob()
    return blob
  }
  return null
}

export async function saveThumbToCache(game_id: string, slot_number: string | number, thumbnailBlob: Blob | undefined) {
  const cache = await caches.open('thumb-cache')

  const url = `/thumb/${game_id}/${slot_number}`
  const request = new Request(url)
  const response = new Response(thumbnailBlob)
  await cache.put(request, response)
}

export async function unZipFile(fileUrl: string) {
  const response = await fetch(fileUrl)
  const blob = await response.blob()
  const zip = new JSZip()
  const zipContent = await zip.loadAsync(blob)

  const romFileName = Object.keys(zipContent.files)[0]
  const romBlob = await zipContent.files[romFileName].async('blob')


  return romBlob
}