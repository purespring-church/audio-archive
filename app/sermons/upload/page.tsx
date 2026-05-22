// TODO: Supabase Auth 연결 후 로그인 상태 확인 및 리다이렉트 추가

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">설교 등록</h1>

      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
            placeholder="설교 제목을 입력하세요"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            설교자 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="preacher"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
            placeholder="설교자 이름"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            설교 날짜 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="sermon_date"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            성경 구절
          </label>
          <input
            type="text"
            name="scripture"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
            placeholder="예: 요한복음 3:16"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            설명
          </label>
          <textarea
            name="description"
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
            placeholder="설교 요약이나 설명을 입력하세요"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            녹음 파일 <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="audio"
            accept="audio/*"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-gray-400">MP3, WAV, M4A 파일 지원</p>
        </div>

        {/* TODO: 파일 업로드 → Supabase Storage, 메타데이터 → DB 저장 구현 */}
        <button
          type="submit"
          className="w-full rounded-md bg-gray-900 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
        >
          등록하기
        </button>
      </form>
    </div>
  )
}
