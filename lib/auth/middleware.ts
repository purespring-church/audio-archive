import { createClient } from '@/lib/supabase/server'

// 현재 로그인한 사용자 확인
// 로그인이 필요한 API Route에서 사용
export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

// TODO: 로그인 필요 페이지에서 미들웨어로 리다이렉트 처리 추가
