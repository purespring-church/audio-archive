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
