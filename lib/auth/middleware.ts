import { createClient } from '@/lib/supabase/server'

/**
 * [인증 확인 함수]
 *
 * 호출 위치: app/api/ 의 POST, DELETE 핸들러
 * 역할: 요청한 사람이 로그인한 사용자인지 확인
 *
 * 반환값: User 객체 | null
 *   null → 로그인하지 않은 상태 → API에서 401 응답 반환
 */
export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

// TODO: 로그인 필요 페이지에서 미들웨어로 리다이렉트 처리 추가
