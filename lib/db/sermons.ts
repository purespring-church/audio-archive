import { Sermon } from '@/types/sermon'
import { mockSermons } from '@/lib/mock/sermons'

const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL

// 전체 설교 목록 조회 (날짜 내림차순)
export async function getSermons(): Promise<Sermon[]> {
  if (!isSupabaseConfigured) {
    return mockSermons
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .order('sermon_date', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

// 단건 설교 조회
export async function getSermonById(id: string): Promise<Sermon | null> {
  if (!isSupabaseConfigured) {
    return mockSermons.find((s) => s.id === id) ?? null
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

// TODO: createSermon(data) — 설교 메타데이터 저장
// TODO: deleteSermon(id)   — 설교 삭제 (본인만)
