'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // 현재 로그인 상태 초기화
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))

    // 로그인/로그아웃 이벤트 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/sermons')
  }

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/sermons" className="text-lg font-bold text-gray-900 dark:text-gray-100">
          맑은샘교회 새벽예배
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/sermons/list"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            설교 목록
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-700"
            >
              로그아웃
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-700"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
