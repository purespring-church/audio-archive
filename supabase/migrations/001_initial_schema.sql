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
