/**
 * [홈 페이지] — 서버 컴포넌트
 * 경로: /sermons
 *
 * 데이터 흐름:
 *   getLatestSermon()  → HeroBanner에 전달 (최근 설교 배너)
 *   getSermonDates()   → SermonCalendar에 전달 (달력 점 표시)
 *   Promise.all로 두 요청을 병렬 실행 → 로딩 시간 단축
 */

import { getLatestSermon, getSermonDates } from '@/lib/db/sermons'
import { getUser } from '@/lib/auth/middleware'
import HeroBanner from '@/components/sermon/HeroBanner'
import SermonCalendar from '@/components/sermon/SermonCalendar'

export default async function SermonsPage() {
  const [latestSermon, sermonDates, user] = await Promise.all([
    getLatestSermon(),
    getSermonDates(),
    getUser(),
  ])

  return (
    <div>
      <HeroBanner sermon={latestSermon} />
      <SermonCalendar sermonDates={sermonDates} />
      {user && (
        <div className="mt-6 flex justify-end">
          <a
            href="/sermons/upload"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            설교 등록
          </a>
        </div>
      )}
    </div>
  )
}
