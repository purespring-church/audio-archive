## 프로젝트 개요

교회 설교 녹음 파일을 업로드하고 관리하는 풀스택 웹 서비스 스타터 킷.
개발 경험이 적은 팀원들이 Git 협업과 풀스택 개발을 처음 경험하기 위한 프로젝트.

- **프레임워크**: Next.js 15 (App Router) + React 19
- **언어**: TypeScript
- **스타일**: Tailwind CSS (shadcn/ui 미사용 — Tailwind 직접 사용으로 구조 투명하게 유지)
- **데이터베이스**: Supabase (PostgreSQL + Storage + Auth)
- **배포**: Vercel + Supabase

---

## 디렉토리 역할 규칙

프론트엔드와 백엔드를 폴더로 구분한다.

```
app/(pages 역할)/     → 프론트엔드: 사용자가 보는 UI 페이지
app/api/              → 백엔드: REST API 엔드포인트 (route.ts)
components/           → 프론트엔드: 재사용 가능한 UI 컴포넌트
lib/db/               → 백엔드: Supabase DB 쿼리 함수
lib/storage/          → 백엔드: Supabase Storage 파일 업로드
lib/auth/             → 백엔드: 인증 확인 함수
lib/supabase/         → Supabase 클라이언트 초기화 (client.ts / server.ts 분리)
lib/mock/             → 개발용 샘플 데이터 (Supabase 미연결 시 사용)
types/                → 공용 TypeScript 타입 정의
supabase/migrations/  → DB 스키마 SQL (Supabase SQL Editor에서 실행)
```

---

## Supabase 연결 구조

환경변수 `NEXT_PUBLIC_SUPABASE_URL` 유무로 mock/real을 자동 분기한다.

```typescript
// lib/db/sermons.ts 패턴
const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL

if (!isSupabaseConfigured) {
  return mockSermons  // lib/mock/sermons.ts
}
// 실제 Supabase 쿼리
```

- `.env.local` 없이 `npm run dev` → mock 데이터로 UI 즉시 확인 가능
- `.env.local` 작성 후 → 실제 Supabase DB 연결

---

## 핵심 개발 규칙

- **패키지 매니저**: `npm` 고정. `yarn`, `pnpm` 사용 금지 (`package-lock.json` 충돌 방지)
- **언어**: TypeScript 필수. `any` 타입 사용 지양
- **Supabase 클라이언트**:
  - 브라우저(클라이언트 컴포넌트): `lib/supabase/client.ts`
  - 서버(API Route, Server Component): `lib/supabase/server.ts`
- **커밋 메시지**: 한국어로 작성, 접두어 사용
  - `feat:` 새 기능, `fix:` 버그 수정, `style:` 스타일, `docs:` 문서, `refactor:` 리팩터링
- **브랜치**: `main` 직접 push 금지. `feature/*` 또는 `fix/*` 브랜치에서 PR로 merge

---

## 자주 쓰는 명령어

```bash
npm run dev    # 개발 서버 실행 (localhost:3000)
npm run build  # 프로덕션 빌드 (배포 전 오류 확인)
npm run lint   # ESLint 코드 검사
```

---

## TODO 주석 규칙

샘플 코드에는 미구현 기능에 `// TODO:` 주석을 달아두었다.
팀원들이 어디서부터 기능을 구현해야 하는지 찾을 수 있도록 하기 위함.

```typescript
// TODO: POST /api/sermons — 설교 메타데이터 저장 (인증 필요)
// TODO: Supabase Auth signInWithPassword 연결
```
