# 4회 커리큘럼

교회 설교 아카이브 프로젝트를 통해 Git 협업과 풀스택 개발을 처음 경험하는 팀원을 위한 학습 계획입니다.

현재 스타터킷은 **읽기(READ) 기능이 완성**된 상태입니다.
팀원들은 이 기반 위에서 인증 → 등록 → 삭제 → 배포 순서로 기능을 직접 구현합니다.

---

## 팀원들이 구현할 항목

| 항목 | 파일 |
|------|------|
| 로그인 기능 | `app/login/page.tsx` |
| 라우트 보호 | `middleware.ts` (신규) |
| Header 로그인 상태 | `components/layout/Header.tsx` |
| 설교 등록 폼 제출 | `app/sermons/upload/page.tsx` |
| createSermon() | `lib/db/sermons.ts` |
| POST /api/sermons | `app/api/sermons/route.ts` |
| deleteSermon() | `lib/db/sermons.ts` |
| deleteAudioFile() | `lib/storage/upload.ts` |
| DELETE /api/sermons/[id] | `app/api/sermons/[id]/route.ts` |
| Vercel + Supabase 배포 | — |

---

## 1회차: 프로젝트 입문 + Git 협업 + Supabase 연결

**목표**: 개발 환경 세팅, 프로젝트 흐름 이해, 첫 PR 경험, 실제 DB 연결

> 이번 회차는 코딩 없이 환경과 구조 이해에 집중합니다.

### 진행 순서

1. **도구 설치**: Node.js, VS Code, Git
2. **로컬 실행**
   ```bash
   git clone https://github.com/purespring-church/audio-archive.git
   npm install
   npm run dev
   ```
   - Mock 데이터로 홈(히어로 배너 + 달력), 목록, 상세 화면 확인

3. **프로젝트 구조 설명**
   ```
   app/          → 사용자가 보는 화면 (페이지)
   app/api/      → 서버 API 엔드포인트
   components/   → 재사용 UI 조각
   lib/          → DB·Storage·Auth 비즈니스 로직
   types/        → TypeScript 타입
   ```

4. **Supabase 연결**
   - Supabase 프로젝트 생성 (강사 데모)
   - SQL 에디터에서 스키마 실행: `supabase/migrations/001_initial_schema.sql`
   - Storage 버킷 `sermons` 수동 생성 (공개)
   - `.env.local` 파일 작성
     ```
     NEXT_PUBLIC_SUPABASE_URL=...
     NEXT_PUBLIC_SUPABASE_ANON_KEY=...
     ```
   - `npm run dev` → 실제 DB 전환 확인

5. **첫 기여 실습**
   ```bash
   git checkout -b feature/이름-first-change
   # 작은 텍스트/스타일 수정
   git add .
   git commit -m "feat: 첫 번째 기여"
   git push origin feature/이름-first-change
   # GitHub에서 PR 생성 → 팀원 리뷰 → Merge
   ```

**학습 개념**: `clone`, `branch`, `commit`, `push`, pull request, merge, 환경변수

**회차 결과물**: 모든 팀원 첫 PR merge + 브라우저에서 실제 DB 조회 확인

---

## 2회차: Supabase Auth + 로그인 기능 구현

**목표**: 인증 시스템 이해, 로그인 기능 완성, 라우트 보호

### 파트 A: 로그인 페이지 (`app/login/page.tsx`)

현재 HTML 폼 마크업만 있습니다. 아래 로직을 추가합니다.

```
1. 'use client' 선언 (Client Component로 전환)
2. useState로 email, password, error, loading 상태 관리
3. supabase.auth.signInWithPassword({ email, password }) 호출
4. 성공 → router.push('/sermons')
5. 실패 → error 메시지 표시
```

재사용: `lib/supabase/client.ts` (브라우저용 Supabase 클라이언트)

### 파트 B: 라우트 보호 (`middleware.ts` 신규, 프로젝트 루트)

```
미인증 상태에서 /sermons/upload 접근 시
→ /login?redirect=/sermons/upload 으로 리다이렉트
```

재사용: `lib/auth/middleware.ts`의 `getUser()`

### 파트 C: Header 로그인 상태 표시 (`components/layout/Header.tsx`)

```
로그인 전  → "로그인" 버튼
로그인 후  → "로그아웃" 버튼
```

재사용: `lib/supabase/client.ts`, `supabase.auth.onAuthStateChange()`

**학습 개념**: Client Component vs Server Component, `useState`, `useEffect`, Supabase Auth

