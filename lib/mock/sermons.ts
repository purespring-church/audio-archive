import { Sermon } from '@/types/sermon'

// Supabase 연결 전 UI 확인용 샘플 데이터
export const mockSermons: Sermon[] = [
  {
    id: '1',
    title: '하나님의 사랑 안에서',
    preacher: '김철수 목사',
    scripture: '요한복음 3:16',
    sermon_date: '2024-05-19',
    file_url: '',
    file_name: 'sermon-2024-05-19.mp3',
    duration_sec: 2520,
    description: '하나님의 사랑이 얼마나 크고 넓은지 함께 나누는 시간입니다.',
    created_at: '2024-05-19T11:00:00Z',
    created_by: null,
  },
  {
    id: '2',
    title: '믿음으로 나아가라',
    preacher: '이영희 전도사',
    scripture: '히브리서 11:1',
    sermon_date: '2024-05-12',
    file_url: '',
    file_name: 'sermon-2024-05-12.mp3',
    duration_sec: 1980,
    description: '믿음의 본질과 우리 삶에서의 적용을 나눕니다.',
    created_at: '2024-05-12T11:00:00Z',
    created_by: null,
  },
  {
    id: '3',
    title: '기도의 능력',
    preacher: '김철수 목사',
    scripture: '빌립보서 4:6-7',
    sermon_date: '2024-05-05',
    file_url: '',
    file_name: 'sermon-2024-05-05.mp3',
    duration_sec: 2160,
    description: '기도가 우리 삶을 어떻게 변화시키는지 살펴봅니다.',
    created_at: '2024-05-05T11:00:00Z',
    created_by: null,
  },
]
