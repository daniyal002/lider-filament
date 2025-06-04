'use client'

import { SquareArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function BackButton() {
  const { back } = useRouter();

  return (
    <div>      <SquareArrowLeft  size={50} strokeWidth={1.5} onClick={() => back()}/>
</div>
  )
}
