# SAM 설교 아카이브

교회 설교 녹음 파일을 업로드하고 관리하는 풀스택 웹 서비스입니다.

> 처음 개발을 시작하는 분도 이 문서만 따라하면 바로 실행할 수 있어요.  
> **Supabase(데이터베이스) 연결 없이도 샘플 데이터로 바로 화면을 확인할 수 있습니다.**

---

## 기술 스택

| 분류 | 기술 | 설명 |
|------|------|------|
| 프레임워크 | Next.js 15 | 프론트엔드 + 백엔드를 하나의 프로젝트로 |
| 언어 | TypeScript | 타입 오류를 미리 잡아주는 JavaScript |
| 스타일 | Tailwind CSS | 클래스 이름으로 바로 스타일 적용 |
| 데이터베이스 | Supabase (PostgreSQL) | 클라우드 DB + 파일 저장소 + 인증 |
| 배포 | Vercel | GitHub 연동 후 자동 배포 |

---

## 디렉토리 구조

```
sam-starters/
│
├── app/                       # Next.js 앱 라우터
│   ├── sermons/               # [프론트엔드] 설교 관련 페이지
│   │   ├── page.tsx           #   - 설교 목록
│   │   ├── [id]/page.tsx      #   - 설교 상세 + 오디오 재생
│   │   └── upload/page.tsx    #   - 설교 등록 폼
│   ├── login/page.tsx         # [프론트엔드] 로그인 페이지
│   ├── api/sermons/           # [백엔드] REST API
│   │   ├── route.ts           #   - GET /api/sermons (목록)
│   │   └── [id]/route.ts      #   - GET /api/sermons/:id (단건)
│   └── layout.tsx             # 공통 레이아웃 (헤더 포함)
│
├── components/                # 재사용 UI 컴포넌트
│   ├── layout/Header.tsx      # 상단 네비게이션 바
│   ├── sermon/SermonCard.tsx  # 설교 카드 (목록용)
│   └── sermon/AudioPlayer.tsx # 오디오 플레이어
│
├── lib/                       # 비즈니스 로직
│   ├── db/sermons.ts          # DB 쿼리 함수
│   ├── storage/upload.ts      # 파일 업로드 로직
│   ├── auth/middleware.ts     # 인증 확인 함수
│   ├── supabase/              # Supabase 클라이언트 설정
│   └── mock/sermons.ts        # 샘플 데이터 (DB 없이 실행용)
│
├── types/sermon.ts            # TypeScript 타입 정의
├── supabase/migrations/       # DB 스키마 SQL 파일
└── .env.example               # 환경변수 설정 예시
```

---

## 1단계: 개발 도구 설치

아래 도구들이 설치되어 있어야 합니다. 이미 설치되어 있다면 건너뛰세요.

### Git 설치

버전 관리 도구로, 팀원과 코드를 함께 작업할 때 꼭 필요합니다.

- 다운로드: https://git-scm.com/downloads
- 설치 후 터미널(맥) 또는 명령 프롬프트(윈도우)에서 확인:
  ```
  git --version
  ```

### VS Code 설치

코드 편집기입니다. 다른 에디터를 사용해도 되지만 VS Code를 권장합니다.

- 다운로드: https://code.visualstudio.com

### Node.js 설치

웹 서버를 실행하는 데 필요합니다. **버전 20**을 설치해야 합니다.

---

#### 맥(Mac)에서 Node.js 설치

터미널을 열고 아래 명령어를 순서대로 실행하세요.

**1. nvm 설치** (Node 버전을 쉽게 관리하는 도구)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

**2. 터미널을 완전히 종료했다가 다시 열기**

새 터미널 창을 열어야 nvm 명령어를 사용할 수 있습니다.

**3. Node.js 20 설치**

```bash
nvm install 20
nvm use 20
```

**4. 설치 확인**

```bash
node -v   # v20.x.x 가 출력되면 성공
npm -v    # 10.x.x 가 출력되면 성공
```

---

#### 윈도우(Windows)에서 Node.js 설치

**1. PowerShell을 관리자 권한으로 열기**

시작 버튼 → `PowerShell` 검색 → 우클릭 → **관리자 권한으로 실행**

**2. Volta 설치** (Node 버전 관리 도구)

```powershell
winget install Volta.Volta
```

> `winget` 명령어가 없다면 Microsoft Store에서 **앱 설치 관리자**를 업데이트하세요.

**3. PowerShell 완전히 닫고 다시 열기** (관리자 권한 불필요)

**4. Node.js 20 설치**

```powershell
volta install node@20
```

**5. 설치 확인**

```powershell
node -v   # v20.x.x 가 출력되면 성공
npm -v    # 10.x.x 가 출력되면 성공
```

> **오류: 이 시스템에서 스크립트를 실행할 수 없습니다**  
> PowerShell에서 아래 명령어 실행 후 다시 시도하세요:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

---

## 2단계: 프로젝트 내려받기 및 실행

### 저장소 클론 (내려받기)

VS Code 터미널 또는 시스템 터미널을 열고 프로젝트를 저장할 폴더로 이동한 후 실행하세요.

```bash
git clone https://github.com/<조직명>/<저장소명>.git
cd sam-starters
```

### 패키지 설치

