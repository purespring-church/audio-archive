import { NextResponse } from 'next/server'
import { getSermons } from '@/lib/db/sermons'

// GET /api/sermons — 설교 목록 반환
export async function GET() {
  try {
    const sermons = await getSermons()
    return NextResponse.json(sermons)
  } catch (error) {
    return NextResponse.json(
      { error: '설교 목록을 불러오지 못했습니다.' },
      { status: 500 }
    )
  }
}

// TODO: POST /api/sermons — 설교 메타데이터 저장 (인증 필요)
