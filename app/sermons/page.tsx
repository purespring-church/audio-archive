import { getSermons } from '@/lib/db/sermons'
import SermonCard from '@/components/sermon/SermonCard'

export default async function SermonsPage() {
  const sermons = await getSermons()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">설교 목록</h1>
        {/* TODO: 로그인 상태일 때만 버튼 표시 */}
        <a
          href="/sermons/upload"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
        >
          설교 등록
        </a>
      </div>

      {sermons.length === 0 ? (
        <p className="text-center text-gray-400 py-16">등록된 설교가 없습니다.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {sermons.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
      )}
    </div>
  )
}
