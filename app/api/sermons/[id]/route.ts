/**
 * [설교 API — 단건]
 * GET    /api/sermons/[id] → 설교 단건 반환 (구현됨)
 * DELETE /api/sermons/[id] → 설교 삭제 (4회차 구현 예정)
 *
 * _req: 요청 본문을 사용하지 않는 경우 _ 접두어로 표시 (TypeScript 관례)
 */

import { NextResponse } from 'next/server'
import { getSermonById } from '@/lib/db/sermons'

// GET /api/sermons/[id] — 설교 단건 반환
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const sermon = await getSermonById(id)

    if (!sermon) {
      return NextResponse.json(
        { error: '설교를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(sermon)
  } catch (error) {
    return NextResponse.json(
      { error: '설교를 불러오지 못했습니다.' },
      { status: 500 }
    )
  }
}

// TODO: DELETE /api/sermons/[id] — 설교 삭제 (본인만, 인증 필요)
