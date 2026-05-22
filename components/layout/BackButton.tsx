'use client'

import { useRouter } from 'next/navigation'

type Props = { label?: string }

export default function BackButton({ label = '← 뒤로' }: Props) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="mb-6 inline-block text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
    >
      {label}
    </button>
  )
}
