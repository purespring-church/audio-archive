/**
 * [설교 API — 목록]
 * GET  /api/sermons → 설교 목록 반환 (구현됨)
 * POST /api/sermons → 설교 등록 (3회차 구현 예정)
 *
 * 브라우저에서 직접 fetch()로 호출하는 API 엔드포인트
 * 페이지(app/sermons/)는 lib/db를 직접 호출하지만,
 * 클라이언트 컴포넌트에서 데이터를 쓸 때는 반드시 이 API를 통해야 함
 */

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
