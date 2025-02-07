
export const CONSOLES = [
  { path: "nes", label: "NES" },
  { path: "snes", label: "SNES" },
  { path: "gb", label: "GameBoy" },
  { path: "gbc", label: "GameBoy Color" },
  { path: "gba", label: "GameBoy Advance" },
  { path: "gen", label: "Sega Genesis" },
]


export enum StateActionType {
  LOAD = "LOAD",
  SAVE = "SAVE",
}

export interface UserType {
  id: string
  email: string
  password: string
  created_at: string
}

export const EXTENSION_TO_CONSOLE = {
  nes: "nes",
  snes: "snes",
  gb: "gb",
  gbc: "gbc",
  gba: "gba",
  sfc: "snes",
  smc: "snes",
  bin: "sg",
  smd: "sg",
  md: "sg",
  gen: "sg",
} as const

export type ConsoleType = (typeof EXTENSION_TO_CONSOLE)[keyof typeof EXTENSION_TO_CONSOLE]

export const PATH_TO_CORE = {
  nes: "fceumm",
  snes: "snes9x",
  gb: "mgba",
  gbc: "mgba",
  gba: "mgba",
  gen: "genesis_plus_gx",
} as const

export const CORES = ["fceumm", "snes9x", "mgba", "genesis_plus_gx"] as const

export interface Game {
  user_id: string
  game_id: string
  game_name: string
  game_core: typeof CORES[number]
  game_console: ConsoleType
  game_rom_url: string
  game_rom_public_id: string
  game_cover_url: string
  game_cover_public_id: string
}

export interface RecordType {
  record_id: string
  time: number
  game_id: string
  user_id: string
  created_at: string
}

export interface StateType {
  state_id: string
  game_id: string
  slot_number: number
  state_url: string
  state_public_id: string
  saved_at: number
}

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}

export const EXTENSION_TO_CORE = {
  nes: "fceumm",
  snes: "snes9x",
  gb: "mgba",
  gba: "mgba",
  gbc: "mgba",
  sfc: "snes9x",
  smc: "snes9x",
  bin: "genesis_plus_gx",
  smd: "genesis_plus_gx",
  md: "genesis_plus_gx",
  gen: "genesis_plus_gx",
} as const

export const ACCEPTED_ROM_EXTENSIONS = ["nes", "snes", "gb", "gba", "gbc", "sfc", "smc", "bin", "smd", "md", "gen"] as const

export type RomExtension = typeof ACCEPTED_ROM_EXTENSIONS[number]
export type CoverExtension = typeof ACCEPTED_COVER_EXTENSIONS[number]

export const ACCEPTED_COVER_EXTENSIONS = ["jpg", "png", "jpeg"] as const
