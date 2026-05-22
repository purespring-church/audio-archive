'use client'

import Link from 'next/link'
import { useState } from 'react'

type SermonDate = { id: string; sermon_date: string }
type Props = { sermonDates: SermonDate[] }

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

export default function SermonCalendar({ sermonDates }: Props) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1) // 1~12

  // 'YYYY-MM-DD' → sermon id 매핑
  const sermonMap: Record<string, string> = {}
  for (const s of sermonDates) {
    sermonMap[s.sermon_date] = s.id
  }

  const firstDayOfWeek = new Date(year, month - 1, 1).getDay() // 0=일
  const lastDate = new Date(year, month, 0).getDate()

  function prevMonth() {
    if (month === 1) { setYear((y) => y - 1); setMonth(12) }
    else setMonth((m) => m - 1)
  }

  function nextMonth() {
    if (month === 12) { setYear((y) => y + 1); setMonth(1) }
    else setMonth((m) => m + 1)
  }

  function toDateStr(day: number): string {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  // 달력 셀 배열: 앞 빈칸 + 날짜 + 뒤 빈칸(7 배수 맞춤)
  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-700">
      {/* 월 네비게이션 */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="이전 달"
        >
          ◀
        </button>
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {year}년 {month}월
        </span>
        <button
          onClick={nextMonth}
          className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="다음 달"
        >
          ▶
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="mb-1 grid grid-cols-7 text-center text-xs">
        {DAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={
              i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-400'
            }
          >
            {label}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 text-center text-sm">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className="py-2" />

          const colIndex = i % 7
          const baseColor =
            colIndex === 0 ? 'text-red-500' :
            colIndex === 6 ? 'text-blue-500' :
            'text-gray-700 dark:text-gray-300'

          const dateStr = toDateStr(day)
          const sermonId = sermonMap[dateStr]

          if (sermonId) {
            return (
              <Link
                key={dateStr}
                href={`/sermons/${sermonId}`}
                className={`flex flex-col items-center py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${baseColor} font-semibold`}
              >
                <span>{day}</span>
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-gray-800 dark:bg-gray-200" />
              </Link>
            )
          }

          return (
            <div key={dateStr} className={`py-2 ${baseColor} opacity-50`}>
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}
