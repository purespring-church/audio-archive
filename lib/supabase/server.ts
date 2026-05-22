import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * [서버 전용 Supabase 클라이언트]
 *
 * 사용 위치: lib/db/sermons.ts, lib/auth/middleware.ts, app/api/
 * 역할: 서버에서 DB 조회, 파일 업로드, 인증 확인
 *
 * 브라우저 클라이언트(client.ts)와 달리 쿠키를 직접 읽어
 * 로그인 상태를 서버에서도 확인할 수 있음
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
