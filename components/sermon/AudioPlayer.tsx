/**
 * [오디오 플레이어] — 클라이언트 컴포넌트 ('use client')
 *
 * 데이터 흐름:
 *   app/sermons/[id]/page.tsx
 *     → getSermonById() (lib/db/sermons.ts)
 *     → sermon.file_url props로 전달
 *
 * file_url이 빈 문자열(''): mock 데이터 상태 → 재생 불가 안내 표시
 * file_url이 있는 경우: Supabase Storage URL → HTML5 <audio>로 재생
 */

'use client'

type Props = {
  fileUrl: string
  title: string
}

export default function AudioPlayer({ fileUrl, title }: Props) {
  if (!fileUrl) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">
        오디오 파일이 연결되지 않았습니다.
        <br />
        <span className="text-xs">Supabase Storage 연결 후 재생 가능합니다.</span>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
      <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">{title}</p>
      {/* HTML5 기본 오디오 플레이어 — 추후 커스텀 UI로 교체 가능 */}
      <audio controls className="w-full" src={fileUrl}>
        브라우저가 오디오를 지원하지 않습니다.
      </audio>
    </div>
  )
}
