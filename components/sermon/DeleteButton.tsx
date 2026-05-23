'use client'

import { useRouter } from 'next/navigation'

type Props = { sermonId: string }

export default function DeleteButton({ sermonId }: Props) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('이 설교를 삭제하시겠습니까?')) return

    const res = await fetch(`/api/sermons/${sermonId}`, { method: 'DELETE' })
    if (!res.ok) {
      const { error } = await res.json()
      alert(error ?? '삭제에 실패했습니다.')
      return
    }

    router.push('/sermons')
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
    >
      삭제
    </button>
  )
}
