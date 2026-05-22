/**
 * [설교 상세 페이지] — 서버 컴포넌트
 * 경로: /sermons/[id]
 *
 * 데이터 흐름:
 *   URL의 id → getSermonById(id) (lib/db/sermons.ts)
 *   → sermon.file_url → AudioPlayer에 전달
 *
 * params가 Promise인 이유: Next.js 15부터 동적 라우트 params가 비동기로 변경됨
 * notFound(): 설교가 없으면 자동으로 404 페이지로 이동
 */

import { notFound } from 'next/navigation'
import { getSermonById } from '@/lib/db/sermons'
import AudioPlayer from '@/components/sermon/AudioPlayer'
import BackButton from '@/components/layout/BackButton'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

type Props = { params: Promise<{ id: string }> }

export default async function SermonDetailPage({ params }: Props) {
  const { id } = await params
  const sermon = await getSermonById(id)

  if (!sermon) notFound()

  return (
    <div className="mx-auto max-w-2xl">
      <BackButton />

      <h1 className="mb-2 text-2xl font-bold text-gray-900">{sermon.title}</h1>

      <div className="mb-6 flex flex-wrap gap-3 text-sm text-gray-500">
        <span>{sermon.preacher}</span>
        <span>·</span>
        <span>{formatDate(sermon.sermon_date)}</span>
        {sermon.scripture && (
          <>
            <span>·</span>
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {sermon.scripture}
            </span>
          </>
        )}
      </div>

      <AudioPlayer fileUrl={sermon.file_url} title={sermon.title} />

      {sermon.description && (
        <p className="mt-6 leading-relaxed text-gray-600">{sermon.description}</p>
      )}
    </div>
  )
}
