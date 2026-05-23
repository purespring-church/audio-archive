# Supabase 연동 가이드

이 문서는 프로젝트를 처음 설정하는 팀원을 위한 Supabase 연동 절차와 주의사항을 정리한 것입니다.

---

## 1. 초기 설정 절차

### Step 1 — Supabase 프로젝트 생성
[supabase.com](https://supabase.com) → New project 생성

### Step 2 — API 키 확인
대시보드 → **Settings → API**

| 항목 | 변수명 | 위치 |
|------|--------|------|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` | "Project URL" |
| anon key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | "Project API keys → anon public" |
| service_role key | `SUPABASE_SERVICE_ROLE_KEY` | "Project API keys → service_role" |

> ⚠️ `service_role` 키는 절대 브라우저에 노출하면 안 됩니다. `NEXT_PUBLIC_` 접두사를 붙이지 마세요.

### Step 3 — `.env.local` 작성
프로젝트 루트에 `.env.local` 파일 생성:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

> `.env.local`은 `.gitignore`에 등록되어 있어 Git에 올라가지 않습니다.

### Step 4 — DB 스키마 실행
대시보드 → **SQL Editor → New query**

`supabase/migrations/001_initial_schema.sql` 내용 전체 붙여넣기 → **Run**

Table Editor에서 `sermons` 테이블 생성 확인.

### Step 5 — Storage 버킷 생성
대시보드 → **Storage → New bucket**

- Name: `sermons`
- **Public bucket 체크** ✅

> 버킷을 Public으로 설정해도 **업로드(쓰기)는 별도 RLS 정책이 필요**합니다.
> `001_initial_schema.sql`에 이미 포함되어 있으므로 SQL 실행 후 자동 적용됩니다.

### Step 6 — 테스트 계정 생성
대시보드 → **Authentication → Users → Add user**

이메일/비밀번호로 테스트 계정 생성.

---

## 2. 환경변수 역할

| 변수 | 용도 | 브라우저 노출 |
|------|------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | 프로젝트 접속 주소 | ✅ 가능 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 비로그인 사용자 읽기 접근 | ✅ 가능 |
| `SUPABASE_SERVICE_ROLE_KEY` | 서버 전용 쓰기 작업 (RLS 우회) | ❌ 절대 금지 |

---

## 3. Supabase 클라이언트 3종 구조

이 프로젝트는 용도에 따라 세 가지 클라이언트를 분리해서 사용합니다.

| 파일 | 키 | 용도 | 사용 위치 |
|------|----|------|---------|
| `lib/supabase/client.ts` | anon key | 로그인·로그아웃, Storage 업로드 | `'use client'` 컴포넌트 |
| `lib/supabase/server.ts` | anon key + 쿠키 세션 | DB 읽기, 인증 확인 | Server Component, API Route (읽기) |
| `lib/supabase/admin.ts` | service_role key | DB 쓰기·삭제 (RLS 우회) | API Route (쓰기 전용) |

### 왜 admin 클라이언트가 필요한가?
Next.js API Route에서 사용자 세션의 JWT를 Supabase DB 쿼리 헤더로 자동 전달하는 과정이 불안정합니다.
`service_role` 키를 사용하면 RLS를 서버에서 우회하고, 인증 확인은 API 코드 레벨(`getUser()`)에서 직접 수행합니다.

---

## 4. 권한 구조 (RLS + GRANT)

Supabase에서 테이블 접근은 **GRANT**(테이블 접근 허용)와 **RLS 정책**(행 단위 필터) 두 단계로 제어됩니다.

### SQL로 테이블을 직접 생성할 때 주의
대시보드 GUI로 테이블을 만들면 GRANT가 자동 부여되지만,
**SQL Editor로 `CREATE TABLE`을 실행하면 GRANT를 수동으로 추가해야 합니다.**

`001_initial_schema.sql`에 아래 내용이 포함되어 있습니다:
```sql
GRANT SELECT ON TABLE public.sermons TO anon;
GRANT SELECT, INSERT, DELETE ON TABLE public.sermons TO authenticated;
GRANT ALL ON TABLE public.sermons TO service_role;
```

### RLS 정책 요약

| 대상 | 허용 작업 |
|------|---------|
| 비로그인(`anon`) | SELECT (읽기) |
| 로그인(`authenticated`) | SELECT + INSERT + 본인 DELETE |
| 서버(`service_role`) | 모든 작업 |
| Storage 업로드 | 로그인 사용자 |
| Storage 읽기 | 누구나 |
| Storage 삭제 | 본인이 올린 파일 |

---

## 5. 자주 발생하는 오류

### `permission denied for table sermons`
- **원인**: SQL로 테이블 생성 후 GRANT 미실행
- **해결**: SQL Editor에서 GRANT 구문 실행 (위 섹션 참고)

### `new row violates row-level security policy` — Storage 업로드 시
- **원인**: Storage 버킷에 업로드 RLS 정책 없음 (Public 버킷이어도 쓰기 정책은 별도 필요)
- **해결**: `001_initial_schema.sql`의 Storage 정책 부분 실행

### `new row violates row-level security policy` — sermons 등록 시
- **원인**: `service_role`에 GRANT 누락
- **해결**: `GRANT ALL ON TABLE public.sermons TO service_role;` 실행

### `Invalid key: 2026/05/...한글파일명.m4a`
- **원인**: Supabase Storage 경로에 한글·공백 등 비ASCII 문자 사용 불가
- **해결**: 파일명 대신 `타임스탬프.확장자` 형식 사용 (`lib/storage/upload.ts` 참고)

---

## 6. 초기화 및 재실행

DB와 Storage를 처음부터 다시 설정하고 싶을 때:

### Step 1 — 기존 데이터 삭제 (SQL Editor)
`supabase/migrations/000_reset.sql` 전체 내용을 SQL Editor에 붙여넣고 Run.

### Step 2 — 스키마 재실행
`supabase/migrations/001_initial_schema.sql` 전체 내용을 SQL Editor에 붙여넣고 Run.

### Step 3 — Storage 파일 삭제 (필요시)
대시보드 → Storage → sermons 버킷 → 파일 전체 선택 후 삭제

> Storage 버킷 자체는 삭제하지 않아도 됩니다.
