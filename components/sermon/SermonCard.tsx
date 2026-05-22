import Link from 'next/link'
import { Sermon } from '@/types/sermon'

function formatDuration(sec: number | null): string {
  if (!sec) return ''
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

type Props = { sermon: Sermon }

export default function SermonCard({ sermon }: Props) {
  return (
    <Link href={`/sermons/${sermon.id}`}>
      <div className="rounded-lg border border-gray-200 bg-white p-5 transition hover:border-gray-400 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-500">
        <p className="mb-1 text-xs text-gray-400 dark:text-gray-500">{formatDate(sermon.sermon_date)}</p>
        <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          {sermon.title}
        </h2>
        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">{sermon.preacher}</p>
        {sermon.scripture && (
          <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            {sermon.scripture}
          </span>
        )}
        {sermon.duration_sec && (
          <span className="ml-2 text-xs text-gray-400">
            {formatDuration(sermon.duration_sec)}
          </span>
        )}
      </div>
    </Link>
  )
}
