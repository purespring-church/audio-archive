import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/sermons" className="text-lg font-bold text-gray-900 dark:text-gray-100">
          SAM 설교 아카이브
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/sermons/list"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            설교 목록
          </Link>
          {/* TODO: 로그인 상태에 따라 버튼 변경 (Supabase Auth 연결 후) */}
          <Link
            href="/login"
            className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-700"
          >
            로그인
          </Link>
        </nav>
      </div>
    </header>
  )
}