**회차 결과물**: 로그인/로그아웃 동작 확인, `/sermons/upload` 미인증 접근 차단 확인

---

## 3회차: 설교 등록 기능 구현

**목표**: 파일 업로드 + DB 저장 흐름 이해, 설교 등록 기능 완성

### 구현 흐름

```
사용자 폼 제출
     ↓
uploadAudioFile(file)         ← lib/storage/upload.ts (이미 구현됨 ✅)
     ↓ file_url 반환
POST /api/sermons { title, preacher, ... , file_url }
     ↓
createSermon(data)            ← lib/db/sermons.ts (구현 필요)
     ↓
/sermons 리다이렉트
```

### `lib/db/sermons.ts` — createSermon() 추가

```typescript
// TODO: INSERT 후 생성된 row 반환
createSermon(data: Omit<Sermon, 'id' | 'created_at'>): Promise<Sermon>
```

### `app/api/sermons/route.ts` — POST 핸들러 추가

```
1. getUser()로 인증 확인 (미인증 → 401)
2. request body 파싱
3. createSermon() 호출
4. 201 응답 반환
```

재사용: `lib/auth/middleware.ts`의 `getUser()`

### `app/sermons/upload/page.tsx` — 폼 제출 로직 완성

```
1. 'use client' 전환
2. useState로 각 필드 + loading + error 상태 관리
3. 제출 시:
   a. uploadAudioFile(file) → file_url
   b. POST /api/sermons { ...formData, file_url }
   c. 성공 → router.push('/sermons')
4. 로딩 스피너 + 에러 메시지 표시
```

**학습 개념**: API Route (POST), 파일 업로드, 비동기 처리, 로딩/에러 상태

**회차 결과물**: 로그인 → 설교 등록 → 홈 달력 + 목록에서 확인

---

## 4회차: 삭제 기능 + Vercel + Supabase 배포

**목표**: CRUD 완성, 프로덕션 환경 배포

### 파트 A: 삭제 기능 구현

#### 구현 흐름

```
상세 페이지 삭제 버튼 클릭 (본인 등록 설교만 표시)
     ↓
DELETE /api/sermons/[id]
     ↓
본인 소유 확인 (getUser().id === sermon.created_by)
     ↓
deleteAudioFile(file_url)     ← lib/storage/upload.ts (구현 필요)
     ↓
deleteSermon(id)              ← lib/db/sermons.ts (구현 필요)
     ↓
/sermons 리다이렉트
```

#### 구현할 파일

| 파일 | 작업 |
|------|------|
| `lib/db/sermons.ts` | `deleteSermon(id)` 추가 |
| `lib/storage/upload.ts` | `deleteAudioFile(filePath)` 추가 |
| `app/api/sermons/[id]/route.ts` | DELETE 핸들러 구현 |
| `app/sermons/[id]/page.tsx` | 본인 설교에만 삭제 버튼 표시 |

### 파트 B: Vercel 배포

1. GitHub 저장소 → Vercel Import
2. 환경변수 설정
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   ```
3. 첫 자동 배포 확인

### 파트 C: Supabase 프로덕션 설정

1. Supabase 대시보드 → Authentication → URL Configuration
   - **Site URL**: `https://{vercel-domain}.vercel.app`
   - **Redirect URLs**: `https://{vercel-domain}.vercel.app/auth/callback`
2. Storage CORS 정책 확인

**학습 개념**: API Route (DELETE), RLS 보안, Vercel 배포 파이프라인

**회차 결과물**: 실제 URL로 접근 가능한 서비스 완성

---

## 회차별 학습 개념 요약

| 회차 | 핵심 개념 |
|------|---------|
| 1회차 | Git 협업 (branch, PR, merge), 환경변수, Supabase 연결 |
| 2회차 | Client Component, `useState`, Supabase Auth, 라우트 보호 |
| 3회차 | API Route (POST), 파일 업로드, 비동기 상태 관리 |
| 4회차 | API Route (DELETE), RLS 보안, Vercel 배포 |

## 전체 검증 흐름

- **1회차**: `npm run dev` → mock 화면 → 실제 DB 전환 → 팀원 PR merge
- **2회차**: 로그인 → 로그아웃 → 미인증 업로드 접근 차단 확인
- **3회차**: 로그인 → 설교 등록 → 홈 달력 점 생성 + 목록 추가 확인
- **4회차**: 배포 URL에서 전체 CRUD 동작 확인 (등록 → 달력 확인 → 삭제)
