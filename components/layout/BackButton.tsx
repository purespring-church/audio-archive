/**
 * [뒤로가기 버튼] — 클라이언트 컴포넌트 ('use client')
 *
 * 사용 위치:
 *   - app/sermons/[id]/page.tsx   (홈 또는 목록에서 왔을 때 모두 대응)
 *   - app/sermons/list/page.tsx
 *
 * 'use client'인 이유: useRouter (브라우저 히스토리 접근)가 필요하기 때문
 */

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
