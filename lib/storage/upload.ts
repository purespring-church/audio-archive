import { createClient } from '@/lib/supabase/client'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * [Supabase Storage 파일 업로드]
 *
 * 호출 위치: app/sermons/upload/page.tsx (3회차 구현 예정)
 * 반환값: 업로드된 파일의 공개 URL → lib/db/sermons.ts createSermon()에 전달
 *
 * 저장 경로: {연도}/{월}/{타임스탬프}-{파일명}
 * 예) 2026/05/1716345678901-sermon.m4a
 * 타임스탬프를 앞에 붙여 파일명 중복 방지
 */

const BUCKET = 'sermons'

export async function uploadAudioFile(file: File): Promise<string> {
  const supabase = createClient()

  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')
  const ext = file.name.split('.').pop() ?? 'audio'
  const filePath = `${year}/${month}/${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, { contentType: file.type })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}

// Storage에서 파일 삭제 (API Route에서 소유권 확인 후 호출)
// fileUrl: 전체 공개 URL → 버킷 이후 경로만 추출해서 삭제
export async function deleteAudioFile(fileUrl: string): Promise<void> {
  const supabase = createAdminClient()
  const filePath = fileUrl.split(`/storage/v1/object/public/${BUCKET}/`)[1]
  if (!filePath) throw new Error('파일 경로를 확인할 수 없습니다.')
  const { error } = await supabase.storage.from(BUCKET).remove([filePath])
  if (error) throw new Error(error.message)
}
