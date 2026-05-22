import { notFound } from 'next/navigation'
import { getSermonById } from '@/lib/db/sermons'
import AudioPlayer from '@/components/sermon/AudioPlayer'

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
      <a href="/sermons" className="mb-6 inline-block text-sm text-gray-400 hover:text-gray-700">
        ← 목록으로
      </a>

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
