import Link from 'next/link'
import { getSermons } from '@/lib/db/sermons'
import BackButton from '@/components/layout/BackButton'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function SermonListPage() {
  const sermons = await getSermons()

  return (
    <div>
      <BackButton />
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">설교 목록</h1>

      {sermons.length === 0 ? (
        <p className="py-16 text-center text-gray-400">등록된 설교가 없습니다.</p>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {sermons.map((sermon) => (
            <Link
              key={sermon.id}
              href={`/sermons/${sermon.id}`}
              className="flex items-center gap-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-900 px-2 -mx-2 rounded transition"
            >
              <span className="w-32 shrink-0 text-sm text-gray-400 dark:text-gray-500">
                {formatDate(sermon.sermon_date)}
              </span>
              <span className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {sermon.title}
              </span>
              {sermon.scripture && (
                <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                  {sermon.scripture}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
