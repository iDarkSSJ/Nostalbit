import Image from "next/image"

export default function Keybinds() {
  return (
    <>
      <div className="w-full flex items-center justify-center mt-24">
        <div className="relative">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/f/f4/SNES_controller.svg"
            alt="File:SNES controller.svg"
            height="484"
            width="740"
            className="select-none"
          />
          <div className="absolute top-[43%] right-[6%] p-3 border-green-400 border-8 bg-green-600 w-14 h-14 flex items-center justify-center text-center">
            X
          </div>
          <div className="absolute top-[68%] right-[21%] p-3 border-green-400 border-8 bg-green-600 w-14 h-14 flex items-center justify-center text-center">
            Z
          </div>
          <div className="absolute top-[43%] right-[37%] p-3 border-green-400 border-8 bg-green-600 w-14 h-14 flex items-center justify-center text-center">
            A
          </div>
          <div className="absolute top-[18%] right-[21%] p-3 border-green-400 border-8 bg-green-600 w-14 h-14 flex items-center justify-center text-center">
            S
          </div>
          <div className="absolute top-[58%] left-[34%] p-2 border-green-400 border-8 bg-green-600 w-fit h-14 flex items-center justify-center text-center text-sm scale-75">
            Shift
          </div>
          <div className="absolute top-[58%] left-[48%] p-2 border-green-400 border-8 bg-green-600 w-fit h-14 flex items-center justify-center text-center text-sm scale-75">
            Enter
          </div>
          <div className="absolute top-[18%] left-[17%] p-2 border-green-400 border-8 bg-green-600 w-fit h-14 flex items-center justify-center text-center text-sm">
            ARROWS
          </div>
        </div>
      </div>
    </>
  )
}
