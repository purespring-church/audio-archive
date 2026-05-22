import { createClient } from '@/lib/supabase/server'

const BUCKET = 'sermons'

// 오디오 파일을 Supabase Storage에 업로드
// 반환값: 업로드된 파일의 공개 URL
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
