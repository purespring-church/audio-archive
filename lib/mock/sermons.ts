import { Sermon } from '@/types/sermon'

// Supabase 연결 전 UI 확인용 샘플 데이터
export const mockSermons: Sermon[] = [
  {
    id: '1',
    title: '요셉의 형제들이 환영받은 진짜 이유',
    preacher: '이대환 목사',
    scripture: '창세기 45:16-45:28',
    sermon_date: '2026-05-22',
    file_url: '',
    file_name: 'sermon-2026-05-22.mp3',
    duration_sec: 2520,
    description: null,
    created_at: '2026-05-22T11:00:00Z',
    created_by: null,
  },
]
