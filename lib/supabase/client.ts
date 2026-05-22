import { createBrowserClient } from '@supabase/ssr'

/**
 * [브라우저 전용 Supabase 클라이언트]
 *
 * 사용 위치: 'use client' 컴포넌트 (예: 로그인 페이지, Header)
 * 역할: 로그인/로그아웃 등 인증 처리
 *
 * ⚠️ 서버(API Route, Server Component)에서는 lib/supabase/server.ts 사용
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
