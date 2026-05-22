import { getLatestSermon, getSermonDates } from '@/lib/db/sermons'
import HeroBanner from '@/components/sermon/HeroBanner'
import SermonCalendar from '@/components/sermon/SermonCalendar'

export default async function SermonsPage() {
  const [latestSermon, sermonDates] = await Promise.all([
    getLatestSermon(),
    getSermonDates(),
  ])

  return (
    <div>
      <HeroBanner sermon={latestSermon} />
      <SermonCalendar sermonDates={sermonDates} />
      {/* TODO: 로그인 상태일 때만 버튼 표시 */}
      <div className="mt-6 flex justify-end">
        <a
          href="/sermons/upload"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          설교 등록
        </a>
      </div>
    </div>
  )
}
