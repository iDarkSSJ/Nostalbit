"use client"
import { useGlobalStore } from '@/stores/globalStore'
import React from 'react'

export default function Loader() {
  const {isLoading} = useGlobalStore()

  if (!isLoading) return

  return (
    <div className='absolute top-0 z-40 w-screen h-dvh bg-black/80 flex items-center justify-center'>
      <span className='text-2xl'>LOADING...</span>
    </div>
  )
}
