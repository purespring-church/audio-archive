import { createClient } from '@supabase/supabase-js'

/**
 * [서버 전용 관리자 Supabase 클라이언트]
 *
 * 사용 위치: lib/db/sermons.ts (createSermon, deleteSermon)
 * 역할: RLS를 우회해 서버에서 신뢰된 쓰기 작업 수행
 *
 * ⚠️ SUPABASE_SERVICE_ROLE_KEY는 절대 브라우저로 노출하면 안 됩니다.
 *    반드시 서버 코드(API Route, lib/db)에서만 사용하세요.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
