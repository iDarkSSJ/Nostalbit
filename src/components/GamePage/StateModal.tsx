"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useGameStore } from "@/stores/gameStore"

type Props = {
  children: React.ReactNode
}

export default function SlotModal({ children }: Props) {
  const { stateModal, setStateModal } = useGameStore()

  const handleOpenChange = (open: boolean) => {
    setStateModal({ isOpen: open })
  }

  return (
    <section
      className={`absolute w-full h-full flex items-center pointer-events-none ${
        stateModal.isOpen ? "bg-black/50" : ""
      }`}>
      <Dialog open={stateModal.isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="absolute w-screen max-w-full sm:max-w-full p-0 border-none rounded-none z-[200]">
          <div className="w-full bg-gradient-to-l from-[#232323] to-[#343434] py-8 border-y-4">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold mb-6 text-white">
                Select Slot to
                <span className="text-sky-400"> {stateModal.action}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="max-w-4xl mx-auto px-4">{children}</div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
