'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { uploadAudioFile } from '@/lib/storage/upload'

export default function UploadPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const file = formData.get('audio') as File
    if (!file || file.size === 0) {
      setError('녹음 파일을 선택해주세요.')
      setLoading(false)
      return
    }

    try {
      const file_url = await uploadAudioFile(file)

      const res = await fetch('/api/sermons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.get('title'),
          preacher: formData.get('preacher'),
          sermon_date: formData.get('sermon_date'),
          scripture: formData.get('scripture') || null,
          description: formData.get('description') || null,
          file_url,
          file_name: file.name,
        }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error)
      }

      router.push('/sermons')
    } catch (err) {
      setError(err instanceof Error ? err.message : '등록에 실패했습니다.')
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">설교 등록</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
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
            defaultValue="이대환 목사"
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

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-gray-900 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? '등록 중...' : '등록하기'}
        </button>
      </form>
    </div>
  )
}
