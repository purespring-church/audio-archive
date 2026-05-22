/**
 * [최근 설교 히어로 배너] — 서버 컴포넌트
 *
 * 데이터 흐름:
 *   app/sermons/page.tsx
 *     → getLatestSermon() (lib/db/sermons.ts)
 *     → sermon props로 전달
 *
 * sermon이 null인 경우: 등록된 설교가 없거나 Supabase 미연결 상태
 */

import Link from 'next/link'
import { Sermon } from '@/types/sermon'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

type Props = { sermon: Sermon | null }

export default function HeroBanner({ sermon }: Props) {
  if (!sermon) {
    return (
      <div className="mb-8 rounded-xl bg-gray-100 p-8 text-center dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">등록된 설교가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="mb-8 rounded-xl bg-gray-900 p-8 text-white dark:bg-gray-800">
      <p className="mb-1 text-xs font-medium tracking-wide text-gray-400 uppercase">
        가장 최근 설교
      </p>
      <p className="mb-2 text-sm text-gray-300">
        {formatDate(sermon.sermon_date)} · {sermon.preacher}
      </p>
      <h2 className="mb-1 text-2xl font-bold leading-snug">{sermon.title}</h2>
      {sermon.scripture && (
        <p className="mb-5 text-sm text-gray-400">{sermon.scripture}</p>
      )}
      {!sermon.scripture && <div className="mb-5" />}
      <Link
        href={`/sermons/${sermon.id}`}
        className="inline-block rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 transition"
      >
        ▶ 바로 듣기
      </Link>
    </div>
  )
}
