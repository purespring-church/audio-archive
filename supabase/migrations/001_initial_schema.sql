-- 설교 테이블 생성
CREATE TABLE sermons (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  preacher     TEXT NOT NULL,
  scripture    TEXT,
  sermon_date  DATE NOT NULL,
  file_url     TEXT NOT NULL,
  file_name    TEXT NOT NULL,
  duration_sec INTEGER,
  description  TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  created_by   UUID REFERENCES auth.users(id)
);

-- Row Level Security 활성화
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 가능 (비로그인 포함)
CREATE POLICY "공개 읽기"
  ON sermons FOR SELECT
  USING (true);

-- 로그인한 사용자만 등록 가능
CREATE POLICY "인증 사용자 쓰기"
  ON sermons FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- 본인이 등록한 설교만 삭제 가능
CREATE POLICY "본인 삭제"
  ON sermons FOR DELETE
  USING (auth.uid() = created_by);

-- Supabase Storage 버킷 생성 (대시보드에서 직접 생성해도 됩니다)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('sermons', 'sermons', true);

-- Storage RLS 정책 (storage.objects 테이블)
-- 버킷을 public으로 생성해도 쓰기는 별도 정책이 필요함

-- 로그인한 사용자: 파일 업로드 허용
CREATE POLICY "인증 사용자 업로드"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'sermons' AND auth.uid() IS NOT NULL);

-- 누구나: 파일 읽기 허용 (오디오 재생용)
CREATE POLICY "공개 읽기"
ON storage.objects FOR SELECT
USING (bucket_id = 'sermons');

-- 본인이 올린 파일만 삭제 허용
CREATE POLICY "본인 파일 삭제"
ON storage.objects FOR DELETE
USING (bucket_id = 'sermons' AND auth.uid() = owner);

-- 역할별 테이블 접근 권한 부여
-- anon: 비로그인 사용자 (읽기만 허용)
-- authenticated: 로그인 사용자 (읽기·쓰기·삭제 — 실제 허용 범위는 위 RLS 정책으로 제어)
-- service_role: 서버 API Route 전용 관리자 클라이언트 (RLS 우회, 모든 작업 허용)
GRANT SELECT ON TABLE public.sermons TO anon;
GRANT SELECT, INSERT, DELETE ON TABLE public.sermons TO authenticated;
GRANT ALL ON TABLE public.sermons TO service_role;