프로젝트에 필요한 라이브러리를 자동으로 설치합니다.

```bash
npm install
```

> 설치에 1~2분 정도 걸릴 수 있습니다.

### 개발 서버 실행

```bash
npm run dev
```

아래처럼 출력되면 성공입니다:

```
▲ Next.js 15
- Local: http://localhost:3000
✓ Ready
```

브라우저에서 **http://localhost:3000** 을 열면 샘플 설교 데이터로 화면을 바로 확인할 수 있습니다.

> 서버를 끄려면 터미널에서 `Ctrl + C`를 누르세요.

---

## 3단계: Supabase 연결 (선택 사항)

샘플 데이터 대신 실제 데이터베이스를 사용하고 싶을 때 진행하세요.

### Supabase 프로젝트 생성

1. https://supabase.com 에 접속 후 GitHub 계정으로 가입
2. **New project** 버튼 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호 설정 후 생성 (2~3분 소요)

### 데이터베이스 테이블 생성

1. Supabase 대시보드 왼쪽 메뉴에서 **SQL Editor** 클릭
2. `supabase/migrations/001_initial_schema.sql` 파일 내용을 전체 복사
3. SQL Editor에 붙여넣기 후 **Run** 버튼 클릭

### API 키 발급

1. Supabase 대시보드 → 왼쪽 하단 **Settings** → **API**
2. 아래 두 값을 복사해두세요:
   - **Project URL** (`https://xxxx.supabase.co`)
   - **anon public** 키 (`eyJxxx...`)

### 환경변수 파일 만들기

프로젝트 루트 폴더에 `.env.local` 파일을 새로 만들고 아래 내용을 입력하세요.

```bash
# 맥/리눅스
cp .env.example .env.local
```

```powershell
# 윈도우 PowerShell
Copy-Item .env.example .env.local
```

`.env.local` 파일을 열어 복사한 값을 입력합니다:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

> `.env.local` 파일은 비밀 키를 담고 있어서 Git에 올라가지 않습니다. 절대 GitHub에 공개하지 마세요.

### 서버 재시작

```bash
npm run dev
```

이제 실제 Supabase 데이터베이스와 연결됩니다.

---

## 4단계: Git으로 팀 협업하기

### 기본 개념

- `main` 브랜치: 완성된 코드만 있는 배포용 브랜치. **직접 수정 금지**
- `feature/*` 브랜치: 기능을 개발할 때 만드는 브랜치
- Pull Request(PR): 내가 만든 코드를 `main`에 합치기 위해 팀원에게 검토 요청하는 것

### 협업 플로우

**1. 항상 최신 코드로 시작하기**

```bash
git checkout main
git pull origin main
```

**2. 내 작업용 브랜치 만들기**

```bash
git checkout -b feature/설교-목록-필터
```

브랜치 이름 규칙:
- 기능 개발: `feature/기능이름`
- 버그 수정: `fix/버그내용`

**3. 코드 수정 후 저장(커밋)하기**

```bash
git add .
git commit -m "feat: 설교 목록 날짜 필터 추가"
```

커밋 메시지 규칙:
| 접두어 | 언제 쓰나요 |
|--------|------------|
| `feat:` | 새 기능 추가 |
| `fix:` | 버그 수정 |
| `style:` | 디자인/스타일 변경 |
| `docs:` | 문서 수정 |
| `refactor:` | 코드 정리 (기능 변경 없음) |

**4. GitHub에 올리기**

```bash
git push origin feature/설교-목록-필터
```

**5. Pull Request 만들기**

GitHub 저장소 페이지에서 **Compare & pull request** 버튼 클릭  
→ 무엇을 왜 만들었는지 설명 작성 → **Create pull request**

**6. 리뷰 후 merge**

팀원이 코드를 확인하고 문제없으면 `main`에 merge됩니다.

---

## 자주 묻는 질문

**Q. `npm install` 중에 오류가 나요.**  
Node.js 버전을 확인해보세요. `node -v` 결과가 `v20.x.x`인지 확인하세요.

**Q. `localhost:3000`이 안 열려요.**  
`npm run dev`가 실행 중인지 확인하세요. 터미널에 오류 메시지가 있으면 복사해서 팀장에게 공유하세요.

**Q. `.env.local` 파일을 만들었는데 Supabase 연결이 안 돼요.**  
서버를 완전히 껐다가(`Ctrl + C`) 다시 `npm run dev`를 실행해보세요.

**Q. `git push`가 안 돼요.**  
GitHub에 로그인이 안 되어 있을 수 있어요. `git config --global user.email "내이메일"` 과 `git config --global user.name "내이름"` 을 먼저 설정하세요.

---

## [선택] GitHub Codespaces로 시작하기

로컬 환경 설정이 어렵거나 컴퓨터 사양이 낮은 경우, 브라우저에서 바로 개발할 수 있습니다.

1. GitHub 저장소 페이지에서 초록색 **Code** 버튼 클릭
2. **Codespaces** 탭 선택
3. **Create codespace on main** 클릭
4. 브라우저에서 VS Code가 열리면 터미널에 입력:
   ```bash
   npm run dev
   ```
5. 포트 포워딩 알림이 뜨면 **브라우저에서 열기** 클릭

> 무료 플랜 기준 월 60시간 사용 가능합니다.
