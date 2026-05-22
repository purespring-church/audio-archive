import { createClient } from '@/lib/supabase/server'

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
  const supabase = await createClient()

  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')
  const fileName = `${Date.now()}-${file.name}`
  const filePath = `${year}/${month}/${fileName}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, { contentType: file.type })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}

// TODO: deleteAudioFile(filePath) — Storage에서 파일 삭제
